import data from "./gen.json";
import prettier from "prettier";
import fs from "fs";
import _ from "lodash";

async function codeFormat(code: string): Promise<string> {
  try {
    const formattedCode = await prettier.format(code, {
      singleQuote: true,
      trailingComma: "all",
      semi: false,
      endOfLine: "auto",
      parser: "vue",
      filepath: "/dummy/file.ts",
    });
    return formattedCode;
  } catch (e: any) {
    const { message, loc } = e;
    if (loc) {
      console.error(`Error in line ${loc.start.line}: ${message}`);
    } else {
      console.error(`Error formatting code: ${message}`);
    }
    throw new Error("代码格式化出错");
  }
}

function getRefCode(arr: any) {
  let varRes = ``;
  let funRes = ``;
  arr.forEach((t: any) => {
    const {
      refTable: { instanceName, className },
    } = t;

    if (!varRes.includes(instanceName + "List")) {
      varRes += `
      const ${instanceName}List = ref<any[]>([]);
    `;
      funRes += `
      ${instanceName}List.value = (
        await ${t.refTable.instanceName}Api.getAll${className}({ skipPaging: true })
      ).rows;
    `;
    }
  });

  const res = `
    ${varRes}
    async function init() {${funRes}}    
  `;
  return res;
}

function getLabel(columnConfig: any) {
  if (!columnConfig.comment) {
    return `(${columnConfig.name})`;
  }
  return columnConfig.comment;
}

function getTableColumnCode(columnConfig: any) {
  if (columnConfig.dataType.dataType === "datetime") {
    return `
      <el-table-column  label="${getLabel(columnConfig)}" >
        <template #default="scope">
          {{ moment(scope.row.${
            columnConfig.name
          }).format("YYYY-MM-DD HH:mm") }}
        </template>
      </el-table-column>`;
  } else if (columnConfig.dataType.dataType === "boolean") {
    return `
      <el-table-column  label="${getLabel(columnConfig)}"   >
        <template #default="scope">
          <el-text v-if="scope.row.${columnConfig.name} === true">是</el-text>
          <el-text v-else>否</el-text>
        </template>
      </el-table-column>`;
  } else {
    return `
      <el-table-column prop="${columnConfig.name}" label="${getLabel(
        columnConfig
      )}"/>`;
  }
}

function getFieldCode(
  columnConfig: any,
  isSearch: boolean,
  ifString: string = "", // 表单项是否显示
  disabledCode: string = "" //表单项是否启用判断代码
) {
  let formItemCode = ``; //表单项代码
  const objectName = isSearch ? `params` : "dialog.model"; //表单项内容存储对象名称

  formItemCode = getFormItemCode(
    columnConfig,
    disabledCode,
    objectName,
    isSearch
  );

  if (!formItemCode) {
    return "";
  }

  const label = columnConfig.refTable
    ? getLabel(columnConfig).replace(/id$/, "").replace(/Id$/, "")
    : getLabel(columnConfig);

  return `<el-form-item ${isSearch ? "" : ifString} ${isSearch ? "" : `prop="${columnConfig.name}"`} label="${label}">${formItemCode}</el-form-item>`;
}

function getFormItemCode(
  columnConfig: any,
  disabledCode: string,
  objectName: string,
  isSearch: boolean
) {
  const {
    dataType: { dataType },
    refTable,
  } = columnConfig;
  console.log(dataType, refTable, columnConfig.name, columnConfig);
  if (dataType === "datetime") {
    return `<el-date-picker v-model="${objectName}.${columnConfig.name}" type="datetime" ${disabledCode}/>`;
  } else if (refTable) {
    return `<el-select-v2 filterable :options="${columnConfig.refTable.instanceName}List" :props="{value:'id',label:'${columnConfig.forSelectDisplayName}'}" v-model="${objectName}.${columnConfig.name}" placeholder="请选择" clearable ${disabledCode} />`;
  } else if (dataType === "boolean" && !isSearch) {
    return `<el-switch
              v-model="${objectName}.${columnConfig.name}"
              active-text="是"
              inactive-text="否"
              ${disabledCode}/>`;
  } else if (dataType === "boolean" && isSearch) {
    return `<el-select-v2
              filterable
              :options="flagList"
              v-model="${objectName}.${columnConfig.name}"
              placeholder="请选择"
              clearable />`;
  } else if (["varchar(40)", "varchar(255)"].includes(dataType) && !isSearch) {
    return `<el-input v-model="${objectName}.${columnConfig.name}" ${disabledCode}/>`;
  } else if (["int"].includes(dataType) && !isSearch) {
    return `<el-input-number v-model="${objectName}.${columnConfig.name}" ${disabledCode} />`;
  } else if (
    ["text", "json(array)", "longtext"].includes(dataType) &&
    !isSearch
  ) {
    return `<el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 8 }"
              v-model="${objectName}.${columnConfig.name}"
              ${disabledCode} />`;
  }
  return ``;
}

