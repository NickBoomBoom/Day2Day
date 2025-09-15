<template>
  <el-form inline @submit.prevent="table.onInit">
    <el-form-item label="创建者ID"
      ><el-select-v2
        filterable
        :options="authingUserList"
        :props="{ value: 'id', label: 'name' }"
        v-model="params.creatorId"
        placeholder="请选择"
        clearable
    /></el-form-item>
    <el-form-item>
      <el-input v-model="params.search" placeholder="搜索">
        <template #prepend>
          <el-button :icon="Search" />
        </template>
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" native-type="submit">搜索</el-button>
    </el-form-item>

    <el-form-item
      ><el-button :icon="Plus" type="primary" @click="dialog.open('add')"
        >新建</el-button
      >
    </el-form-item>
  </el-form>

  <el-table
    border
    v-height
    v-loading="table.loading"
    :data="table.data.rows"
    @sort-change="table.onSort"
    :row-class-name="table.rowClassName"
  >
    <el-table-column prop="id" label="编号" width="90" fixed="left" />
    <el-table-column prop="name" label="大技能名称" />
    <el-table-column prop="skillMap" label="技能图谱" />
    <el-table-column prop="creatorId" label="创建者ID" />
    <el-table-column prop="poster" label="缩略图" />
    <el-table-column prop="knowledgeModules" label="知识点数量" />
    <el-table-column prop="skillModules" label="技能点数量" />
    <el-table-column prop="projectCaseModules" label="案例数量" />
    <el-table-column label="创建时间">
      <template #default="scope">
        {{ moment(scope.row.createdAt).format('YYYY-MM-DD HH:mm') }}
      </template>
    </el-table-column>
    <el-table-column label="最后更新">
      <template #default="scope">
        {{ moment(scope.row.updatedAt).format('YYYY-MM-DD HH:mm') }}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="200" fixed="right">
      <template #default="scope">
        <el-button
          size="small"
          type="primary"
          plain
          @click.stop="dialog.open('view', scope.row)"
          >查看</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click.stop="dialog.open('edit', scope.row)"
          >编辑</el-button
        >
        <el-button
          type="danger"
          size="small"
          @click.stop="dialog.delete(scope.row)"
          >删除</el-button
        >
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
      @current-change="table.onPage"
    />
  </div>

  <el-dialog v-model="dialog.visible" :show-close="false" :title="dialog.type">
    <el-form
      ref="dialogFormRef"
      :model="dialog.model"
      :rules="dialog.rules"
      label-width="120px"
    >
      <el-form-item prop="name" label="大技能名称"
        ><el-input
          v-model="dialog.model.name"
          :disabled="isView" /></el-form-item
      ><el-form-item prop="creatorId" label="创建者ID"
        ><el-select-v2
          filterable
          :options="authingUserList"
          :props="{ value: 'id', label: 'name' }"
          v-model="dialog.model.creatorId"
          placeholder="请选择"
          clearable
          :disabled="isView" /></el-form-item
      ><el-form-item prop="knowledgeModules" label="知识点数量"
        ><el-input-number
          v-model="dialog.model.knowledgeModules"
          :disabled="isView" /></el-form-item
      ><el-form-item prop="skillModules" label="技能点数量"
        ><el-input-number
          v-model="dialog.model.skillModules"
          :disabled="isView" /></el-form-item
      ><el-form-item prop="projectCaseModules" label="案例数量"
        ><el-input-number
          v-model="dialog.model.projectCaseModules"
          :disabled="isView"
      /></el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialog.close">关闭</el-button>
      <el-button
        type="primary"
        @click="dialog.submit"
        v-if="dialog.type != 'view'"
        :loading="dialog.button.loading"
      >
        保存
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch, computed, shallowRef, reactive, onMounted } from 'vue'
import * as skillApi from '@/plugins/skill.service'
import * as authingUserApi from '@/plugins/authingUser.service'

import { Search, Plus } from '@element-plus/icons-vue'
import _ from 'lodash'
import moment from 'moment'
import { ElMessage, ElMessageBox } from 'element-plus'

const commonParams = {
  page: 1,
  pageSize: 20,
  search: '',
  sortOrder: 'desc',
  sortColumn: 'id',
}

