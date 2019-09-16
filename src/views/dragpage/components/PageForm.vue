<template>
  <el-container>
    <el-main>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" style="height: 500px;">
        <el-tab-pane name="userManage">
          <span slot="label"><i class="el-icon-date"></i> 用户管理</span>
          <!-- 表单 -->
          <el-form ref="form" :model="pageInfo" label-position="right" >
            <el-form-item label="页面名称">
              <el-input v-model="pageInfo.pageName" style="width: 200px" clearable></el-input>
            </el-form-item>
            <el-form-item label="描述描述">
              <el-input type="textarea" v-model="pageInfo.pageDesc" style="width: 200px" clearable></el-input>
            </el-form-item>
            <el-form-item label="创建日期">
              <el-date-picker v-model="pageInfo.createTime" type="datetime" style="width: 200px" placeholder="选择日期时间" :readonly="readonlyFlag" clearable></el-date-picker>
            </el-form-item>
            <el-form-item label="修改日期">
              <el-date-picker v-model="pageInfo.updateTime" type="datetime" style="width: 200px" placeholder="选择日期时间" :readonly="readonlyFlag" clearable></el-date-picker>
            </el-form-item>
            <el-form-item label="创建用户">
              <el-input v-model="pageInfo.userName" style="width: 200px" :readonly="readonlyFlag"></el-input>
            </el-form-item>
            <el-form-item label="页面的ID">
              <el-input v-model="pageInfo.pageId" style="width: 200px" :readonly="readonlyFlag"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label"><i class="el-icon-date"></i> 版本管理</span>
          版本管理
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
      pageInfo: {
        pageName: '',
        pageDesc: '',
        createTime: '',
        updateTime: '',
        userName: '',
        pageId: ''
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