function getDialogFormRules(t: any) {
  const { allowNull, name } = t;
  return allowNull
    ? ""
    : `${name}: [{
    required: true,
    message: '${getLabel(t)}不能为空',
    trigger: 'blur'
  }],`;
}

function getFormCode({
  createDialogFieldItems,
  updateDialogFieldItems,
  viewDialogItems,
}: any): any[] {
  const filterCreateItems = createDialogFieldItems.filter(
    (t: any) => t.createable
  );
  let model = "";

  for (const t of filterCreateItems) {
    if (t.dataType.dataType === "boolean") {
      model += `${t.name}: false,`;
    } else {
      model += `${t.name}: undefined,`;
    }
  }

  const arr = _.uniqBy(
    [...filterCreateItems, ...updateDialogFieldItems, ...viewDialogItems],
    "id"
  );

  let res = "";
  const createIds = filterCreateItems.map((t: any) => t.id);
  const updateDisabledIds = updateDialogFieldItems
    .filter((t: any) => !t.updateable)
    .map((t: any) => t.id);
  const updateAbleArr = updateDialogFieldItems.filter((t: any) => t.updateable);
  const viewDisabledIds = viewDialogItems.map((t: any) => t.id);
  const updateAllIds = updateDialogFieldItems.map((t: any) => t.id);

  let rules = "";

  for (const t of arr) {
    rules += getDialogFormRules(t);

    const disabled = [];

    if (updateDisabledIds.includes(t.id)) {
      disabled.push(`isEdit`);
    }
    if (viewDisabledIds.includes(t.id)) {
      disabled.push(`isView`);
    }

    const disabledCode = `:disabled="${disabled.join("||")}"`;

    let ifString = ``;
    const isShowInCreate = createIds.includes(t.id);
    const isShowInUpdate = updateAllIds.includes(t.id);
    const isShowInView = viewDisabledIds.includes(t.id);
    if (isShowInCreate && isShowInUpdate && isShowInView) {
      ifString = "";
    } else if (isShowInCreate && isShowInUpdate) {
      ifString = `v-if="isAdd || isEdit"`;
    } else if (isShowInCreate && isShowInView) {
      ifString = `v-if="isAdd || isView"`;
    } else if (isShowInUpdate && isShowInView) {
      ifString = `v-if="isEdit || isView"`;
    } else if (isShowInCreate) {
      ifString = `v-if="isAdd`;
    } else if (isShowInUpdate) {
      ifString = `v-if="isEdit"`;
    } else if (isShowInView) {
      ifString = `v-if="isView"`;
    }

    res += getFieldCode(t, false, ifString, disabledCode);
  }

  return [
    res,
    rules,
    model,
    !!viewDisabledIds.length,
    !!createIds.length,
    updateAbleArr.length > 0,
  ];
}

