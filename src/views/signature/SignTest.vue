<template>
  <el-container>
    <el-main>
      <el-button type="primary" icon="el-icon-tickets" size="small" @click="sealStart()" >签章</el-button>
      <el-button type="primary" icon="el-icon-tickets" size="small" @click="sealStart1()" >签章</el-button>
      <el-button type="primary" icon="el-icon-tickets" size="small" @click="pSealStart()" >批量签章</el-button>
      <el-button type="primary" icon="el-icon-tickets" size="small" @click="pSealStart1()" >批量签章</el-button>
      <template v-show="dialogSingleShow">
        <el-dialog
          title="新一代交易平台电子签章"
          :visible.sync="dialogVisible"
          width="95%"
          top="5px"
          :before-close="handleClose">
          <iframe ref="child" :src="iframePdf" :width="iframeWidth" :height="iframeHigh" frameborder="0" :style="iframeStyle"></iframe>
        </el-dialog>
      </template>
      <template v-show="dialogShow">
        <el-dialog
          :visible.sync="dialogSignVisible"
          width="95%"
          top="5px"
          :before-close="handleSignClose"
          center
        >
          <iframe ref="signs" :src="iframeSign" :width="iframeWidth" :height="iframeHigh" frameborder="0" :style="iframeStyle"></iframe>
        </el-dialog>
      </template>
       <!--<el-dialog
        :visible.sync="dialogTestVisible"
        width="95%"
        top="5px"
        :before-close="handleTestClose"
        center
      >
        <canvas v-for="page in pages" :id="'the-canvas'+page" :key="page"></canvas>
      </el-dialog>-->
      <!--<ShowPdf :pdf-url="pdfUrl" :pdf-info="pdfInfo"></ShowPdf>-->
      <!--<CPdf :pdfurl="pdfurl"></CPdf>-->
    </el-main>
  </el-container>
</template>
<script>
// import PDFJS from 'pdfjs-dist'
import ShowPdf from '../test/ShowPdf'
import CPdf from '../test/CPdf'
export default {
  components: {
    CPdf,
    ShowPdf
  },
  data() {
    return {
      baseURL: process.env.VUE_APP_BASE_API,
      iframeState: false,
      iframeWidth: '',
      iframeHigh: '',
      iframeStyle: '',
      iframeSign: 'http://localhost:9000/px-sign/signs',
      iframePdf: 'http://localhost:9000/px-sign/pdfView',
      dialogVisible: true,
      dialogSignVisible: true,
      dialogShow: false,
      dialogSingleShow: false,
      dialogTestVisible: false,
      pdfDoc: {
        numPages: 0
      },
      pdfUrl: 'http://localhost:9000/px-sign/file/ceshi.pdf',
      pdfInfo: {
        updateBy: '张三',
        updateOn: '上传时间',
        workNo: '001'
      },
      pdfurl: 'http://localhost:9000/px-sign/file/ceshi.pdf'
    }
  },
  methods: {
    getPlace(p, x, y, i) {
      alert(p)
    },
    sealStart() {
      this.dialogSingleShow = true
      this.dialogVisible = true
      this.iframePdf = this.baseURL + 'px-sign/pdfView'
      let _scrollWidth = document.body.scrollWidth
      const _scrollHeight = document.body.scrollHeight
      if (_scrollWidth < 985) {
        _scrollWidth = 985
      }
      // const iTop = window.screen.height
      // const iLeft = window.screen.width
      // this.iframeStyle = 'position:relative;top: ' + iTop * 0.05 + ';left: ' + iLeft * 0.05
      this.iframeStyle = ''
      this.iframeWidth = _scrollWidth * 0.9
      this.iframeHigh = _scrollHeight * 0.78
      // const obj1 = window.frames[this.$refs.child]
      // console.log(obj1)
    },
    pSealStart() {
      this.dialogShow = true
      this.dialogSignVisible = true
      const doc = ['1', '2', '3']
      this.iframeSign = this.baseURL + 'px-sign/signs?doc=' + doc + '&module=powerTrade'
      let _scrollWidth = document.body.scrollWidth
      const _scrollHeight = document.body.scrollHeight
      const iTop = window.screen.height
      const iLeft = window.screen.width
      this.iframeStyle = 'position:relative;top: ' + iTop * 0.05 + ';left: ' + iLeft * 0.05
      if (_scrollWidth < 985) {
        _scrollWidth = 985
      }
      this.iframeWidth = _scrollWidth * 0.9
      this.iframeHigh = _scrollHeight * 0.8
      this.$refs.signs.contentWindow.postMessage({
        cmd: 'getFormJson',
        params: {
          doc: doc
        }
      }, '*')
      // console.log('值为' + document.body.querySelector('iframe'))
      // const obj1 = window.frames[this.$refs.signs]
      /* this.$nextTick().then(function() {
        this.$refs.signs.contentWindow.postMessage({
          cmd: 'getFormJson',
          params: {
            doc: doc
          }
        }, '*')
      }.bind(this)) */
    },
    pSealStart1() {
      var _scrollWidth = document.body.scrollWidth
      var _scrollHeight = document.body.scrollHeight
      if (_scrollWidth < 985) {
        _scrollWidth = 985
      }
      var iTop = window.screen.height
      var iLeft = window.screen.width
      const doc = ['1', '2', '3']
      window.open(this.baseURL + 'px-sign/signs?doc=' + doc + '&module=powerTrade', '_search', 'height=' + _scrollHeight * 0.9 + ', width=' + _scrollWidth * 0.9 + ', top=' + iTop * 0.05 + ', left=' + iLeft * 0.05)
    },
    handleClose() {
      console.log('关闭dialog时进行的操作')
      this.dialogVisible = false
    },
    handleSignClose() {
      console.log('关闭dialog时进行的操作')
      this.iframeSign = ''
      this.dialogSignVisible = false
    },
    handleTestClose() {
      console.log('关闭')
    },
    handleMessage(event) {
      // 根据上面制定的结构来解析iframe内部发回来的数据
      const data = event.data
      switch (data.cmd) {
        case 'returnFormJson':
          console.log('业务逻辑')
          // 业务逻辑
          break
        case 'returnHeight':
          console.log('业务逻辑1')
          // 业务逻辑
          break
      }
    },
    sealStart1() {
      this.dialogTestVisible = true
    }
  },
  mounted() {
    window.addEventListener('message', this.handleMessage)
    this.dialogSignVisible = false
    this.dialogVisible = false
  }
}
</script>

<style scoped>
</style>
