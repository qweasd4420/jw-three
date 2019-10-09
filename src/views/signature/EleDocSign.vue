<template>
  <el-container>
    <!-- 列表顶部按钮 -->
    <el-header>
      <div>
        <el-button type="primary" size="small" @click="searchPdf">搜索</el-button>
        <el-button type="primary" size="small" @click="patchSignPosition">按位置批签</el-button>
        <el-button type="primary" size="small" @click="patchSignKeyWord">按关键字批签</el-button>
        <el-button type="primary" size="small" @click="verifySignFiles">批量验签</el-button>
      </div>
    </el-header>
    <!-- 列表数据展示 -->
    <el-main>
      <el-table :data="pdfList" size="small" height="calc(100vh - 198px)" border style="width: 100%; line-height: 20px" @selection-change="changeFun">
        <el-table-column type="selection" width="40" />
        <el-table-column prop="fileId" label="文件id" width="190" />
        <el-table-column prop="fileName" label="文件名" min-width="190" />
        <el-table-column prop="lastTime" label="时间" min-width="190" />
        <el-table-column prop="fileSize" label="文件大小" min-width="190" />
        <el-table-column prop="hasSign" label="是否已签章" min-width="190" />
        <el-table-column prop="" width="190" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="signSingleM(scope)">签章</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="line-height: 2px">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 30, 40]"
          :page-size="queryParam.pageInfo.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="queryParam.pageInfo.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-main>
    <!-- iframe -->
    <el-dialog
      title="新一代交易平台电子签章"
      :visible.sync="dialogSingleShow"
      width="95%"
      top="5px"
      :before-close="handleClose"
    >
      <iframe ref="child" :src="iframePdf" :width="iframeWidth" :height="iframeHigh" frameborder="0"></iframe>
    </el-dialog>
    <!-- 按位置单签 -->
    <el-dialog
      title="按位置单签"
      :visible.sync="dialogSinglePos"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="singlePositionParam" :model="singlePositionParam" label-width="80px" label-position="left">
        <el-form-item label="PIN码" prop="pin">
          <el-input v-model="singlePositionParam.pin" placeholder="" style="width: 75%" />
        </el-form-item>
      </el-form>
      <span style="color: red;">请输入UKey的PIN码</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="singlePosSignSure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 按位置批签 -->
    <el-dialog
      title="按位置批签"
      :visible.sync="dialogPositionVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="patchPositionParam" :model="patchPositionParam" label-width="80px" label-position="left">
        <el-form-item label="签署类型" prop="signType">
          <el-select v-model="patchPositionParam.signType" placeholder="请选择签署类型" style="width: 75%">
            <el-option label="签名" value="0" />
            <el-option label="签章" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="PIN码" prop="pin">
          <el-input v-model="patchPositionParam.pin" placeholder="" style="width: 75%" />
        </el-form-item>
      </el-form>
      <span style="color: red;">请输入UKey的PIN码</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="positionSignSure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 按关键字单签 -->
    <el-dialog
      title="按关键字单签"
      :visible.sync="dialogKeywordSingleVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="singleKeywordParam" :model="singleKeywordParam" label-width="80px" label-position="left">
        <el-form-item label="关键字" prop="keyword">
          <el-input v-model="singleKeywordParam.keyword" placeholder="请输入关键字" style="width: 75%" />
        </el-form-item>
        <el-form-item label="偏移方位" prop="isDeviation">
          <el-select v-model="singleKeywordParam.isDeviation" placeholder="请选择相对于关键字偏移方位" style="width: 75%">
            <el-option label="不偏移" value="0" />
            <el-option label="向上偏移" value="1" />
            <el-option label="向下偏移" value="2" />
            <el-option label="向左偏移" value="3" />
            <el-option label="向右偏移" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="签署类型" prop="signType">
          <el-select v-model="singleKeywordParam.signType" placeholder="请选择签署类型" style="width: 75%">
            <el-option label="签名" value="0" />
            <el-option label="签章" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="签署位置" prop="signMode">
          <el-select v-model="singleKeywordParam.signMode" placeholder="请选择签署第几个关键字" style="width: 75%">
            <el-option label="签署第一个关键字" value="0" />
            <el-option label="签署最后一个关键字" value="1" />
            <el-option label="签署所有关键字" value="2" />
            <el-option label="签署第二个关键字" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="PIN码" prop="pin">
          <el-input
            v-model="singleKeywordParam.pin"
            show-password
            placeholder="请输入PIN码"
            style="width: 75%"
          />
        </el-form-item>
      </el-form>
      <span style="color: red;">请输入UKey的PIN码</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="keywordSingleSignSure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 按关键字批签 -->
    <el-dialog
      title="按关键字批签"
      :visible.sync="dialogKeywordVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="patchKeywordParam" :model="patchKeywordParam" label-width="80px" label-position="left">
        <el-form-item label="关键字" prop="keyword">
          <el-input v-model="patchKeywordParam.keyword" placeholder="请输入关键字" style="width: 75%" />
        </el-form-item>
        <el-form-item label="偏移方位" prop="isDeviation">
          <el-select v-model="patchKeywordParam.isDeviation" placeholder="请选择相对于关键字偏移方位" style="width: 75%">
            <el-option label="不偏移" value="0" />
            <el-option label="向上偏移" value="1" />
            <el-option label="向下偏移" value="2" />
            <el-option label="向左偏移" value="3" />
            <el-option label="向右偏移" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="签署类型" prop="signType">
          <el-select v-model="patchKeywordParam.signType" placeholder="请选择签署类型" style="width: 75%">
            <el-option label="签名" value="0" />
            <el-option label="签章" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="签署位置" prop="signMode">
          <el-select v-model="patchKeywordParam.signMode" placeholder="请选择签署第几个关键字" style="width: 75%">
            <el-option label="签署第一个关键字" value="0" />
            <el-option label="签署最后一个关键字" value="1" />
            <el-option label="签署所有关键字" value="2" />
            <el-option label="签署第二个关键字" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="PIN码" prop="pin">
          <!--<el-input v-model="patchKeywordParam.pin" type="password" placeholder="请输入PIN码" style="width: 75%"/>-->
          <el-input
            v-model="patchKeywordParam.pin"
            show-password
            placeholder="请输入PIN码"
            style="width: 75%"
          />
        </el-form-item>
      </el-form>
      <span style="color: red;">请输入UKey的PIN码</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="keywordSignSure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 进度条 -->
    <el-dialog
      title=""
      :visible.sync="progressVisible"
      width="20%"
      :before-close="handleClose"
      align="center"
    >
      <el-progress v-if="singlePercentage.percentage!==100" type="circle" :percentage="singlePercentage.percentage"></el-progress>
      <el-progress v-if="singlePercentage.percentage===100" type="circle" :percentage="singlePercentage.percentage" status="success"></el-progress>
    </el-dialog>
  </el-container>