function renderTemplate(
  columnsCode: string,
  interfacesCode: string,
  paramsCode: string,
  filtersCode: string,
  className: string,
  dialogFormCode: string,
  instanceName: string,
  apiFilesCode: string,
  dialogDataParamsCode: string,
  dialogRules: string,
  isDialogView: boolean,
  isDialogAdd: boolean,
  isDialogEdit: boolean
) {
  // @prettier-ignore
  return `
    <template>
      <el-form inline  @submit.prevent="table.onInit"> 
        ${filtersCode}
        <el-form-item>
          <el-input v-model="params.search" placeholder="搜索">
            <template #prepend>
              <el-button :icon="Search" />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit" >搜索</el-button>
        </el-form-item>

        ${
          isDialogAdd
            ? ` <el-form-item><el-button :icon="Plus" type="primary" @click="dialog.open('add')">新建</el-button> </el-form-item>`
            : ""
        }
      </el-form>

      <el-table
        border
        v-height
        v-loading="table.loading"
        :data="table.data.rows"
        @sort-change="table.onSort"
        :row-class-name="table.rowClassName" 
      >
          <el-table-column prop="id" label="编号" width="90" fixed="left"/>${columnsCode}
          <el-table-column label="创建时间" >
            <template #default="scope">
              {{ moment(scope.row.createdAt).format("YYYY-MM-DD HH:mm") }}
            </template>
          </el-table-column>
          <el-table-column  label="最后更新" >
            <template #default="scope">
              {{ moment(scope.row.updatedAt).format("YYYY-MM-DD HH:mm") }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="${isDialogAdd && isDialogEdit ? "200" : "150"}" fixed="right">
            <template #default="scope">
            ${isDialogView ? `<el-button size="small" type="primary" plain @click.stop="dialog.open('view', scope.row)">查看</el-button>` : ""} 
            ${isDialogEdit ? `<el-button type="primary" size="small" @click.stop="dialog.open('edit', scope.row)">编辑</el-button>` : ""}  
              <el-button   type="danger" size="small" @click.stop="dialog.delete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination">
          <el-pagination
            size="small"
            :current-page="params.page" 
            :page-size="params.pageSize"
            background
            layout="total, prev, pager, next"
            :total="table.data.count"
            @current-change="table.onPage" />
        </div>
        

        <el-dialog v-model="dialog.visible" :show-close="false" :title="dialog.type">
          <el-form ref="dialogFormRef" :model='dialog.model' :rules="dialog.rules" label-width="120px">
            ${dialogFormCode}
          </el-form>
          <template #footer>
            <el-button @click="dialog.close">关闭</el-button>
            <el-button
              type="primary"
              @click="dialog.submit"
              v-if="dialog.type != 'view'"
              :loading="dialog.button.loading">
              保存
            </el-button>
          </template>
        </el-dialog>
    </template>

<script lang="ts" setup>
  import { ref, watch, computed, shallowRef, reactive, onMounted } from "vue";
  ${apiFilesCode}
  import { Search, Plus } from "@element-plus/icons-vue";
  import _ from "lodash";
  import moment from "moment";
  import { ElMessage, ElMessageBox } from "element-plus";

  const commonParams = {
    page: 1,
    pageSize: 20,
    search: "",
    sortOrder: "desc",
    sortColumn: "id",
  };

  const params = ref<any>({
    ...commonParams,
    ${paramsCode}
  });
  
  const table = ref<{
    data:{ rows: any[] , count: number };
    loading: boolean;
    onPage: (page: number) => void;
    onSort: (props: any) => void;
    onInit: () => void;
    rowClassName: (params: any) => string;
  }>({
    data: {
      rows: [],
      count: 0,
    },
    loading: false,
    onPage: (page:number) => {
      params.value.page = page;
    },
    onSort: (props:any) => {  
      const { column, prop, order } = props;
      params.value.sortColumn = prop;
      params.value.sortOrder = order === "descending" ? "desc" : "asc";
    },
    onInit: async () => {
      try {
        table.value.loading = true;
        table.value.data = await ${instanceName}Api.getAll${className} (
          params.value,
        );
      } catch (e) {
        console.error(e)
      } finally{
        table.value.loading = false;
      }
    },
    rowClassName: (t:any) => {
      if (typeof t.row.isEnable === 'boolean' && !t.row.isEnable) {
        return 'disabled-row'
      } else {
        return ''
      }      
    }
  });
  
  ${interfacesCode}

  const flagList=ref<any>([{label:'是',value:true,key:1},{label:'否',value:false,key:0}])

  const lazyRefreshTable = _.debounce(function () {
    table.value.onInit();
  }, 200);

  watch(params, lazyRefreshTable, {deep: true });

  const DEFAULT_DIALOG_MODEL = {${dialogDataParamsCode}}
  const dialogFormRef = ref()
  const isView = computed(() => dialog.value.type === "view");
  const isEdit = computed(() => dialog.value.type === "edit");
  const isAdd = computed(() => dialog.value.type === "add");
  const dialog = ref<{
    visible: boolean;
    type: 'add'|'edit'|'view';
    model: any ;
    rules: any;
    button: { loading: boolean };
    open:(type: 'add'|'edit'|'view', row?: any) => void;
    close: () => void;
    submit: () => void;
    delete:(row: any) => void;
  }>({
    visible: false,
    type: "add",
    rules:{${dialogRules}},
    button: {
      loading: false,
    },
    model: _.cloneDeep(DEFAULT_DIALOG_MODEL),
    open: async(type: 'add'|'edit'|'view', row?: any) => {
        dialog.value.type = type;
        if (["edit", 'view'].includes(type)) {
          const res = await ${instanceName}Api.get${className}ById(row.id);
          dialog.value.model = res;
        } else if (dialog.value.type === "add") {
          dialog.value.model = _.cloneDeep(DEFAULT_DIALOG_MODEL)
        } 
        dialog.value.visible = true;
    },
    close:() => {
      dialog.value.visible = false;
    },
    submit: async () => {
      try {
        await dialogFormRef.value.validate();
        dialog.value.button.loading = true;
        const { type , model } = dialog.value;
        if (type === "edit") {
          await ${instanceName}Api.patch${className}(model.id, model);
          } else if (type === "add") {
          await ${instanceName}Api.add${className}(model);
        }
        dialog.value.visible = false;
        lazyRefreshTable();
      } catch (e) {
        console.error(e)
      } finally {
        dialog.value.button.loading = false;
      }
    },
    delete: async (row:any) => {  
     try {
       await ElMessageBox.confirm("您确定要删除此条数据吗？", "提示");
       await ${instanceName}Api.delete${className}(row.id);
       ElMessage.success("删除成功");
      lazyRefreshTable();
     } catch (e) {
        console.error(e);
        if(e === 'cancel'){
          ElMessage.warning('取消删除')
        }
     }
    },
  });

  onMounted(() => {
    lazyRefreshTable()
    init()
  })
  
</script>`;
}

