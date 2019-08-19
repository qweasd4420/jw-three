<template>
  <el-container>
    <el-header>
      <div class="m-header">
        <img class="headerImg" src="@/static/header.png">
        <div class="icon"><img src="@/static/logo.png"></div>
        <h1 class="text">知识搜索</h1>
      </div>
    </el-header>
    <el-header>
      <div>
        &nbsp;&nbsp;<span class="demonstration">标签</span>&nbsp;
        <!--<el-input v-model="KeywordSearch" clearable placeholder="标签" size="small" style="width: 180px;margin-right: 8px" />-->
        <el-autocomplete
          class="inline-input"
          v-model="KeywordSearch"
          :fetch-suggestions="queryTagSearch"
          placeholder="请输入标签"
          :trigger-on-focus="false"
          @select="handleSelect"
          style="width: 180px;margin-right: 8px"
          clearable></el-autocomplete>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span class="demonstration">知识名称</span>&nbsp;
        <el-input v-model="nameSearch" clearable placeholder="知识名称" size="small" style="width: 180px;margin-right: 8px" />
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
        <el-table-column prop="knowledgeId" label="序号" width="160" />
        <el-table-column prop="scenario" label="场景" min-width="160" />
        <el-table-column prop="knowledgeCode" label="编码" min-width="160" />
        <el-table-column prop="knowledgeName" label="知识名称" min-width="160" />
        <el-table-column prop="" label="标签" min-width="160">
          <template slot-scope="scope">
            <el-tag
              :key="tag"
              v-for="tag in scope.row.knowledgeKeyword.split(' ')"
              :disable-transitions="false"
              size="medium"
              style="margin: 2px">
              {{tag}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="160" />
        <el-table-column prop="" width="160" label="附件">
          <template slot-scope="scope">
            <el-button type="text" prop="url" size="small" @click="downLoad">{{ scope.row.filename }}{{ scope.row.attachmentType }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="" width="160" label="操作">
          <template slot-scope="scope">
            <i class="el-icon-view" @click="lookDesc(scope)" style="font-size: 20px"></i>
          </template>
        </el-table-column>
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
      <el-form :inline="true" label-width="80px" label-position="left">
        <el-form-item label="知识名称">
          <el-input v-model="search.knowledgeName" placeholder="" style="width: 90%"/>
        </el-form-item>&nbsp;&nbsp;
        <el-form-item label="类别">
          <el-input v-model="search.knowledgeType" placeholder="" style="width: 90%"/>
        </el-form-item>
      </el-form>
      <el-form label-width="80px" label-position="left">
        <el-form-item label="标签">
          <el-tag
            :key="tag"
            v-for="tag in search.knowledgeKeyword.split(' ')"
            :disable-transitions="false"
            size="medium"
            style="margin: 2px">
            {{tag}}
          </el-tag>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input type="textarea" v-model="search.knowledgeAbstract" autosize placeholder="" />
        </el-form-item>
        <el-form-item label="附件">
          <el-input v-model="search.filePath" placeholder="" style="width: 30%"/>
          &nbsp;&nbsp;
          <el-button type="text" prop="url" size="small" @click="downLoad">下载</el-button>
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
      searchResList: [], // 分页查询
      KeywordSearch: null, // 查询条件
      nameSearch: null,
      knowledgeId: null,
      currentPage4: 1, // 分页
      doc: null,
      scene: null,
      search: {
        knowledgeId: '',
        knowledgeCode: '',
        knowledgeName: '',
        knowledgeType: '',
        knowledgeKeyword: '',
        createTime: '',
        scenario: '',
        knowledgeAbstract: '',
        attachmentType: '',
        filePath: ''
      },
      queryParam: {
        data: {
          knowledgeKeyword: null,
          knowledgeName: null,
          knowledgeId: null,
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
      options: [],
      value: ''
    }
  },
  watch: {
    KeywordSearch: function f() {
      if (this.KeywordSearch !== '') {
        this.queryParam.data.knowledgeKeyword = this.KeywordSearch
      } else {
        this.queryParam.data.knowledgeKeyword = null
      }
    },
    nameSearch: function v() {
      if (this.nameSearch !== '') {
        this.queryParam.data.knowledgeName = this.nameSearch
      } else {
        this.queryParam.data.knowledgeName = null
      }
    },
    scene: function s() {
      if (this.scene !== '') {
        this.queryParam.data.scenario = this.scene
      } else {
        this.queryParam.data.scenario = null
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
    queryPage(queryParam) {
      searchapi.queryPage(queryParam).then(res => {
        console.log(res.data)
        this.searchResList = res.data.list
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
    lookDesc({ $index, row }) {
      this.knowledge = this.searchResList[$index]
      console.log('this.knowledgeId=' + this.knowledge)
      this.queryParam.data.knowledgeName = null
      this.queryParam.data.knowledgeKeyword = null
      this.queryParam.data.knowledgeId = this.knowledge.knowledgeId
      console.log(this.knowledge.knowledgeId)
      searchapi.queryDetail(this.queryParam).then(res => {
        console.log(res.data)
        this.search = res.data
        this.search.filePath = this.search.filename + this.search.attachmentType
      })
      this.dialogVisible = true
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
      this.queryParam.data.knowledgeId = null
      done()
    },
    queryTagSearch(queryString, cb) {
      // 调用查询方法
      searchapi.queryTag(queryString.toString()).then(res => {
        // 查询结果
        console.log('查询结果' + res.data.list)
        const results = res.data.list
        // 调用 callback 返回建议列表的数据
        cb(results)
      })
    },
    handleSelect(item) {
      // 选择的值
      console.log(item)
    },
    downLoad() {
      this.$message({
        message: '下载成功',
        type: 'success'
      })
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
