import fs from 'fs'
import * as cheerio from 'cheerio';
import { Project, Node, SyntaxKind } from 'ts-morph';

const content = fs.readFileSync('./component.ts', 'utf-8')

const receiveFilters = [
  {
    comment: "ss",
    name: 'search',
    useInput: true
  },
  {
    comment: '测试input',
    name: 'key',
    useInput: true
  },
  {
    comment: '测试select',
    name: 'selectKey',
    needService: true,
    refTable: {
      instanceName: 'testService'
    }
  }
]
const project = new Project()

const sourceFile = project.createSourceFile(
  'dummyroutes.module.ts',
  content,
)
const main = sourceFile.getClasses()[0]
// 获取template
const decorator = main.getDecorators()[0]
const options = decorator.getArguments()[0]
let template: any
const optionsString = options.getFullText()

const html: string = eval(`(${optionsString})`).template

if (Node.isObjectLiteralExpression(options)) {
  template = options.getProperty('template')?.getFullText()
}

const ignoreKeys = ['id', 'createdAt', 'actions']
const tableWrap = main.getProperty('table')
const tableValue = tableWrap?.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression)
const columnsWrap = tableValue?.getProperty('columns')
if (Node.isPropertyAssignment(columnsWrap)) {
  const columnsValue = columnsWrap.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression)
  const currentColumnKeys: string[] = []
  const removeIndexes: number[] = []
  columnsValue?.getElements().forEach((t, i) => {
    if (Node.isObjectLiteralExpression(t)) {
      const keyWrap = t.getProperty('key')
      if (Node.isPropertyAssignment(keyWrap)) {
        const keyValue = keyWrap.getInitializerIfKind(SyntaxKind.StringLiteral)?.getFullText().replace(/'|\s/g, '')
        if (keyValue) {
          currentColumnKeys.push(keyValue)
          const targetInReceiveFilters = receiveFilters.find(tt => tt.name === keyValue)
          if (targetInReceiveFilters) {
            // 存在array中 暂不处理
          } else if (ignoreKeys.includes(keyValue)) {
            // 是需要忽略的key  不处理
          } else {
            removeIndexes.push(i)
          }
        }

      }
    }
  });
  removeIndexes.forEach((t, i) => {
    const index = t - i;
    columnsValue?.removeElement(index)
  })

  const fillColumns = receiveFilters.filter(t => !currentColumnKeys.includes(t.name))

  console.log(fillColumns, currentColumnKeys)
  fillColumns.forEach((t: any) => {
    columnsValue?.insertElement(columnsValue?.getElements().length - 1, `
    {
      key:'${t.name}',
      header:'${t.comment}',
      showSort: ${!!t.sort},
      cell: (row: any) => row?.${t.name}
    },
    `)
  })
  console.log(columnsValue?.getFullText())


}

// console.log(Node.isObjectLiteralExpression(tableValue))
// if (Node.isObjectLiteralExpression(tableValue)) {
//   console.log(tableValue.getProperty('columns'))
// }


// const $ = cheerio.load(html, {
//   xmlMode: true,
//   decodeEntities: false,
//   _useHtmlParser2: true,
//   recognizeSelfClosing: false

// })
// const from$ = $('form')
// const formControl = $('[formControlName]')
// const currentFormControlNames: string[] = []
// for (let i = 0; i < formControl.length; i++) {
//   const item$ = formControl[i]
//   currentFormControlNames.push((item$ as any).attribs['formControlName'])
// }
// let renderHtml: string[] = []
// receiveFilters.forEach(t => {
//   const { name } = t
//   if (!currentFormControlNames.includes(name)) {
//     renderHtml.push(getHtml(t))
//   }
// })
// const formChildrenHtmls: string[] = []
// from$.children().each((i, el) => {
//   formChildrenHtmls.push(cheerio.load(el).html())
// })


// const insertIndex = currentFormControlNames.length - 1
// const realInsertIndex = insertIndex <= 0 ? 0 : insertIndex
// formChildrenHtmls.splice(realInsertIndex, 0, ...renderHtml)
// from$.html(
//   formChildrenHtmls.join('')
// )
// let finalRenderHtml = ($.html() || '').replace(/=""/g, '')

// const reg = /\<span([^\/\>])+\/\>/g
// const arr = finalRenderHtml.match(reg)
// console.log(arr)
// arr?.forEach(t => {
//   finalRenderHtml = finalRenderHtml.replace(t, t.replace('/>', '></span>'))
// })

// template.replaceWithText('template: `' + finalRenderHtml + '`')
// console.log(111,finalRenderHtml)


// project.save()


// function getHtml(item: any): string {
//   if (item.useInput) {
//     return `
//     <nz-form-item>
//       <nz-form-control>
//         <nz-input-group [nzSuffix]="${item.name}ClearTpl">
//           <input type="text" nz-input formControlName="${item.name}" placeholder="${item.comment}" />
//         </nz-input-group>
//         <ng-template #${item.name}ClearTpl>
//           <span
//             nz-icon
//             class="ant-input-clear-icon"
//             nzTheme="fill"
//             nzType="close-circle"
//             *ngIf="validateForm.value.${item.name}"
//             (click)="validateForm.controls['${item.name}'].reset()"
//           ></span>
//         </ng-template>
//       </nz-form-control>
//     </nz-form-item>              
//     `
//   } else if (item.needService) {
//     return `
//     <nz-form-item>
//       <nz-form-control>
//         <nz-select formControlName="${item.name}" placeholder="${item.comment}" nzShowSearch nzAllowClear>
//           <nz-option *ngFor="let item of listData['${item.refTable.instanceName}List']" [nzValue]="item.id" [nzLabel]="item.cnName"></nz-option>
//         </nz-select>
//       </nz-form-control>
//     </nz-form-item>
//     `
//   }
//   return ''
// }