export function generate(tableConfig: any) {
  let interfacesCode = ``; //获取下拉列表项接口代码
  let paramsCode = ``; //存取输入框内容变量名代码
  let filtersCode = ``; //筛选条件项代码
  let columnsCode = ``; //表格列代码
  let apiFilesCode = `import * as ${tableConfig.instanceName}Api from '@/plugins/${tableConfig.instanceName}.service';\n`; //引用API文件路径
  let dialogDataParamsCode = ``; //存取弹窗内容变量名代码
  let dialogRules = ``; //表单验证规则代码
  let dialogFormCode = ``; //表单项代码

  let isDialogAdd = true;
  let isDialogView = true;
  let isDialogEdit = true;

  const interfacesCodeArr = [];
  for (const columnConfig of tableConfig.table.filterItems) {
    if (columnConfig.findable) {
      filtersCode += getFieldCode(columnConfig, true);
      paramsCode += `${columnConfig.name}: undefined,\n`;
    }

    if (!columnConfig.refTable) {
      continue;
    }

    interfacesCodeArr.push(columnConfig);

    if (
      apiFilesCode.indexOf(columnConfig.refTable.instanceName + "Api") === -1
    ) {
      apiFilesCode += `import * as ${columnConfig.refTable.instanceName}Api from '@/plugins/${columnConfig.refTable.instanceName}.service';\n`;
    }
  }

  for (const columnConfig of tableConfig.table.tableColumns) {
    if (columnConfig.showable) {
      columnsCode += getTableColumnCode(columnConfig);
    }
  }

  [
    dialogFormCode,
    dialogRules,
    dialogDataParamsCode,
    isDialogView,
    isDialogAdd,
    isDialogEdit,
  ] = getFormCode(tableConfig.table);

  interfacesCode = getRefCode(interfacesCodeArr);

  const code = renderTemplate(
    columnsCode,
    interfacesCode,
    paramsCode,
    filtersCode,
    tableConfig.className,
    dialogFormCode,
    tableConfig.instanceName,
    apiFilesCode,
    dialogDataParamsCode,
    dialogRules,
    isDialogView,
    isDialogAdd,
    isDialogEdit
  );

  return codeFormat(code);
}

async function run() {
  const res = await generate(data);
  fs.writeFileSync("./Gen.vue", res, "utf-8");
  console.log("生成成功");
}

run();