const params = ref<any>({
  ...commonParams,
  creatorId: undefined,
})

const table = ref<{
  data: { rows: any[]; count: number }
  loading: boolean
  onPage: (page: number) => void
  onSort: (props: any) => void
  onInit: () => void
  rowClassName: (params: any) => string
}>({
  data: {
    rows: [],
    count: 0,
  },
  loading: false,
  onPage: (page: number) => {
    params.value.page = page
  },
  onSort: (props: any) => {
    const { column, prop, order } = props
    params.value.sortColumn = prop
    params.value.sortOrder = order === 'descending' ? 'desc' : 'asc'
  },
  onInit: async () => {
    try {
      table.value.loading = true
      table.value.data = await skillApi.getAllSkill(params.value)
    } catch (e) {
      console.error(e)
    } finally {
      table.value.loading = false
    }
  },
  rowClassName: (t: any) => {
    if (typeof t.row.isEnable === 'boolean' && !t.row.isEnable) {
      return 'disabled-row'
    } else {
      return ''
    }
  },
})

const authingUserList = ref<any[]>([])

async function init() {
  authingUserList.value = (
    await authingUserApi.getAllAuthingUser({ skipPaging: true })
  ).rows
}

const flagList = ref<any>([
  { label: '是', value: true, key: 1 },
  { label: '否', value: false, key: 0 },
])

const lazyRefreshTable = _.debounce(function () {
  table.value.onInit()
}, 200)

watch(params, lazyRefreshTable, { deep: true })

const DEFAULT_DIALOG_MODEL = {
  name: undefined,
  skillMap: undefined,
  creatorId: undefined,
  poster: undefined,
  knowledgeModules: undefined,
  skillModules: undefined,
  projectCaseModules: undefined,
}
const dialogFormRef = ref()
const isView = computed(() => dialog.value.type === 'view')
const isEdit = computed(() => dialog.value.type === 'edit')
const isAdd = computed(() => dialog.value.type === 'add')
const dialog = ref<{
  visible: boolean
  type: 'add' | 'edit' | 'view'
  model: any
  rules: any
  button: { loading: boolean }
  open: (type: 'add' | 'edit' | 'view', row?: any) => void
  close: () => void
  submit: () => void
  delete: (row: any) => void
}>({
  visible: false,
  type: 'add',
  rules: {
    name: [
      {
        required: true,
        message: '大技能名称不能为空',
        trigger: 'blur',
      },
    ],
    creatorId: [
      {
        required: true,
        message: '创建者ID不能为空',
        trigger: 'blur',
      },
    ],
  },
  button: {
    loading: false,
  },
  model: _.cloneDeep(DEFAULT_DIALOG_MODEL),
  open: async (type: 'add' | 'edit' | 'view', row?: any) => {
    dialog.value.type = type
    if (['edit', 'view'].includes(type)) {
      const res = await skillApi.getSkillById(row.id)
      dialog.value.model = res
    } else if (dialog.value.type === 'add') {
      dialog.value.model = _.cloneDeep(DEFAULT_DIALOG_MODEL)
    }
    dialog.value.visible = true
  },
  close: () => {
    dialog.value.visible = false
  },
  submit: async () => {
    try {
      await dialogFormRef.value.validate()
      dialog.value.button.loading = true
      const { type, model } = dialog.value
      if (type === 'edit') {
        await skillApi.patchSkill(model.id, model)
      } else if (type === 'add') {
        await skillApi.addSkill(model)
      }
      dialog.value.visible = false
      lazyRefreshTable()
    } catch (e) {
      console.error(e)
    } finally {
      dialog.value.button.loading = false
    }
  },
  delete: async (row: any) => {
    try {
      await ElMessageBox.confirm('您确定要删除此条数据吗？', '提示')
      await skillApi.deleteSkill(row.id)
      ElMessage.success('删除成功')
      lazyRefreshTable()
    } catch (e) {
      console.error(e)
      if (e === 'cancel') {
        ElMessage.warning('取消删除')
      }
    }
  },
})

onMounted(() => {
  lazyRefreshTable()
  init()
})
</script>
