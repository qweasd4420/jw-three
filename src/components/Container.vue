<template>
  <el-container class="fm2-container">
    <el-main class="fm2-main">
      <el-container>
        <el-aside width="250px">
          <div class="components-list">
            <div class="widget-cate">基础字段</div>
            <draggable
              tag="ul"
              :list="basicComponents"
              v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
              @end="handleMoveEnd"
              @start="handleMoveStart"
              :move="handleMove"
            >

              <li class="form-edit-widget-label" v-for="(item, index) in basicComponents" :key="index">
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </a>
              </li>
            </draggable>

            <div class="widget-cate">高级字段</div>
            <draggable
              tag="ul"
              :list="advanceComponents"
              v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
              @end="handleMoveEnd"
              @start="handleMoveStart"
              :move="handleMove"
            >

              <li class="form-edit-widget-label" v-for="(item, index) in advanceComponents" :key="index">
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </a>
              </li>
            </draggable>

            <div class="widget-cate">布局字段</div>
            <draggable
              tag="ul"
              :list="layoutComponents"
              v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
              @end="handleMoveEnd"
              @start="handleMoveStart"
              :move="handleMove"
            >

              <li class="form-edit-widget-label data-grid" v-for="(item, index) in layoutComponents" :key="index">
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </a>
              </li>
            </draggable>
          </div>

        </el-aside>
        <el-container class="center-container" direction="vertical">
          <el-header class="btn-bar" style="height: 45px;">
            <slot name="action">
            </slot>
            <el-button v-if="clearable" type="text" size="medium" icon="el-icon-delete" @click="handleClear">清空</el-button>
            <el-button v-if="preview" type="text" size="medium" icon="el-icon-view" @click="handlePreview">预览</el-button>
            <el-button v-if="generateJson" type="text" size="medium" icon="el-icon-tickets" @click="handleGenerateJson">保存</el-button>
          </el-header>
          <el-main :class="{'widget-empty': widgetForm.list.length == 0}">

            <widget-form v-if="!resetJson"  ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect"></widget-form>
          </el-main>
        </el-container>

        <el-aside class="widget-config-container">
          <el-container>
            <el-header height="45px">
              <div class="config-tab" :class="{active: configTab=='widget'}" @click="handleConfigSelect('widget')">字段属性</div>
              <div class="config-tab" :class="{active: configTab=='form'}" @click="handleConfigSelect('form')">表单属性</div>
            </el-header>
            <el-main class="config-content">
              <widget-config v-show="configTab=='widget'" :data="widgetFormSelect"></widget-config>
              <form-config v-show="configTab=='form'" :data="widgetForm.config"></form-config>
            </el-main>
          </el-container>

        </el-aside>
        <!-- 添加 -->
        <el-dialog
          title="保存"
          :visible.sync="saveVisible"
          width="25%"
        >
          <el-form :model="saveForm" :rules="saveRules" ref="saveForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="页面名称" prop="pageName">
              <el-input type="primary" v-model="saveForm.pageName" auto-complete="off" :clearable="true"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="savePage()">提交</el-button>
              <el-button @click="resetForm('saveForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- 添加 -->
        <cus-dialog
          :visible="previewVisible"
          @on-close="previewVisible = false"
          ref="widgetPreview"
          width="1000px"
          form
        >
          <generate-form insite="true" v-if="previewVisible" :data="widgetForm" :value="widgetModels" :remote="remoteFuncs" ref="generateForm">

            <template v-slot:blank="scope">
              宽度：<el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
              高度：<el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
            </template>
          </generate-form>

          <template slot="action">
            <el-button type="primary" @click="handleTest">获取数据</el-button>
            <el-button @click="handleReset">重置</el-button>
          </template>
        </cus-dialog>

        <cus-dialog
          :visible="uploadVisible"
          @on-close="uploadVisible = false"
          @on-submit="handleUploadJson"
          ref="uploadJson"
          width="800px"
          form
        >
          <el-alert type="info" title="JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可"></el-alert>
          <div id="uploadeditor" style="height: 400px;width: 100%;">{{jsonEg}}</div>
        </cus-dialog>

        <cus-dialog
          :visible="jsonVisible"
          @on-close="jsonVisible = false"
          ref="jsonPreview"
          width="800px"
          form
        >

          <div id="jsoneditor" style="height: 400px;width: 100%;">{{jsonTemplate}}</div>

          <template slot="action">
            <el-button type="primary" class="json-btn" :data-clipboard-text="jsonCopyValue">复制数据</el-button>
          </template>
        </cus-dialog>

        <cus-dialog
          :visible="codeVisible"
          @on-close="codeVisible = false"
          ref="codePreview"
          width="800px"
          form
          :action="false"
        >
          <div id="codeeditor" style="height: 500px; width: 100%;">{{htmlTemplate}}</div>
        </cus-dialog>
      </el-container>
    </el-main>
  </el-container>

</template>

<script>
import Draggable from 'vuedraggable'
import WidgetConfig from './WidgetConfig'
import FormConfig from './FormConfig'
import WidgetForm from './WidgetForm'
import CusDialog from './CusDialog'
import GenerateForm from './GenerateForm'
import { basicComponents, layoutComponents, advanceComponents } from './componentsConfig.js'
import request from '../utils/request.js'
import generateCode from './generateCode.js'
import DragPageApi from '../api/DragPageApi'

