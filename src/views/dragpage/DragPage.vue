<template @click="hideMenu">
  <el-container>
    <el-aside
        v-if="isCollapse"
        style="background-color: rgb(238, 241, 246);padding:2px 6px">
      <!--左侧内容-->
      <el-input
        style="padding: 18px 0 18px 0;background: #ffffff;"
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
      <el-tree
        class="filter-tree"
        :props="treeProps"
        style="height:calc(100vh - 185px);"
        :data="data"
        ref="tree"
        node-key="id"
        default-expand-all
        :highlight-current="true"
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
        :filter-node-method="filterNode"
        @node-contextmenu="rightClick"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>
            <template v-if="data.grade != undefined && data.grade != undefined && data.grade == '2'" >
              <i class="el-icon-document"></i>&nbsp;{{ node.label }}
            </template>
            <template v-if="data.grade != undefined && data.grade != undefined && (data.grade == '1' || data.grade == '0')" >
              <i class="iconfont icon-icon_workfile_line"></i>&nbsp;{{ node.label }}
            </template>
          </span>
        </span>
      </el-tree>
      <div  id="menuThree" class="topTriangle" v-show="menuThreeVisible"  style="width:126px;height:60px;border:1px solid #d3d7d4;background:#fff;z-index:9999;border-radius: 5px">
        <ul style="margin:0;padding:0;list-style:none;text-align: left">
          <li style="margin:0px 10px;font-size:14px;line-height:30px;height:30px;" @click="createFolder"><i class="iconfont icon-icon_workfile_line" style="padding-right:10px;"></i>新建文件夹</li>
          <li style="margin:0px 10px;font-size:14px;line-height:30px;height:30px;" @click="createPage"><i class="el-icon-document" style="padding-right:10px;"></i>新建页面</li>
        </ul>
      </div>
      <div  id="menuTwo" class="topTriangle" v-show="menuTwoVisible"  style="width:126px;height:90px;border:1px solid #d3d7d4;background:#fff;z-index:9999;border-radius: 5px">
        <ul style="margin:0;padding:0;list-style:none;text-align: left">
          <li style="margin:0px 10px;font-size:14px;line-height:30px;height:30px;" @click="createFolder"><i class="iconfont icon-icon_workfile_line" style="padding-right:10px;"></i>新建文件夹</li>
          <li style="margin:0px 10px;font-size:14px;line-height:30px;height:30px;" @click="createPage"><i class="el-icon-document" style="padding-right:10px;"></i>新建页面</li>
          <li style="margin:0px 10px;font-size:14px;line-height:30px;height:30px;" @click="deleteFolder"><i class="el-icon-delete" style="padding-right:10px;"></i>删除</li>
        </ul>
      </div>
      <div id="menuOne" class="topTriangle"  v-show="menuOneVisible" style="width:126px;height:60px;border:1px solid #d3d7d4;background:#fff;z-index:9999;border-radius: 5px">
        <ul style="margin:0;padding:0;list-style:none;text-align: left">
          <li style="margin:0px 10px;font-size:14px;line-height:30px;height:30px;" @click="editPage"><i class="el-icon-edit" style="padding-right:10px;"></i>编辑</li>
          <li style="margin:0px 10px;font-size:14px;line-height:30px;height:30px;" @click="deletePage"><i class="el-icon-delete" style="padding-right:10px;"></i>删除</li>
        </ul>
      </div>
    </el-aside>
    <!-- 右键菜单 -->
    <el-container>
      <!--右侧内容-->
      <!--<router-view/>-->
      <TreeMain style="width: 100%;" :view-name="viewName" :view-info="viewInfo"></TreeMain>
      <el-dialog
        title=""
        :visible.sync="dialogAddFolder"
        top="10%"
        width="30%"
        :before-close="folderHandleClose"
      >
        <div style="background: #ffffff;width: 100%;height:150px;position:relative;">
          <el-form ref="addFolder" :model="addFolder" :rules="rules" label-width="150px" style="position: absolute;top:20%;left:40%;transform: translate(-50%,-50%)">
            <el-form-item label="文件夹名称" prop="folderName">
              <el-input v-model="addFolder.folderName" placeholder="请输入文件夹名称" validate-event clearable style="width: 180px"/>
            </el-form-item>
            <el-form-item label="文件夹描述" prop="folderDesc">
              <el-input v-model="addFolder.folderDesc" placeholder="请输入文件夹描述" validate-event clearable style="width: 180px"/>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer" style="position: absolute;top:70%;left:50%;transform: translate(-50%,-50%)">
            <el-button @click="addFolderCancel">取 消</el-button>
            <el-button type="primary" @click="addFolderM">确 定</el-button>
          </span>
        </div>
      </el-dialog>
      <el-dialog
        title=""
        :visible.sync="dialogAddPage"
        top="10%"
        width="30%"
        :before-close="pageHandleClose"
      >
        <div style="background: #ffffff;width: 100%;height:150px;position:relative;">
          <el-form ref="addPage" :model="addPage" :rules="rules" label-width="150px" style="position: absolute;top:20%;left:40%;transform: translate(-50%,-50%)">
            <el-form-item label="页面名称" prop="pageName">
              <el-input v-model="addPage.pageName" placeholder="请输入页面名称" validate-event clearable style="width: 180px"/>
            </el-form-item>
            <el-form-item label="页面描述" prop="pageDesc">
              <el-input v-model="addPage.pageDesc" placeholder="请输入页面描述" validate-event clearable style="width: 180px"/>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer" style="position: absolute;top:70%;left:50%;transform: translate(-50%,-50%)">
            <el-button @click="addPageCancel">取 消</el-button>
            <el-button type="primary" @click="addPageM">确 定</el-button>
          </span>
        </div>
      </el-dialog>
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
    </el-container>
  </el-container>
