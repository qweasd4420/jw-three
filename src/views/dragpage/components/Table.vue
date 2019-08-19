<template>
  <el-container style="padding: 20px 20px 0 20px;">
    <el-form
      :inline="true"
      :model="listQuery"
      class="demo-form-inline"
    >
      <el-form-item label>
        <el-input v-model="listQuery.title" placeholder="Title" />
      </el-form-item>
      <el-form-item label>
        <el-select v-model="listQuery.importance" placeholder="Imp" clearable>
          <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label>
        <el-select v-model="listQuery.type" placeholder="Type" clearable>
          <el-option
            v-for="item in calendarTypeOptions"
            :key="item.key"
            :label="item.display_name+'('+item.key+')'"
            :value="item.key"
          />
        </el-select>
      </el-form-item>
      <el-form-item label>
        <el-select v-model="listQuery.sort">
          <el-option
            v-for="item in sortOptions"
            :key="item.key"
            :label="item.label"
            :value="item.key"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search">Search</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-circle-plus">Add</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-download">Export</el-button>
      </el-form-item>
    </el-form>
    <el-header style="height: 0" />
    <el-main style="padding: 0px;">
      <!-- 表格 -->
      <el-table :data="tableData" border fit style="margin-bottom: 20px;" height="calc(100vh - 229px)">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="name" label="姓名" width="120" align="center" />
        <el-table-column prop="select" label="分组" align="center" />
        <el-table-column prop="sex" label="性别" align="center" />
        <el-table-column prop="phone" label="手机号" align="center" />
        <el-table-column prop="dept" label="部门" align="center" />
        <el-table-column prop="createDate" :formatter="dateFormat" min-width="100" label="日期" align="center" />
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top: 15px;text-align: center;"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-main>
  </el-container>
</template>
<script>
import moment from 'moment'
const item = {
  name: '王小虎',
  select: '结算',
  phone: '12345678932',
  dept: '结算',
  createDate: 'Wed Jun 26 2019 13:48:58 GMT+0800',
  sex: '男'
}
const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]
export default {
  name: 'Hello',
  data() {
    return {
      tableData: Array(20).fill(item),
      currentPage4: 1,
      total: 40,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      downloadLoading: false
    }
  },
  mounted() {
    this.listQuery.title = this.pageId
  },
  methods: {
    dateFormat(row, column, cellValue, index) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    getList() {}
  }
}
</script>

<style scoped>

</style>
