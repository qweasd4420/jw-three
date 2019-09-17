<template>
  <el-container>
    <el-main>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="userManage">
          <span slot="label"><i class="el-icon-info"></i> 用户管理</span>
          <!-- 表单 -->
          <el-form ref="form" :model="pageInfo" label-position="right" >
            <el-form-item label="页面名称">
              <el-input v-model="pageInfo.pageName" style="width: 200px" clearable></el-input>
            </el-form-item>
            <el-form-item label="描述描述">
              <el-input type="textarea" v-model="pageInfo.pageDesc" style="width: 200px" clearable></el-input>
            </el-form-item>
            <!-- 第一个版本日期 -->
            <el-form-item label="创建日期">
              <el-date-picker v-model="pageInfo.createTime" type="datetime" style="width: 200px" placeholder="选择日期时间" :readonly="readonlyFlag" clearable></el-date-picker>
            </el-form-item>
            <!-- 最后一个版本日期 -->
            <el-form-item label="修改日期">
              <el-date-picker v-model="pageInfo.updateTime" type="datetime" style="width: 200px" placeholder="选择日期时间" :readonly="readonlyFlag" clearable></el-date-picker>
            </el-form-item>
            <el-form-item label="创建用户">
              <el-input v-model="pageInfo.userName" style="width: 200px" :readonly="readonlyFlag"></el-input>
            </el-form-item>
            <el-form-item label="当前版本用户">
              <el-input v-model="pageInfo.updateUserId" style="width: 200px" :readonly="readonlyFlag"></el-input>
            </el-form-item>
            <el-form-item label="当前版本">
              <el-input style="width: 200px" prefix="V" v-model="pageInfo.curVersion" :readonly="readonlyFlag"></el-input>
            </el-form-item>
            <el-form-item label="页面的ID">
              <el-input v-model="pageInfo.pageId" style="width: 200px" :readonly="readonlyFlag"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label"><i class="el-icon-date"></i> 版本管理</span>
          <el-table :data="tableData" border fit style="margin-bottom: 20px;" height="calc(100vh - 229px)">
            <!--  -->
            <!-- <el-table-column type="index" width="50"></el-table-column> -->
            <el-table-column prop="pageName" label="页面名称" width="120"  align="center"></el-table-column>
            <el-table-column prop="pageDesc" label="页面描述"  align="center"></el-table-column>
            <el-table-column prop="userId" label="创建人"  align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"  align="center"></el-table-column>
            <el-table-column prop="version" label="版本号"  align="center"></el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            style="margin-top: 15px;text-align: center;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="queryParam.pageInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="queryParam.pageInfo.total">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>
<script>
import TreeManageApi from '../../../api/TreeManageApi'
export default {
  name: 'PageForm',
  props: ['nodeInfo'],
  data() {
    return {
      activeName: 'userManage',
      currentPage: 1,
      tableData: [],
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
      queryParam: {
        data: {
          pageId: '',
          startTime: '',
          endTime: ''
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
      readonlyFlag: true // 日期只读标识
    }
  },
  mounted() {
    this.initPageInfo(this.nodeInfo)
  },
  methods: {
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
      // this.queryPage(this.queryParam)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.queryParam.pageInfo.pageNum = val
      // this.queryPage(this.queryParam)
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  },
  watch: {
    'nodeInfo': function(newVal) {
      this.initPageInfo(this.nodeInfo)
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