</template>
<script>
import TreeMain from './components/TreeMain'
import TreeManageApi from '../../api/TreeManageApi'
export default {
  name: 'DragPage',
  components: {
    TreeMain
  },
  data() {
    return {
      data: [
        {
          id: '1',
          label: '电力市场',
          grade: '0',
          children: [
          ]
        }
      ],
      dialogAddFolder: false,
      dialogAddPage: false,
      dialogEditPage: false,
      addFolder: { // 添加文件夹
        folderName: '',
        folderDesc: ''
      },
      addPage: {
        pageName: '',
        pageDesc: ''
      },
      treeProps: {
        id: 'id',
        children: 'children',
        label: 'label',
        grade: 'grade',
        pid: 'pid'
      },
      viewName: '',
      viewInfo: '',
      filterText: '',
      collapseBtnClick: false,
      isCollapse: true,
      menuVisible: true, // 初始化菜单右键事件
      menuOneVisible: false,
      menuTwoVisible: false,
      menuThreeVisible: false,
      currentId: '', // 当前点击（单击或双击）的id为
      currentName: '',
      jsonData: {
        'list': [
        ],
        'config': {
          'labelWidth': 100,
          'labelPosition': 'right',
          'size': 'small'
        }
      },
      editPageUrl: '',
      iframe: {
        iframeWidth: '',
        iframeHigh: '',
        iframeStyle: ''
      },
      rules: {
        folderName: [
          { required: true, message: '请输入文件夹名称', trigger: 'blur' },
          { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
        ],
        pageName: [
          { required: true, message: '请输入页面名称', trigger: 'blur' },
          { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.initTree()
    if (this.menuVisible || this.menuOneVisible || this.menuTwoVisible || this.menuThreeVisible) {
      document.addEventListener('click', this.hideMenu)
    }
  },
  watch: {
    filterText(val) {
      console.log(val)
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    // ---------------------------- 逻辑模块 ----------------------------
    hideMenu() {
      this.menuOneVisible = false
      this.menuTwoVisible = false
      this.menuThreeVisible = false
    },
    folderHandleClose(done) {
      done()
      this.resetForm('addFolder')
    },
    pageHandleClose(done) {
      done()
      this.resetForm('addPage')
    },
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
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    addFolderCancel() {
      this.dialogAddFolder = false
      this.resetForm('addFolder')
    },
    addPageCancel() {
      this.dialogAddPage = false
      this.resetForm('addPage')
    },
    // ---------------------------- 业务模块 ----------------------------
    initTree() {
      TreeManageApi.initTree().then(res => {
        this.data = res.data
      })
    },
    handleNodeClick(data, node) {
      console.log(JSON.stringify(data))
      this.viewInfo = data.id
      // alert(this.viewInfo)
      if (data.grade !== undefined && data.grade !== null && data.grade === '1') {
        this.viewName = 'folder'
      } else if (data.grade !== undefined && data.grade !== null && data.grade === '2') {
        this.viewName = 'page'
      }
    },
    filterNode(value, data) {
      console.log(data)
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    rightClick(event, object, value, element) {
      console.log('当前文件夹id为' + value.data.id)
      this.currentId = value.data.id
      this.currentName = value.data.label
      let menu = null
      this.menuVisible = false // 修改菜单右键事件监听默认值
      if (object.grade === '0') {
        this.menuOneVisible = false
        this.menuTwoVisible = false
        this.menuThreeVisible = true
        menu = document.querySelector('#menuThree')
      } else if (object.grade === '1') {
        this.menuOneVisible = false
        this.menuTwoVisible = true
        this.menuThreeVisible = false
        menu = document.querySelector('#menuTwo')
      } else if (object.grade === '2') {
        this.menuOneVisible = true
        this.menuTwoVisible = false
        this.menuThreeVisible = false
        menu = document.querySelector('#menuOne')
      } else {
        return
      }
      /* 菜单定位基于鼠标点击位置*/
      menu.style.left = event.clientX - 207 + 'px'
      menu.style.top = event.clientY - 131 + 'px'
      menu.style.position = 'absolute'
      console.log(event.clientX)
      console.log(event.clientY)
      console.log(menu.style.left)
      console.log(menu.style.top)
      /*  } */
    },
    // 打开弹出窗口，填入文件夹名
    createFolder() {
      console.log('进入创建文件夹')
      this.dialogAddFolder = true
    },
    // 点击确定按钮调用添加文件夹接口，把参数传递过来，这个主要是父级文件夹id
    addFolderM() {
      // start
      // 此处为文件夹id
      const parentId = this.currentId
      // 调用接口，添加文件夹
      const param = {
        parentId: parentId,
        folderName: this.addFolder.folderName,
        folderDesc: this.addFolder.folderDesc
      }
      TreeManageApi.addFolderJs(param).then(res => {
        if (res.status === 0) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.addFolderCancel()
          this.initTree()
        }
      })
    },
    // 打开弹出窗口，填入页面名称
    createPage() {
      console.log('进入添加页面接口')
      this.dialogAddPage = true
    },
    // 点击确定按钮调用添加文件夹接口，把参数传递过来，这个主要是父级文件夹id
    addPageM() {
      // start
      // 此处为文件夹id
      const folderId = this.currentId
      // 调用接口，添加文件夹
      const param = {
        folderId: folderId,
        pageName: this.addPage.pageName,
        pageDesc: this.addPage.pageDesc,
        jsonData: JSON.stringify(this.jsonData) // 页面初始化数据
      }
      TreeManageApi.addPageJs(param).then(res => {
        if (res.status === 0) {
          this.$message({
            type: 'success',
            message: '添加页面成功!'
          })
          this.addPageCancel()
          this.initTree()
        }
      })
    },
    deleteFolder() {
      // 获取要删除文件夹的id
      const folderId = this.currentId
      const param = {
        folderId: folderId
      }
      TreeManageApi.deleteFolderJs(param).then(res => {
        if (res.status === 0) {
          this.$message({
            type: 'success',
            message: '节点删除文件夹成功!'
          })
          this.initTree()
        }
      })
    },
    editPage() {
      // 编辑页面
      // 打开model窗口，在model窗口中打开编辑页面
      this.dialogEditPage = true
      this.editPageUrl = 'http://localhost:8080/#/'
      let _scrollWidth = document.body.scrollWidth
      const _scrollHeight = document.body.scrollHeight
      const iTop = window.screen.height
      const iLeft = window.screen.width
      this.iframe.iframeStyle = 'position:relative;top: ' + iTop * 0.05 + ';left: ' + iLeft * 0.05
      if (_scrollWidth < 985) {
        _scrollWidth = 985
      }
      this.iframe.iframeWidth = _scrollWidth * 0.9
      this.iframe.iframeHigh = _scrollHeight * 0.8
      // 传递参数-----文件id
      const _this = this
      setTimeout(function() {
        _this.$refs.editPageIframe.contentWindow.postMessage({
          cmd: 'showPage',
          params: {
            pageId: _this.currentId,
            pageName: _this.currentName
          }
        }, '*')
      }, 1000)
    },
    deletePage() {
      const pageId = this.currentId
      const param = {
        pageId: pageId
      }
      TreeManageApi.deletePageJs(param).then(res => {
        if (res.status === 0) {
          this.$message({
            type: 'success',
            message: '节点删除文件成功!'
          })
          this.initTree()
        }
      })
    }
  }
}
</script>

<style scoped>
.none {
  display: none;
}
.block {
  display: block;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
#menuOne ul li:hover{
  background: #a1a3a6;/* #409EFF */
}
#menuTwo ul li:hover{
  background: #a1a3a6;/* #409EFF */
}
#menuThree ul li:hover{
  background: #a1a3a6;/* #409EFF */
}

</style>
