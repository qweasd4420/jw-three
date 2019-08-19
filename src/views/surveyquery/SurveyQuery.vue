<template>
  <el-container>
    <el-header>
      <div class="m-header">
        <img class="headerImg" src="@/static/header.png">
        <div class="icon"><img src="@/static/logo.png"></div>
        <h1 class="text">调查问卷评价查询</h1>
      </div>
    </el-header>
    <el-header>
      <div>
        &nbsp;&nbsp;<span class="demonstration">问卷名称</span>&nbsp;
        <el-input v-model="surveyTitleSearch" clearable placeholder="问卷名称" size="small" style="width: 180px;margin-right: 8px" />
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
        <hr/>
      </div>
    </el-header>
    <el-header>
      <div id="div1">
        <el-button type="primary" icon="el-icon-search" size="medium" @click="searchKnow">搜索</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table :data="searchResList" size="small" height="calc(100vh - 198px)" border style="width: 100%; line-height: 20px">
        <el-table-column prop="surveyId" label="序号" width="160" />
        <el-table-column prop="scenario" label="场景" min-width="160" />
        <el-table-column prop="surveyTitle" label="问卷名称" min-width="160" />
        <el-table-column prop="creatorNo" label="评价人数" min-width="160" />
        <el-table-column prop="publishTime" label="起始日期" min-width="160">
        </el-table-column>
        <el-table-column prop="endTime" label="截止日期" min-width="160" />
        <el-table-column prop="creator" width="160" label="制定人">
        </el-table-column>
        <el-table-column prop="" width="160" label="操作">
          <template slot-scope="scope">
            <i class="el-icon-search" @click="lookDesc(scope)" style="font-size: 20px"></i>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="line-height: 2px">
        <el-pagination
          :current-page="currentPage5"
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
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
      height="calc(100vh - 250px)"
    >
      <el-dialog
        :visible.sync="innerDialogVisible"
        width="60%"
        :before-close="handleInnerClose"
        height="calc(100vh - 250px)"
        append-to-body
      >
        <el-header>
          <div class="m-header">
            <img class="headerImg" src="@/static/header.png">
            <div class="icon"><img src="@/static/logo.png"></div>
            <h1 class="text">调查问卷题目评价详情</h1>
          </div>
        </el-header>
        <el-main style="height: 35%">
          <!-- 放置表单 -->
          <div>
            <el-input v-model="title" disabled style="width: 35%;"></el-input>
            <el-table :data="innerDataList" center style="" :show-header="false" :span-method="dataSpanMethod">
              <el-table-column prop="count" label="数目" width="180" >
                <template slot-scope="scope">
                  {{ scope.row.countNo }}/{{ scope.row.countEval }}
                </template>
              </el-table-column>
              <el-table-column prop="" v-model="percent" label="百分比" width="180" >
                <template slot-scope="scope">
                  {{ Number(scope.row.countNo/scope.row.countEval*100).toFixed(1) }}%
                </template>
              </el-table-column>
              <el-table-column prop="factorContent" label="选项" width="180" >
                <template slot-scope="scope">
                  {{ scope.row.factorContent }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
        <el-header>
          <div id="div3">
            <el-button type="primary" icon="el-icon-download" size="medium" @click="downLoad">导出</el-button>
          </div>
        </el-header>
        <el-main>
          <el-table :data="searchInnerList" size="small" height="calc(100vh - 250px)" border style="width: 100%; line-height: 20px">
            <el-table-column prop="evalId" label="序号" width="160" />
            <el-table-column prop="creator" label="评价人" min-width="160" />
            <el-table-column prop="memberName" label="评价主体" min-width="160" />
            <el-table-column prop="itemId" label="评价" min-width="160" />
          </el-table>
          <div class="block" style="line-height: 2px">
            <el-pagination
              :current-page="currentPage6"
              :page-sizes="[2, 10, 20, 30, 40]"
              :page-size="queryInnerParam.pageInfo.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="queryInnerParam.pageInfo.total"
              @size-change="handleSizeInnerChange"
              @current-change="handleCurrentInnerChange"
            />
          </div>
        </el-main>
      </el-dialog>
      <el-header>
        <div class="m-header">
          <img class="headerImg" src="@/static/header.png">
          <div class="icon"><img src="@/static/logo.png"></div>
          <h1 class="text">调查问卷题目</h1>
        </div>
      </el-header>
      <el-header>
        <div>
          &nbsp;&nbsp;<span class="demonstration">评价人</span>&nbsp;
          <el-input v-model="evalSearch" clearable placeholder="评价人" size="small" style="width: 180px;margin-right: 8px" />
          <hr/>
        </div>
      </el-header>
      <el-header>
        <div id="div2">
          <el-button type="primary" icon="el-icon-search" size="medium" @click="searchDetailKnow">搜索</el-button>
        </div>
      </el-header>
      <el-main>
        <el-table :data="searchDetailList" size="small" height="calc(100vh - 198px)" border style="width: 100%; line-height: 20px">
          <el-table-column prop="evalId" label="评价序号" width="160" />
          <el-table-column prop="evalCreator" label="评价人" width="160" />
          <el-table-column prop="titleType" :formatter="formatTitleType" label="题目类型" min-width="160" />
          <el-table-column prop="title" label="题目名称" min-width="160" />
          <el-table-column prop="" width="160" label="操作">
            <template slot-scope="scope">
              <i class="el-icon-search" @click="lookInnerDesc(scope)" style="font-size: 20px"></i>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="line-height: 2px">
          <el-pagination
            :current-page="currentPage4"
            :page-sizes="[2, 10, 20, 30, 40]"
            :page-size="queryDetailParam.pageInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="queryDetailParam.pageInfo.total"
            @size-change="handleSizeDetailChange"
            @current-change="handleCurrentDetailChange"
          />
        </div>
      </el-main>
    </el-dialog>
  </el-container>
</template>

<script>
import surveyApi from '../../api/SurveyApi'

export default {
  name: `test`,
  data() {
    return {
      dialogVisible: false, // 详情框
      innerDialogVisible: false, // 详情框
      searchResList: [], // 分页查询
      searchDetailList: [], // 详情查询
      searchInnerList: [], // 内嵌弹窗
      innerDataList: [], // 内嵌弹窗
      surveyTitleSearch: null, // 查询条件
      evalSearch: null, // 查询条件
      nameSearch: null,
      surveyId: null,
      currentPage4: 1, // 分页
      currentPage5: 1, // 分页
      currentPage6: 1, // 分页
      doc: null,
      scene: null,
      title: null,
      percent: null,
      search: {
        surveyId: '',
        surveyTitle: '',
        creatorNo: '',
        publishTime: '',
        scenario: ''
      },
      queryParam: {
        data: {
          surveyTitle: null,
          scenario: null
        },
        pageInfo: {
          pageNum: 1,
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
      queryDetailParam: {
        data: {
          surveyId: null,
          evalCreator: null
        },
        pageInfo: {
          pageNum: 1,
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
      queryInnerParam: {
        data: {
          surveyId: null,
          evalId: null,
          titleId: null
        },
        pageInfo: {
          pageNum: 1,
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
      value: ''
    }
  },
  watch: {
    surveyTitleSearch: function f() {
      if (this.surveyTitleSearch !== '') {
        this.queryParam.data.surveyTitle = this.surveyTitleSearch
      } else {
        this.queryParam.data.surveyTitle = null
      }
    },
    scene: function s() {
      if (this.scene !== '') {
        this.queryParam.data.scenario = this.scene
      } else {
        this.queryParam.data.scenario = null
      }
    },
    evalSearch: function ts() {
      if (this.evalSearch !== '') {
        this.queryDetailParam.data.evalCreator = this.evalSearch
      } else {
        this.queryDetailParam.data.evalCreator = null
      }
    }
  },
  mounted() {
    this.queryPage(this.queryParam)
    this.queryScene()
  },
  methods: {
    searchKnow() {
      this.queryParam.pageInfo.pageNum = 1
      this.queryParam.pageInfo.pageSize = 2
      this.queryPage(this.queryParam)
    },
    searchDetailKnow() {
      this.queryDetailParam.pageInfo.pageNum = 1
      this.queryDetailParam.pageInfo.pageSize = 2
      this.queryDetail(this.queryDetailParam)
    },
    queryPage(queryParam) {
      surveyApi.queryPage(queryParam).then(res => {
        console.log(res.data)
        this.searchResList = res.data.list
        this.queryParam.pageInfo = res.data
      })
    },
    queryDetail(queryDetailParam) {
      surveyApi.queryDetail(queryDetailParam).then(res => {
        // 详情展示
        this.searchDetailList = res.data.list
        this.queryDetailParam.pageInfo = res.data
      })
    },
    queryInner(queryInnerParam) {
      surveyApi.queryInner(queryInnerParam).then(res => {
        // 详情展示
        this.searchInnerList = res.data.list
        this.queryInnerParam.pageInfo = res.data
      })
    },
    queryScene() {
      console.log('查询场景')
      surveyApi.queryScene().then(res => {
        console.log(res.data.list)
        this.options = res.data.list
      })
    },
    lookDesc({ $index, row }) {
      this.survey = this.searchResList[$index]
      this.queryDetailParam.data.surveyId = this.survey.surveyId
      surveyApi.queryDetail(this.queryDetailParam).then(res => {
        // 详情展示
        this.searchDetailList = res.data.list
        this.queryDetailParam.pageInfo = res.data
      })
      this.dialogVisible = true
    },
    lookInnerDesc({ $index, row }) {
      this.detail = this.searchDetailList[$index]
      console.log('this.evalId=' + this.detail.evalId)
      this.queryInnerParam.data.evalId = this.detail.evalId
      this.queryInnerParam.data.titleId = this.detail.titleId
      console.log('this.evalId=' + this.detail.titleId)
      this.queryInnerParam.data.surveyId = this.queryDetailParam.data.surveyId
      console.log('this.surveyId=' + this.queryInnerParam.data.surveyId)
      surveyApi.queryInner(this.queryInnerParam).then(res => {
        // 详情展示
        this.searchInnerList = res.data.list
        this.queryInnerParam.pageInfo = res.data
      })
      surveyApi.queryLib(this.queryInnerParam).then(res => {
        // 查询选项
        this.innerDataList = res.data.list
        this.title = this.queryInnerParam.data.titleId + '.' + res.data.list[0].title
      })
      this.innerDialogVisible = true
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
    handleSizeDetailChange(val) {
      console.log(`每页 ${val} 条`)
      this.queryDetailParam.pageInfo.pageSize = val
      this.queryDetail(this.queryDetailParam)
    },
    handleCurrentDetailChange(val) {
      console.log(`当前页: ${val}`)
      this.queryDetailParam.pageInfo.pageNum = val
      this.queryDetail(this.queryDetailParam)
    },
    handleSizeInnerChange(val) {
      console.log(`每页 ${val} 条`)
      this.queryInnerParam.pageInfo.pageSize = val
      this.queryInner(this.queryInnerParam)
    },
    handleCurrentInnerChange(val) {
      console.log(`当前页: ${val}`)
      this.queryInnerParam.pageInfo.pageNum = val
      this.queryInner(this.queryInnerParam)
    },
    handleClose(done) {
      done()
      this.queryDetailParam.data.surveyId = null
    },
    handleInnerClose(done) {
      this.title = null
      done()
    },
    downLoad() {
      console.log('导出')
      surveyApi.downLoad(this.queryInnerParam).then(res => {
        console.log('下载成功')
      })
    },
    formatTitleType(row, column) {
      return row.titleType === '1' ? '单选题' : row.titleType === '2' ? '多选题' : row.titleType === '3' ? '问答题' : ''
    },
    dataSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2 || columnIndex === 3) {
      }
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
    margin-left: 2px;
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
