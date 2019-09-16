<template>
  <el-container>
    <el-main>
      <!-- 表单 -->
      <div style="background: #ffffff;width: 100%;height:600px;position:relative;">
        <span style="position: absolute;top:10%;left:44%;transform: translate(-50%,-50%);font-size: 16px;font-weight:bold">详细信息</span>
        <el-form ref="form" :model="folderInfo" label-width="150px" style="position: absolute;top:45%;left:40%;transform: translate(-50%,-50%)">
          <el-form-item label="文件夹名称">
            <el-input v-model="folderInfo.folderName" clearable></el-input>
          </el-form-item>
          <el-form-item label="文件夹描述">
            <el-input type="textarea" v-model="folderInfo.folderDesc" clearable></el-input>
          </el-form-item>
          <el-form-item label="创建日期">
            <el-date-picker v-model="folderInfo.createTime" type="datetime" placeholder="选择日期时间" :readonly="readonlyFlag" clearable></el-date-picker>
          </el-form-item>
          <el-form-item label="修改日期">
            <el-date-picker v-model="folderInfo.updateTime" type="datetime" placeholder="选择日期时间" :readonly="readonlyFlag" clearable></el-date-picker>
          </el-form-item>
          <el-form-item label="创建人">
            <el-input v-model="folderInfo.userId" readonly></el-input>
          </el-form-item>
          <el-form-item label="文件夹ID">
            <el-input v-model="folderInfo.folderId" readonly></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import TreeManageApi from '../../../api/TreeManageApi'
export default {
  name: 'FolderForm',
  props: ['nodeInfo'],
  data() {
    return {
      folderInfo: {
        folderName: '',
        folderDesc: '',
        createTime: '',
        updateTime: '',
        userId: '',
        folderId: ''
      },
      readonlyFlag: true // 日期只读标识
    }
  },
  mounted() {
    // 初始化文件夹信息页面
    this.initFolderInfo(this.nodeInfo)
  },
  methods: {
    initFolderInfo(nodeInfo) {
      const param = {
        folderId: nodeInfo
      }
      // 调用查询文件夹信息接口
      TreeManageApi.queryFolderInfo(param).then(res => {
        if (res.status === 0) {
          this.folderInfo = res.data
        }
      })
    }
  },
  watch: {
    'nodeInfo': function(newVal) {
      this.initFolderInfo(this.nodeInfo)
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