</template>

<script>

import SealManageApi from '../../api/SealManageApi'
import PatchSignApi from '../../api/PatchSignApi'
import SingleSignApi from '../../api/SingleSignApi'

const signSingleDefault = {
  fileId: '',
  fileName: '',
  lastTime: '',
  fileSize: '',
  hasSign: ''
}
export default {
  name: 'Approval',
  data() {
    return {
      dialogPositionVisible: false,
      dialogSinglePos: false,
      progressVisible: false, // 进度条
      singlePercentage: {
        percentage: 0, // 百分比
        signStatus: '' // 状态
      },
      dialogSingleShow: false,
      dialogKeywordVisible: false,
      dialogKeywordSingleVisible: false,
      passForm: false,
      iframeWidth: '',
      iframeHigh: '',
      iframePdf: '',
      baseURL: process.env.VUE_APP_BASE_API,
      signSingle: Object.assign({}, signSingleDefault),
      pdfList: [],
      currentPage: 1,
      queryParam: {
        data: {
          fileIds: ['09027101bf6d952cc7f74c97b9a7bcdf2dc90f1f', '0902710137b29bf55ddf4a36ae02a53498ff579e', '09027101bf6d952cc7f74c97b9a7bcdf2dc90f1f']
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
      selectList: [], // 批签文件数组
      singlePositionParam: { // 按位置单签
        singlePosition: {},
        signType: '',
        pin: '',
        fileId: '',
        fileName: ''
      },
      patchPositionParam: { // 按位置批签
        selectFiles: new Map(),
        selectFileIds: [],
        patchPosition: {},
        signType: '',
        pin: ''
      },
      singleKeywordParam: { // 按关键字单签
        fileId: '',
        fileName: '',
        keyword: '',
        isDeviation: '',
        signMode: '',
        signType: '',
        pin: ''
      },
      patchKeywordParam: { // 按关键字批签
        selectFiles: new Map(),
        selectFileIds: [],
        keyword: '',
        isDeviation: '',
        signMode: '',
        signType: '',
        pin: ''
      }
    }
  },
  watch: {
  },
  mounted() {
    this.queryPage(this.queryParam)
    window.addEventListener('message', this.handleMessage)
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.queryParam.pageInfo.pageSize = val
      this.queryPage(this.queryParam)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.queryParam.pageInfo.pageNum = val - 1
      this.queryPage(this.queryParam)
    },
    queryPage(queryParam) {
      SealManageApi.getPdfList(queryParam).then(res => {
        this.pdfList = res.data.list
        this.queryParam.pageInfo = res.data
      })
    },
    searchPdf() {
      this.queryPage(this.queryParam)
    },
    handleClose(done) {
      done()
    },
    signSingleM({ $index, row }) {
      console.log(row.fileId)
      const id = row.fileId
      this.singlePositionParam.fileName = row.fileName
      this.singlePositionParam.fileId = row.fileId
      this.singleKeywordParam.fileName = row.fileName
      this.singleKeywordParam.fileId = row.fileId
      // 打开iframe页面
      this.dialogSingleShow = true
      this.iframePdf = this.baseURL + '/px-common-signature/pdfView?' + 'fileId=' + id
      let _scrollWidth = document.body.scrollWidth
      const _scrollHeight = document.body.scrollHeight
      if (_scrollWidth < 985) {
        _scrollWidth = 985
      }
      this.iframeWidth = _scrollWidth * 0.9
      this.iframeHigh = _scrollHeight * 0.78
    },
    patchSignPosition() {
      // 按位置批签
      // 获取列表第一个id
      let id = ''
      if (this.selectList != null && this.selectList.length !== 0) {
        id = this.selectList[0].fileId
      } else {
        // 未选择
        this.$message({
          type: 'error',
          message: '未选择要批签的文件!'
        })
        return
      }
      // 打开iframe页面
      this.dialogSingleShow = true
      this.iframePdf = this.baseURL + '/px-common-signature/pdfView?' + 'fileId=' + id + '&type=pSign'
      // alert(this.iframePdf)
      let _scrollWidth = document.body.scrollWidth
      const _scrollHeight = document.body.scrollHeight
      if (_scrollWidth < 985) {
        _scrollWidth = 985
      }
      this.iframeWidth = _scrollWidth * 0.9
      this.iframeHigh = _scrollHeight * 0.78
    },
    patchSignKeyWord() {
      // 按关键字批签
      this.dialogKeywordVisible = true
      // 业务逻辑
    },
    changeFun(val) {
      this.selectList = val
    },
    handleMessage(event) { // 处理iframe返回信息
      // 根据上面制定的结构来解析iframe内部发回来的数据
      const data = event.data
      switch (data.cmd) {
        case 'singleSignPosition':
          console.log('单签位置')
          if (data.params.success === true) {
            this.singlePositionParam.signType = data.params.data.signType
            this.singlePositionParam.singlePosition = {
              xPos: data.params.data.x,
              yPos: data.params.data.y,
              pageNum: data.params.data.p
            }
            this.dialogSinglePos = true
          }
          // 业务逻辑
          break
        case 'returnPosition':
          console.log('按位置批签位置')
          if (data.params.success === true) {
            // 业务逻辑
            this.dialogSingleShow = false
            this.dialogPositionVisible = true
            this.patchPositionParam.patchPosition = data.params.data
            console.log(this.patchPositionParam.patchPosition)
          }
          break
        case 'singleSignKeyword':
          console.log('按关键字单签')
          if (data.params.success === true) {
            // 业务逻辑
            this.dialogKeywordSingleVisible = true
          }
      }
    },
    positionSignSure() { // 位置批签签章确认
      // 先清空
      this.patchPositionParam.selectFiles = new Map()
      console.log('签章位置' + this.patchPositionParam.patchPosition)
      // 业务流程---------------这个地方有 bug，之后解决
      for (let i = 0; i < this.selectList.length; i++) {
        this.patchPositionParam.selectFiles.set(this.selectList[i].fileId, this.selectList[i].fileName)
        this.patchPositionParam.selectFileIds.push(this.selectList[i].fileId)
      }
      console.log('待签章的文件为:' + JSON.stringify(this.patchPositionParam.selectFiles))
      console.log(this.patchPositionParam.selectFileIds)
      // 开始签章
      this.progressVisible = true
      PatchSignApi.patchPositionOrKeyword(this.patchPositionParam, this.singlePercentage).then((e) => {
        console.log(e)
        console.log(e.get('success'))
        console.log(e.get('error'))
        // 关闭模态窗口，关闭进度条
        this.dialogPositionVisible = false
        this.progressVisible = false
        // 清空表单
        this.resetForm('patchPositionParam')
      })
    },
    keywordSignSure() { // 按关键字批签确认
      // 先清空
      this.patchKeywordParam.selectFiles = new Map()
      for (let i = 0; i < this.selectList.length; i++) {
        this.patchKeywordParam.selectFiles.set(this.selectList[i].fileId, this.selectList[i].fileName)
        this.patchKeywordParam.selectFileIds.push(this.selectList[i].fileId)
      }
      console.log('文件' + this.patchKeywordParam.selectFiles)
      console.log(this.patchPositionParam.selectFileIds)
      // console.log(PatchSignApi.patchPositionOrKeyword(this.patchKeywordParam))
      // 开始签章
      PatchSignApi.patchPositionOrKeyword(this.patchKeywordParam, this.singlePercentage).then((e) => {
        console.log(e)
        console.log(e.get('success'))
        console.log(e.get('error'))
        // 关闭模态窗口，关闭进度条
        this.dialogKeywordVisible = false
        // 清空表单
        this.resetForm('patchKeywordParam')
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    singlePosSignSure() { // 按位置单签确定按钮
      // 按位置单签
      // 先测试进度条
      this.progressVisible = true
      SingleSignApi.singleSignPosition(this.singlePositionParam, this.singlePercentage).then((e) => {
        console.log('进入')
        console.log(e)
        // 关闭模态窗口，关闭进度条
        this.progressVisible = false
        // 清空表单
        this.resetForm('singlePositionParam')
      })
    },
    keywordSingleSignSure() {
      // 按关键字单签确定按钮
      this.progressVisible = true
      SingleSignApi.singleSignKeyword(this.singleKeywordParam, this.singlePercentage).then((e) => {
        console.log(e)
      })
    },
    // 批量验签
    verifySignFiles() {
      const param = {
        'fileIds': ['090271012a59e07ac991489bb8e30a06f56a0ca5', '090271012a59e07ac991489bb8e30a06f56a0ca5', '090271012a59e07ac991489bb8e30a06f56a0ca5']
      }
      SealManageApi.verifySignFiles(param).then(res => {
        console.log(res)
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

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
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

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

</style>
