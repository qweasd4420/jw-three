<template>
  <el-container>
    <el-header>
      <div>
        <el-button type="primary" size="small" @click="searchPdf">搜索</el-button>
        <el-button type="primary" size="small" @click="patchSignPosition">按位置批签</el-button>
        <el-button type="primary" size="small" @click="patchSignKeyWord">按关键字批签</el-button>
      </div>
    </el-header>
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
    <el-dialog
      title="按位置批签"
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
    <el-dialog
      title="新一代交易平台电子签章"
      :visible.sync="dialogSingleShow"
      width="95%"
      top="5px"
      :before-close="handleClose"
    >
      <iframe ref="child" :src="iframePdf" :width="iframeWidth" :height="iframeHigh" frameborder="0" />
    </el-dialog>
  </el-container>
</template>

<script>

import SealManageApi from '../../api/SealManageApi'
import SignApi from '../../api/SignApi'

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
      dialogSingleShow: false,
      dialogKeywordVisible: false,
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
          fileIds: ['1', '2', '3']
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
      selectList: [],
      patchPositionParam: {
        selectFiles: new Map(),
        patchPosition: {},
        signType: '',
        pin: ''
      },
      patchKeywordParam: {
        selectFiles: new Map(),
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
      // 打开iframe页面
      this.dialogSingleShow = true
      this.iframePdf = this.baseURL + 'px-common-signature/pdfView?' + 'id=' + id
      let _scrollWidth = document.body.scrollWidth
      const _scrollHeight = document.body.scrollHeight
      if (_scrollWidth < 985) {
        _scrollWidth = 985
      }
      this.iframeWidth = _scrollWidth * 0.9
      this.iframeHigh = _scrollHeight * 0.78
    },
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
    patchSignPosition() {
      // 按位置批签
      // 获取列表第一个id
      let id = ''
      if (this.selectList != null && this.selectList.length !== 0) {
        id = this.selectList[0].fileId
      }
      // 打开iframe页面
      this.dialogSingleShow = true
      this.iframePdf = this.baseURL + 'px-common-signature/pdfView?' + 'id=' + id + '&type=pSign'
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
        case 'returnSingleSign':
          console.log('单签结果')
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
      }
    },
    positionSignSure() { // 位置批签签章确认
      // 先清空
      this.patchPositionParam.selectFiles = new Map()
      console.log('签章位置' + this.patchPositionParam.patchPosition)
      // 业务流程---------------这个地方有 bug，之后解决
      for (let i = 0; i < this.selectList.length; i++) {
        this.patchPositionParam.selectFiles.set(this.selectList[i].fileId, this.selectList[i].fileName)
      }
      console.log('待签章的文件为:' + JSON.stringify(this.patchPositionParam.selectFiles))
      // 开始签章
      SignApi.patchPositionOrKeyword(this.patchPositionParam).then((e) => {
        console.log(e)
        console.log(e.get('success'))
        console.log(e.get('error'))
        // 关闭模态窗口，关闭进度条
        this.dialogPositionVisible = false
        // 清空表单
        this.resetForm('patchPositionParam')
      })
    },
    keywordSignSure() { // 按关键字批签确认
      // 先清空
      this.patchKeywordParam.selectFiles = new Map()
      for (let i = 0; i < this.selectList.length; i++) {
        this.patchKeywordParam.selectFiles.set(this.selectList[i].fileId, this.selectList[i].fileName)
      }
      console.log(this.patchKeywordParam.selectFiles)
      // console.log(SignApi.patchPositionOrKeyword(this.patchKeywordParam))
      // 开始签章
      SignApi.patchPositionOrKeyword(this.patchKeywordParam).then((e) => {
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
