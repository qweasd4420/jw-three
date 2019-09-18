<template>
  <el-container>
    <el-main>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="userManage">
          <span slot="label"><i class="el-icon-info"></i> 用户管理</span>
          <!-- 表单 -->
          <el-form ref="form" :model="pageInfo" label-position="right" >
            <el-form-item label="页面名称">
              <el-input v-model="pageInfo.pageName" style="width: 400px" clearable></el-input>
            </el-form-item>
            <el-form-item label="描述描述">
              <el-input type="textarea" v-model="pageInfo.pageDesc" style="width: 400px" clearable></el-input>
            </el-form-item>
            <!-- 第一个版本日期 -->
            <el-form inline>
              <el-form-item label="创建日期">
                <el-date-picker v-model="pageInfo.createTime" type="datetime" style="width: 200px" placeholder="选择日期时间" :readonly="readonlyFlag" clearable></el-date-picker>
              </el-form-item>
              <!-- 最后一个版本日期 -->
              <el-form-item label="修改日期">
                <el-date-picker v-model="pageInfo.updateTime" type="datetime" style="width: 200px" placeholder="选择日期时间" :readonly="readonlyFlag" clearable></el-date-picker>
              </el-form-item>
            </el-form>
            <el-form-item label="创建人">
              <el-input v-model="pageInfo.userName" style="width: 400px" :readonly="readonlyFlag"></el-input>
            </el-form-item>
            <el-form inline>
              <el-form-item label="修改人">
                <el-input v-model="pageInfo.updateUserId" style="width: 200px" :readonly="readonlyFlag"></el-input>
              </el-form-item>
              <el-form-item label="当前版本">
                <el-input style="width: 200px" prefix="V" v-model="pageInfo.curVersion" :readonly="readonlyFlag"></el-input>
              </el-form-item>
            </el-form>
            <el-form-item label="页面编号">
              <el-input v-model="pageInfo.pageId" style="width: 200px" :readonly="readonlyFlag"></el-input>
            </el-form-item>
            <el-form-item inline>
              <el-button type="primary" icon="el-icon-edit" @click="versionEdit">编辑</el-button>
              <el-button type="primary" icon="el-icon-search" @click="lookPageDesc">查看</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="versionManage">
          <span slot="label"><i class="el-icon-date"></i> 版本管理</span>
          <el-form
            :model="listQuery"
            inline
            ref="listQuery"
            class="demo-form-inline"
          >
            <el-form-item prop="userId" label>
              <el-input v-model="listQuery.userId" placeholder="请输入用户编号" clearable/>
            </el-form-item>
            <el-form-item prop="version" label>
              <el-select v-model="listQuery.version" filterable placeholder="请选择版本号" clearable>
                <el-option v-for="item in versionOptions" :key="item" :label="item" :value="item"/>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="conditionSearch">Search</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="tableData" border fit style="margin-bottom: 20px;width: 100%" height="calc(100vh - 400px)">
            <!--  -->
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" class="demo-table-expand">
                  <el-form-item label="页面名称">
                    <span>{{ props.row.pageName }}</span>
                  </el-form-item>
                  <el-form-item label="页面描述">
                    <span>{{ props.row.pageDesc }}</span>
                  </el-form-item>
                  <el-form-item label="创建人">
                    <span>{{ props.row.userId }}</span>
                  </el-form-item>
                  <el-form-item label="创建时间">
                    <span>{{ props.row.createTime }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <!-- <el-table-column type="index" width="50"></el-table-column> -->
            <el-table-column prop="pageName" label="页面名称" align="center"></el-table-column>
            <!--<el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>-->
            <el-table-column prop="version" label="版本号"  align="center"></el-table-column>
            <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
              <template slot-scope="{row}">
                <el-button type="primary" icon="el-icon-search" size="small" @click="lookPage(row)">
                  查看
                </el-button>
                <el-button size="small" icon="el-icon-edit" type="success" @click="overridePage(row)">
                  覆盖
                </el-button>
                <el-button icon="el-icon-delete" size="small" type="danger" @click="deleteVersion(row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            style="margin-top: 15px;text-align: center;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="queryParam.pageInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="queryParam.pageInfo.total">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
      <el-dialog
        title=""
        :visible.sync="dialogEditPage"
        top="5px"
        width="95%"
        hight="95%"
        :before-close="editPageHandleClose"
        align="center"
      >
        <iframe ref="editPageIframe" :src="editPageUrl" :width="iframe.iframeWidth" :height="iframe.iframeHigh" frameborder="0" :style="iframe.iframeStyle"></iframe>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script>
import TreeManageApi from '../../../api/TreeManageApi'
import DragPageApi from '../../../api/DragPageApi'
export default {
  name: 'PageForm',
  props: ['nodeInfo'],
  data() {
    return {
      activeName: 'userManage',
      currentPage: 1,
      tableData: [],
      dialogEditPage: false,
      editPageUrl: '',
      iframe: {
        iframeWidth: '',
        iframeHigh: '',
        iframeStyle: ''
      },
      pageInfo: {
        pageName: '',
        pageDesc: '',
        createTime: '',
        updateTime: '',
        userName: '',
        updateUserId: '',
        curVersion: '',
        pageId: ''
      },
      listQuery: {
        userId: '', // 根据id模糊搜索，之后改成根据用户名模糊搜索
        version: '' // 版本号
      },
      versionOptions: [], // 版本列表
      queryParam: {
        data: {
          pageId: '',
          userId: '',
          version: ''
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 5,
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
      readonlyFlag: true // 日期只读标识
    }
  },
  mounted() {
    this.initPageInfo(this.nodeInfo)
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    initPageInfo(nodeInfo) {
      const param = {
        pageId: nodeInfo
      }
      // 调用查询文件夹信息接口
      TreeManageApi.queryPageInfo(param).then(res => {
        if (res.status === 0) {
          this.pageInfo = res.data
        }
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
    handleClick(tab, event) {
      if (this.activeName === 'versionManage') {
        // 根据pageId，查询当前可以显示的所有版本页面信息
        this.queryParam.data.pageId = this.nodeInfo
        this.queryPage(this.queryParam)
      } else {
        this.initPageInfo(this.nodeInfo)
      }
    },
    queryPage(queryParam) {
      DragPageApi.queryVersionList(queryParam).then(res => {
        this.tableData = res.data.list
        // 遍历res.data.list获取所有版本号-不可行，因为涉及分页
        this.queryParam.pageInfo.total = res.data.total
        this.resetForm('listQuery')
      })
      const param = {
        'pageId': this.nodeInfo
      }
      DragPageApi.queryVersions(param).then(res => {
        this.versionOptions = res.data
      })
    },
    // 条件查询
    conditionSearch() {
      this.queryParam.data.userId = this.listQuery.userId
      this.queryParam.data.version = this.listQuery.version
      this.queryPage(this.queryParam)
    },
    lookPage(row) {
      // 使用iframe打开一个页面，显示页面详情
    },
    overridePage(row) {
      // 覆盖页面版本
    },
    deleteVersion(row) {
      // 删除页面版本
    },
    versionEdit() {},
    lookPageDesc() {},
    editPageHandleClose(done) {
      this.$confirm('确定退出?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(async() => {
        console.log('执行')
        done()
      }).catch(err => {
        console.error('取消' + err)
        // 通知另一个打开保存弹窗
      })
    }
  },
  watch: {
    'nodeInfo': function(newVal) {
      this.initPageInfo(this.nodeInfo)
      this.activeName = 'userManage'
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
