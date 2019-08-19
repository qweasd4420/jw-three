<template>
  <el-container>
    <el-header>
      <div class="m-header">
        <img class="headerImg" src="@/static/header.png">
        <div class="icon"><img src="@/static/logo.png"></div>
        <h1 class="text">电子印章管理</h1>
      </div>
    </el-header>
    <el-header>
      <div style="margin-top: 5px">
        &nbsp;&nbsp;<span class="demonstration">印章名称</span>&nbsp;
        <el-input v-model="sealNameSearch" clearable placeholder="印章名称" size="small" style="width: 180px;margin-right: 8px" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span class="demonstration">印章状态</span>&nbsp;
        <el-select v-model="sealStateSearch" value-key="state" :clearable="true" placeholder="请选择印章状态" style="width: 180px;margin-right: 8px">
          <el-option
            v-for="item in sceneOptions"
            :key="item.state"
            :label="item.label"
            :value="item.state"
            @change="changeSelect">
          </el-option>
        </el-select>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span class="demonstration">印章类型</span>&nbsp;
        <el-select v-model="sealTypeSearch" value-key="type" :clearable="true" placeholder="请选择印章状态" style="width: 180px;margin-right: 8px">
          <el-option
            v-for="item in typeOptions"
            :key="item.type"
            :label="item.label"
            :value="item.type"
            @change="changeSelect">
          </el-option>
        </el-select>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <br>
      </div>
      <div style="margin-top: 5px">
        &nbsp;&nbsp;<span class="demonstration">起始日期</span>&nbsp;
        <el-date-picker
          v-model="dataValueStart"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          style="width: 180px;margin-right: 8px">
        </el-date-picker>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span class="demonstration">结束日期</span>&nbsp;
        <el-date-picker
          v-model="dataValueEnd"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          style="width: 180px;margin-right: 8px">
        </el-date-picker>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span class="demonstration">服务场景</span>&nbsp;
        <el-select v-model="scene" clearable placeholder="请选择服务场景" style="width: 180px;margin-right: 8px">
          <el-option-group
            v-for="group in options"
            :key="group.label"
            :label="group.label">
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.value"
              :value="item.label">
            </el-option>
          </el-option-group>
        </el-select>
        <hr/>
      </div>
    </el-header>
    <br>
    <el-header>
      <div id="div1">
        <el-button type="primary" icon="el-icon-search" size="small" @click="searchSealApp">搜索</el-button>
        <el-button type="primary" icon="el-icon-edit" size="small" @click="changeStatusAllow(scope)" >启用</el-button>
        <el-button type="warning" icon="el-icon-edit" size="small" @click="changeStatusForbidden(scope)" >禁用</el-button>
        <el-button type="danger" icon="el-icon-edit" size="small" @click="changeStatusRevoke(scope)" >撤销</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table :data="searchResList" highlight-current-row size="small" height="calc(100vh - 198px)" border style="width: 100%; line-height: 20px" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40" />
        <el-table-column prop="sealId" label="印章序号" width="160" />
        <el-table-column prop="sealName" label="印章名称" min-width="160" />
        <el-table-column prop="userId" label="用户编号" min-width="160" />
        <el-table-column prop="marketId" label="场景" min-width="160" />
        <el-table-column prop="state" :formatter="formatState" label="印章状态" min-width="160" />
        <el-table-column prop="type" :formatter="formatType" label="印章类型" min-width="160" />
        <el-table-column prop="updateTime" label="更新时间" min-width="160" />
      </el-table>
      <div class="block" style="line-height: 2px">
        <el-pagination
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="queryParam.pageInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="queryParam.pageInfo.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-main>

    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form :model="search" class="demo-form-inline" label-width="80px" label-position="left" :inline="true">
        <el-form-item label="印章序号">
          <el-input v-model="search.sealId" placeholder="" style="width: 180px"/>
        </el-form-item>
        <el-form-item label="场景">
          <el-input v-model="search.scenario" placeholder="" style="width: 180px"/>
        </el-form-item>
      </el-form>
      <el-form :model="search" class="demo-form-inline" label-width="80px" label-position="left" :inline="true">
        <el-form-item label="申请人">
          <el-input v-model="search.userId" placeholder="" style="width: 180px"/>
        </el-form-item>
        <el-form-item label="印章名称">
          <el-input v-model="search.sealName" placeholder="" style="width: 180px"/>
        </el-form-item>
      </el-form>
      <el-form :model="search" class="demo-form-inline" label-width="80px" label-position="left" :inline="true">
        <el-form-item label="申请时间">
          <el-col :span="22">
            <el-date-picker type="date" v-model="search.updateTime" placeholder="选择日期" style="width: 180px;"></el-date-picker>
          </el-col>
          <!-- <el-input v-model="search.createTime" placeholder="" /> -->
        </el-form-item>
        <el-form-item label="审批时间">
          <el-col :span="22">
            <el-date-picker type="date" v-model="search.sealType"  placeholder="选择日期" style="width: 180px;"></el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