export default {

  name: 'fm-making-form',
  components: {
    Draggable,
    WidgetConfig,
    FormConfig,
    WidgetForm,
    CusDialog,
    GenerateForm
  },
  props: {
    preview: {
      type: Boolean,
      default: true
    },
    generateCode: {
      type: Boolean,
      default: true
    },
    generateJson: {
      type: Boolean,
      default: true
    },
    upload: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    // viewId: {
    //   type: String,
    //   default: ''
    // },
    viewId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      basicComponents,
      layoutComponents,
      advanceComponents,
      resetJson: false,
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small'
        }
      },
      configTab: 'widget',
      widgetFormSelect: null,
      previewVisible: false,
      jsonVisible: false,
      codeVisible: false,
      uploadVisible: false,
      saveVisible: false,
      saveForm: {
        pageName: ''
      },
      remoteFuncs: {
        func_test(resolve) {
          setTimeout(() => {
            const options = [
              { id: '1', name: '1111' },
              { id: '2', name: '2222' },
              { id: '3', name: '3333' }
            ]

            resolve(options)
          }, 2000)
        },
        funcGetToken(resolve) {
          request.get('http://tools-server.xiaoyaoji.cn/api/uptoken').then(res => {
            resolve(res.uptoken)
          })
        },
        upload_callback(response, file, fileList) {
          console.log('callback', response, file, fileList)
        }
      },
      widgetModels: {},
      blank: '',
      htmlTemplate: '',
      jsonTemplate: '',
      uploadEditor: null,
      jsonCopyValue: '',
      jsonClipboard: null,
      jsonEg: `{
  "list": [
  ],
  "config": {
  }
}`,
      pageId: '',
      saveRules: {
        pageName: [
          {
            required: true, // 是否必填
            message: '用户名不能为空', // 规则提示
            trigger: 'blur'
          },
          // 可以设置多重验证标准
          {
            max: 20,
            message: '长度最多20个字符'
          },
          {
            pattern: /^[\u4E00-\u9FA5]+$/,
            message: '用户名只能为中文'
          }
        ]
      },
      jsonData: {
        'list': [
        ],
        'config': {
          'labelWidth': 100,
          'labelPosition': 'right',
          'size': 'small'
        }
      }
    }
  },
  mounted() {
    this.initializationPage()
  },
  methods: {
    /**
     * 初始化页面
     */
    initializationPage() {
      this.pageId = this.viewId
      // alert('initializationPage的值为' + this.pageId)
      DragPageApi.initPage({ pageId: this.pageId }).then(res => {
        try {
          if (res.data !== undefined && res.data !== null) {
            this.setJSON(JSON.parse(res.data))
          } else {
            this.setJSON(this.jsonData)
          }
        } catch (e) {
          this.$message.error(e.message)
          this.$refs.uploadJson.end()
        }
      })
    },
    handleGoGithub() {
      window.location.href = 'https://github.com/GavinZhuLei/vue-form-making'
    },
    handleConfigSelect(value) {
      this.configTab = value
    },
    handleMoveEnd(evt) {
      console.log('end', evt)
    },
    handleMoveStart({ oldIndex }) {
      console.log('start', oldIndex, this.basicComponents)
    },
    handleMove() {
      return true
    },
    handlePreview() {
      console.log(this.widgetForm)
      this.previewVisible = true
    },
    handleTest() {
      this.$refs.generateForm.getData().then(data => {
        this.$alert(data, '').catch(e => {})
        this.$refs.widgetPreview.end()
      }).catch(e => {
        this.$refs.widgetPreview.end()
      })
    },
    handleReset() {
      this.$refs.generateForm.reset()
    },
    handleGenerateJson() {
      this.saveVisible = true
      // 保存数据：this.widgetForm
    },
    /* handleGenerateCode() {
      this.codeVisible = true
      this.htmlTemplate = generateCode(JSON.stringify(this.widgetForm))
      this.$nextTick(() => {
        const editor = ace.edit('codeeditor')
        editor.session.setMode('ace/mode/html')
      })
    }, */
    /* handleUpload() {
      this.uploadVisible = true
      this.$nextTick(() => {
        this.uploadEditor = ace.edit('uploadeditor')
        this.uploadEditor.session.setMode('ace/mode/json')
      })
    }, */
    handleUploadJson() {
      try {
        this.setJSON(JSON.parse(this.uploadEditor.getValue()))
        this.uploadVisible = false
      } catch (e) {
        this.$message.error(e.message)
        this.$refs.uploadJson.end()
      }
    },
    handleClear() {
      this.widgetForm = {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small',
          customClass: ''
        }
      }

      this.widgetFormSelect = {}
    },
    getJSON() {
      return this.widgetForm
    },
    getHtml() {
      return generateCode(JSON.stringify(this.widgetForm))
    },
    setJSON(json) {
      this.widgetForm = json

      if (json.list.length > 0) {
        this.widgetFormSelect = json.list[0]
      }
    },
    handleInput(val) {
      console.log(val)
      this.blank = val
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    savePage() {
      const pageParam = {
        pageId: this.pageId,
        pageName: this.saveForm.pageName,
        jsonData: JSON.stringify(this.widgetForm)
      }
      DragPageApi.savePageParam(pageParam).then(res => {
        if (res.status === 0) {
          this.saveVisible = false
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
        }
      })
    }
  },
  watch: {
    widgetForm: {
      deep: true,
      handler: function(val) {
        console.log(this.$refs.widgetForm)
      }
    },
    viewId: {
      handler(pageId) {
        // console.log('viewId的 值为' + pageId)
        this.initializationPage(pageId)
      }
    }
  }
}
</script>

<style lang="scss">
.widget-empty{
  background: url('../assets/form_empty.png') no-repeat;
  background-position: 50%;
}

</style>
