import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { EnumCategoryService } from '@services';
import { DialogSuccess, DialogType, parseParams, parseSort, TableConfig } from '@shared';
import { isEmpty } from 'lodash-es';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableComponent, NzTableQueryParams } from 'ng-zorro-antd/table';
import { catchError, forkJoin, fromEvent, map, merge, of, startWith, Subject, switchMap } from 'rxjs';
import { BasisEnumCategoryDialogComponent } from './enum-category-dialog.component';

@Component({
    selector: 'basis-enum-category',
    template: `
		<header class="flex">
			<form nz-form #formRef nzLayout="inline" [formGroup]="validateForm">
				<nz-form-item>
					<nz-form-control>
						<input nz-input placeholder="搜索" formControlName="search" />
					</nz-form-control>
				</nz-form-item>
                <nz-form-item>
					<nz-form-control>
						<input nz-input placeholder="搜索" formControlName="search2" />
					</nz-form-control>
				</nz-form-item>
                <nz-form-item>
					<nz-form-control>
						<input nz-input placeholder="搜索" formControlName="search3" />
					</nz-form-control>
				</nz-form-item>
				<nz-form-item>
					<nz-form-control>
						<button nz-button nzType="primary" nzShape="circle">
							<span nz-icon nzType="search"></span>
						</button>
					</nz-form-control>
				</nz-form-item>
			</form>
			<button nz-button nzType="primary" nzShape="circle" (click)="openDialog('add')">
				<span nz-icon nzType="plus" nzTheme="outline"></span>
			</button>
		</header>
		<nz-table
			#tableRef
			class="mt-2"
			nzShowSizeChanger
			[nzPageSizeOptions]="[30, 60, 100]"
			[nzData]="table.data"
			[nzTotal]="table.total"
			[nzLoading]="table.loading"
			[nzPageSize]="table.params.pageSize"
			[nzPageIndex]="table.params.page"
		>
			<thead>
				<tr>
					<th
						*ngFor="let item of table.columns"
						[nzColumnKey]="item.key"
						[nzShowSort]="!!item.showSort"
						[nzSortFn]="item.sortFn || true"
						[nzShowFilter]="!!item.showFilter"
						[nzFilterFn]="item.filterFn || true"
						[nzFilters]="item.filters || []"
						[nzWidth]="item.width || 'auto'"
					>
						{{ item.header }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr *ngFor="let row of table.data">
					<td *ngFor="let item of table.columns">
						<ng-container [ngSwitch]="item.key">
							<ng-container *ngSwitchCase="'actions'">
								<button nz-button nzType="primary" nzShape="circle" (click)="openDialog('view', row)">
									<span nz-icon nzType="eye" nzTheme="outline"></span>
								</button>
								<button nz-button nzType="primary" nzShape="circle" (click)="openDialog('edit', row)">
									<span nz-icon nzType="edit" nzTheme="outline"></span>
								</button>
								<button
									nz-popconfirm
									nzPopconfirmTitle="确定删除吗?"
									nz-button
									nzType="primary"
									nzShape="circle"
									(nzOnConfirm)="handleDeleteConfirm(row)"
								>
									<span nz-icon nzType="delete" nzTheme="outline"></span>
								</button>
							</ng-container>
							<ng-container *ngSwitchDefault>
								{{ item?.cell(row) }}
							</ng-container>
						</ng-container>
					</td>
				</tr>
			</tbody>
		</nz-table>
		<basis-enum-category-dialog #dialogRef (onSuccess)="handleDialogSuccess($event)"></basis-enum-category-dialog>
	`,
})
export class BasisEnumCategoryComponent implements OnInit {
    constructor(private _msgService: NzMessageService, private _enumCategoryService: EnumCategoryService) { }
    ngOnInit(): void {
        this.initData();
        this.initTable();
    }
    @ViewChild('formRef', { static: true }) formRef!: ElementRef;
    @ViewChild('tableRef', { static: true }) tableRef!: NzTableComponent<any>;
    @ViewChild('dialogRef', { static: true }) dialogRef!: BasisEnumCategoryDialogComponent;

    validateForm: UntypedFormGroup = new UntypedFormGroup({
        search: new UntypedFormControl(undefined),
    });

    refresh$ = new Subject();

    table: TableConfig = {
        params: {
            pageSize: 30,
            page: 1,
        },
        total: 0,
        loading: false,
        data: [],
        columns: [
            {
                key: 'id',
                header: '编号',
                showSort: true,
                cell: (row: any) => row.id,
            },
            {
                key: 'search',
                header: '分类中文',
                showSort: false,
                cell: (row: any) => row?.cnName,
            },
            {
                key: 'enName',
                header: '分类英文',
                showSort: false,
                cell: (row: any) => row?.enName,
            },
            {
                key: 'icon',
                header: 'icon的css',
                showSort: false,
                cell: (row: any) => row?.icon,
            },
            {
                key: 'cnDesc',
                header: '中文描述',
                showSort: false,
                cell: (row: any) => row?.cnDesc,
            },
            {
                key: 'enDesc',
                header: '英文描述',
                showSort: false,
                cell: (row: any) => row?.enDesc,
            },
            {
                key: 'order',
                header: '排序',
                showSort: false,
                cell: (row: any) => row?.order,
            },
            {
                key: 'actions',
                header: '操作',
            },
        ],
    };

    initData() {
        forkJoin([]).subscribe((res: any[]) => {
            [] = res.map((o) => o.rows);
        });
    }

    initTable() {
        const formRef$ = fromEvent(this.formRef.nativeElement, 'submit');
        formRef$.subscribe(() => {
            this.table.params.page = 1;
        });

        merge(formRef$, this.tableRef.nzQueryParams, this.refresh$)
            .pipe(
                startWith({}),
                switchMap((res: NzTableQueryParams | any) => {
                    if (isEmpty(res)) {
                        return of(null);
                    }
                    if (res.pageIndex) {
                        this.table.params = {
                            ...this.table.params,
                            pageSize: res.pageSize,
                            page: res.pageIndex,
                            sort: parseSort(res.sort),
                        };
                    }

                    const { value } = this.validateForm;
                    const body = parseParams({
                        ...this.table.params,
                        ...value,
                    });
                    this.table.loading = true;
                    return this._enumCategoryService.get(body).pipe(catchError(() => of(null)));
                }),
                map((data: any) => {
                    return data;
                })
            )
            .subscribe((data: any) => {
                this.table.total = data?.count || 0;
                this.table.data = data?.rows || [];
                this.table.loading = false;
            });
    }

    openDialog(type: DialogType, row?: any) {
        this.dialogRef.open({
            type,
            row,
        });
    }

    handleDialogSuccess(e: DialogSuccess) {
        this.refresh$.next(`delete ==> ${e.res}`);
    }

    handleDeleteConfirm(row: any) {
        this._enumCategoryService.delete(row.id).subscribe(() => {
            this._msgService.success('删除成功');
            this.refresh$.next(`delete ==> ${row.id}`);
        });
    }
}