import sealManageApi from '../../api/SealManageApi'

export default {
  name: `test`,
  data() {
    return {
      dialogVisible: false, // 详情框
      searchResList: [], // 分页查询
      sealNameSearch: null, // 查询条件
      sealStateSearch: null, // 查询条件
      sealTypeSearch: null, // 查询条件
      knowledgeId: null,
      currentPage4: 1, // 分页
      doc: null,
      scene: null,
      search: {
        sealId: '',
        scenario: '',
        userId: '',
        sealName: '',
        updateTime: '',
        sealType: ''
      },
      queryParam: {
        data: {
          sealName: null,
          state: null,
          type: null,
          startTime: '',
          endTime: '',
          marketId: null
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
          size: 0,
          startRow: 1,
          endRow: 1,
          pages: 0,
          prePage: 0,
          nextPage: 0,
          isFirstPage: true,
          isLastPage: true,
          hasPreviousPage: false,
          navigatePages: 0,
          navigatepageNums: [],
          navigateFirstPage: 1,
          navigateLastPage: 1,
          total: 0
        }
      },
      options: [],
      sceneOptions: [{
        state: '0',
        label: '启用'
      }, {
        state: '1',
        label: '禁用'
      }, {
        state: '2',
        label: '撤销'
      }],
      typeOptions: [{
        type: '1',
        label: '交易'
      }, {
        type: '2',
        label: '市场'
      }, {
        type: '3',
        label: '服务'
      }],
      value: '',
      dataValueStart: '',
      dataValueEnd: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }]
      },
      // 修改印章状态
      changeStatus: {
        // 复选框选中项
        bsElectronSealExtList: [],
        status: null
      }
    }
  },
  watch: {
    sealNameSearch: function f() {
      if (this.sealNameSearch !== '') {
        this.queryParam.data.sealName = this.sealNameSearch
      } else {
        this.queryParam.data.sealName = null
      }
    },
    sealStateSearch: function f() {
      if (this.sealStateSearch !== '') {
        this.queryParam.data.state = this.sealStateSearch
      } else {
        this.queryParam.data.state = null
      }
    },
    sealTypeSearch: function f() {
      if (this.sealTypeSearch !== '') {
        this.queryParam.data.type = this.sealTypeSearch
      } else {
        this.queryParam.data.type = null
      }
    },
    scene: function s() {
      if (this.scene !== '') {
        this.queryParam.data.marketId = this.scene
      } else {
        this.queryParam.data.marketId = null
      }
    },
    dataValueStart: function ds() {
      if (this.dataValueStart !== '') {
        this.queryParam.data.startTime = this.dataValueStart
      } else {
        this.queryParam.data.startTime = ''
      }
    },
    dataValueEnd: function es() {
      if (this.dataValueEnd !== '') {
        this.queryParam.data.endTime = this.dataValueEnd
      } else {
        this.queryParam.data.endTime = ''
      }
    }
  },
  mounted() {
    this.queryPage(this.queryParam)
    this.queryScene()
  },
  methods: {
    searchSealApp() {
      this.queryParam.pageInfo.pageNum = 1
      this.queryParam.pageInfo.pageSize = 10
      this.queryPage(this.queryParam)
    },
    queryPage(queryParam) {
      sealManageApi.querySeals(queryParam).then(res => {
        this.searchResList = res.data.list
        this.queryParam.pageInfo = res.data
      })
    },
    queryScene() {
      console.log('查询场景')
      sealManageApi.queryScene().then(res => {
        console.log(res.data.list)
        this.options = res.data.list
      })
    },
    changeStatusAllow() {
      if (this.changeStatus.bsElectronSealExtList.length === 0) {
        this.$message({
          message: '请至少选择一个印章',
          type: 'warning'
        })
        return
      }
      const list = this.changeStatus.bsElectronSealExtList
      let count = 0
      for (let i = 0; i < list.length; i++) {
        if (list[i].state === '2') {
          count = count + 1
        }
      }
      if (count > 0) {
        this.$message({
          message: '所选项中有已撤销的印章，已撤销的印章无法“启用”或“禁止”',
          type: 'warning'
        })
        return
      }
      this.$confirm('你确定要启用该印章吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      })
        .then(async() => {
          this.changeStatusApi(0) // 启用
        }).catch(err => { console.error(err) })
    },
    changeStatusForbidden() {
      if (this.changeStatus.bsElectronSealExtList.length === 0) {
        this.$message({
          message: '请至少选择一个印章',
          type: 'warning'
        })
        return
      }
      const list = this.changeStatus.bsElectronSealExtList
      let count = 0
      for (let i = 0; i < list.length; i++) {
        if (list[i].state === '2') {
          count = count + 1
        }
      }
      if (count > 0) {
        this.$message({
          message: '所选项中有已撤销的印章，已撤销的印章无法“启用”或“禁止”',
          type: 'warning'
        })
        return
      }
      this.$confirm('你确定要禁用该印章吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          this.changeStatusApi(1) // 禁用
        }).catch(err => { console.error(err) })
    },
    changeStatusRevoke() {
      if (this.changeStatus.bsElectronSealExtList.length === 0) {
        this.$message({
          message: '请至少选择一个印章',
          type: 'warning'
        })
        return
      }
      this.$confirm('你确定要撤销该印章吗，禁用后将无法恢复?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      })
        .then(async() => {
          this.changeStatusApi(2) // 撤销
        }).catch(err => { console.error(err) })
    },
    // 修改印章状态
    changeStatusApi(val) {
      this.changeStatus.status = val
      sealManageApi.changeStatus(this.changeStatus).then(res => {
        this.$message({
          message: '更新成功',
          type: 'success'
        })
        this.searchSealApp()
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.queryParam.pageInfo.pageSize = val
      this.queryPage(this.queryParam)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.queryParam.pageInfo.pageNum = val
      this.queryPage(this.queryParam)
    },
    handleClose(done) {
      done()
    },
    formatType(row, column) {
      return row.type === '1' ? '交易' : row.type === '2' ? '市场' : row.type === '3' ? '服务' : ''
    },
    formatState(row, column) {
      return row.state === '0' ? '启用' : row.state === '1' ? '禁用' : row.state === '2' ? '撤销' : ''
    },
    handleSelectionChange(val) {
      // alert(JSON.stringify(val))
      this.changeStatus.bsElectronSealExtList = val
    }
  }
}
</script>
<style scoped>
  .el-header {
    color: #333;
    text-align: left;
    line-height: 30px;
  }

  .el-main {
    color: #333;
    margin-top: 30px;
    text-align: center;
    line-height: 160px;
    padding-top: 0;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  #div1 {
    margin-top: 35px;
    left: 10px;
    position: relative;
  }
  #div1 .el-button {
    position: relative;
    top: 5px;
  }
  .m-header{
    position: relative;
    height: 44px;
    left: 20px;
    color: white;
    font-size: 0
  }
  .icon{
    position: relative;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
    margin-left: 15px;
    font-size: 15px
  }
  .headerImg{
    position: absolute;
    left: -20px;
    width: 100%;
    height: 60px;
  }
  .text{
    position: relative;
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    margin-left: 20px;
    font-size: 20px
  }
</style>
