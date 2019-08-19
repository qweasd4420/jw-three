<template>
  <el-container>
    <el-header>
      <div class="m-header">
        <img class="headerImg" src="@/static/header.png">
        <div class="icon"><img src="@/static/logo.png"></div>
        <h1 class="text">电子印章申请</h1>
      </div>
    </el-header>
    <el-header>
      <div>
        &nbsp;&nbsp;<span class="demonstration">申请人</span>&nbsp;
        <el-input v-model="applyPersonSearch" clearable placeholder="申请人" size="small" style="width: 180px;margin-right: 8px" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span class="demonstration">服务场景</span>&nbsp;
        <el-select v-model="scene" clearable placeholder="请选择服务场景">
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
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span class="demonstration">起始日期</span>&nbsp;
        <el-date-picker
          v-model="dataValueStart"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd">
        </el-date-picker>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span class="demonstration">结束日期</span>&nbsp;
        <el-date-picker
          v-model="dataValueEnd"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd">
        </el-date-picker>
        <hr/>
      </div>
    </el-header>
    <el-header>
      <div id="div1">
        <el-button type="primary" icon="el-icon-search" size="small" @click="searchSealApp">搜索</el-button>
        &nbsp;&nbsp;
        <el-button type="primary" icon="el-icon-edit" size="small" @click="approvalSealApp">审批</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table :data="searchResList" highlight-current-row size="small" height="calc(100vh - 198px)" border style="width: 100%; line-height: 20px">
        <el-table-column type="selection" width="40" />
        <el-table-column prop="applyId" label="申请序号" width="160" />
        <el-table-column prop="scenario" label="场景" min-width="160" />
        <el-table-column prop="applyPerson" label="申请人" min-width="160" />
        <el-table-column prop="sealName" label="印章名称" min-width="160" />
        <el-table-column prop="applyTime" label="申请时间" min-width="160" />
        <el-table-column prop="approvalTime" label="审批时间" min-width="160" />
      </el-table>
      <div class="block" style="line-height: 2px">
        <el-pagination
          :current-page="currentPage4"
          :page-sizes="[2, 10, 20, 30, 40]"
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
        <el-form-item label="申请序号">
          <el-input v-model="search.applyId" placeholder="" style="width: 180px"/>
        </el-form-item>
        <el-form-item label="场景">
          <el-input v-model="search.scenario" placeholder="" style="width: 180px"/>
        </el-form-item>
      </el-form>
      <el-form :model="search" class="demo-form-inline" label-width="80px" label-position="left" :inline="true">
        <el-form-item label="申请人">
          <el-input v-model="search.applyPerson" placeholder="" style="width: 180px"/>
        </el-form-item>
        <el-form-item label="印章名称">
          <el-input v-model="search.sealName" placeholder="" style="width: 180px"/>
        </el-form-item>
      </el-form>
      <el-form :model="search" class="demo-form-inline" label-width="80px" label-position="left" :inline="true">
        <el-form-item label="申请时间">
          <el-col :span="22">
            <el-date-picker type="date" placeholder="选择日期" v-model="search.applyTime" style="width: 180px;"></el-date-picker>
          </el-col>
          <!-- <el-input v-model="search.createTime" placeholder="" /> -->
        </el-form-item>
        <el-form-item label="审批时间">
          <el-col :span="22">
            <el-date-picker type="date" placeholder="选择日期" v-model="search.approvalTime" style="width: 180px;"></el-date-picker>
          </el-col>
          <!-- <el-input v-model="search.createTime" placeholder="" /> -->
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
import searchapi from '../../api/searchapi'

export default {
  name: `test`,
  data() {
    return {
      dialogVisible: false, // 详情框
      searchResList: [{
        applyId: 1,
        scenario: '北京交易中心',
        applyPerson: '操作员1',
        sealName: '北京交易中心专用章',
        applyTime: '2019-06-02',
        approvalTime: '2019-06-03'
      }, {
        applyId: 2,
        scenario: '首都交易中心',
        applyPerson: '操作员2',
        sealName: '首都交易中心专用章',
        applyTime: '2019-06-02',
        approvalTime: '2019-06-03'
      }, {
        applyId: 3,
        scenario: '天津交易中心',
        applyPerson: '操作员3',
        sealName: '天津交易中心专用章',
        applyTime: '2019-06-02',
        approvalTime: '2019-06-03'
      }], // 分页查询
      applyPersonSearch: null, // 查询条件
      knowledgeId: null,
      currentPage4: 1, // 分页
      doc: null,
      scene: null,
      search: {
        applyId: '',
        scenario: '',
        applyPerson: '',
        sealName: '',
        applyTime: '',
        approvalTime: ''
      },
      queryParam: {
        data: {
          applyPerson: null,
          fileName: null,
          knowledgeId: null,
          scenario: null
        },
        pageInfo: {
          pageNum: 0,
          pageSize: 2,
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
      }
    }
  },
  watch: {
    applyPersonSearch: function f() {
      if (this.applyPersonSearch !== '') {
        this.queryParam.data.applyPerson = this.applyPersonSearch
      } else {
        this.queryParam.data.applyPerson = null
      }
    },
    scene: function s() {
      if (this.scene !== '') {
        this.queryParam.data.scenario = this.scene
      } else {
        this.queryParam.data.scenario = null
      }
    },
    dataValueStart: function ds() {
      if (this.dataValueStart !== '') {
        alert(this.dataValueStart)
      }
    }
  },
  mounted() {
    this.queryPage(this.queryParam)
    this.queryScene()
  },
  methods: {
    searchSealApp() {
      this.queryParam.pageInfo.pageNum = 0
      this.queryParam.pageInfo.pageSize = 2
      this.queryPage(this.queryParam)
    },
    approvalSealApp() {
      // 审批-----判断是选择的是一个还是多个，如果是一个则打开详情页面，如果选择多个，则直接弹出弹窗，是否不查看直接审批
      // 子功能点： 1、选择审批流程（查询bpm流程接口） 2、自定义审批流程（前往bpm平台） 3、当前进行中的审批流程
    },
    queryPage(queryParam) {
      searchapi.queryPage(queryParam).then(res => {
        console.log(res.data)
        this.queryParam.pageInfo = res.data
      })
    },
    queryScene() {
      console.log('查询场景')
      searchapi.queryScene().then(res => {
        console.log(res.data.list)
        this.options = res.data.list
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
    }
  }
}
</script>
<style scoped>
  .el-header {
    color: #333;
    text-align: left;
    line-height: 60px;
  }

  .el-main {
    color: #333;
    text-align: center;
    line-height: 160px;
    padding-top: 0;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  #div1 {
    margin-top: 0px;
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
