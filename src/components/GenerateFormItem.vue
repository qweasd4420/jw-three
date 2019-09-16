<template>
  <el-form-item :label="widget.name" :prop="widget.model">
    <template v-if="widget.type == 'input'" >
      <el-input
        v-if="widget.options.dataType == 'number' || widget.options.dataType == 'integer' || widget.options.dataType == 'float'"
        :type="widget.options.dataType"
        v-model.number="dataModel"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
        :disabled="widget.options.disabled"
      ></el-input>
      <el-input
        v-else
        :type="widget.options.dataType"
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
      ></el-input>
    </template>

    <template v-if="widget.type == 'textarea'">
      <el-input
        type="textarea"
        :rows="5"
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
      ></el-input>
    </template>

    <template v-if="widget.type == 'number'">
      <el-input-number
        v-model="dataModel"
        :style="{width: widget.options.width}"
        :step="widget.options.step"
        controls-position="right"
        :disabled="widget.options.disabled"
      ></el-input-number>
    </template>

    <template v-if="widget.type == 'radio'">
      <el-radio-group
        v-model="dataModel"
        :style="{width: widget.options.width}"
        :disabled="widget.options.disabled"
      >
        <el-radio
          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
          :label="item.value"
          v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
          :key="index"
        >
          <template v-if="widget.options.remote">{{item.label}}</template>
          <template v-else>{{widget.options.showLabel ? item.label : item.value}}</template>
        </el-radio>
      </el-radio-group>
    </template>

    <template v-if="widget.type == 'checkbox'">
      <el-checkbox-group
        v-model="dataModel"
        :style="{width: widget.options.width}"
        :disabled="widget.options.disabled"
      >
        <el-checkbox

          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
          :label="item.value"
          v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
          :key="index"
        >
          <template v-if="widget.options.remote">{{item.label}}</template>
          <template v-else>{{widget.options.showLabel ? item.label : item.value}}</template>
        </el-checkbox>
      </el-checkbox-group>
    </template>

    <template v-if="widget.type == 'time'">
      <el-time-picker
        v-model="dataModel"
        :is-range="widget.options.isRange"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="widget.options.readonly"
        :disabled="widget.options.disabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :arrowControl="widget.options.arrowControl"
        :value-format="widget.options.format"
        :style="{width: widget.options.width}"
      >
      </el-time-picker>
    </template>

    <template v-if="widget.type=='date'">
      <el-date-picker
        v-model="dataModel"
        :type="widget.options.type"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="widget.options.readonly"
        :disabled="widget.options.disabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :value-format="widget.options.timestamp ? 'timestamp' : widget.options.format"
        :format="widget.options.format"
        :style="{width: widget.options.width}"
      >
      </el-date-picker>
    </template>

    <template v-if="widget.type =='rate'">
      <el-rate
        v-model="dataModel"
        :max="widget.options.max"
        :disabled="widget.options.disabled"
        :allow-half="widget.options.allowHalf"
      ></el-rate>
    </template>

    <template v-if="widget.type == 'color'">
      <el-color-picker
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :show-alpha="widget.options.showAlpha"
      ></el-color-picker>
    </template>

    <template v-if="widget.type == 'select'">
      <el-select
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :multiple="widget.options.multiple"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
        :filterable="widget.options.filterable"
      >
        <el-option v-for="item in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)" :key="item.value" :value="item.value" :label="widget.options.showLabel || widget.options.remote?item.label:item.value"></el-option>
      </el-select>
    </template>

    <template v-if="widget.type=='switch'">
      <el-switch
        v-model="dataModel"
        :disabled="widget.options.disabled"
      >
      </el-switch>
    </template>

    <template v-if="widget.type=='slider'">
      <el-slider
        v-model="dataModel"
        :min="widget.options.min"
        :max="widget.options.max"
        :disabled="widget.options.disabled"
        :step="widget.options.step"
        :show-input="widget.options.showInput"
        :range="widget.options.range"
        :style="{width: widget.options.width}"
      ></el-slider>
    </template>

    <template v-if="widget.type == 'table'">
      <el-table
              :data="widget.options.defaultValue"
              highlight-current-row
              border
              tooltip-effect="dark"
              height="350px"
              @selection-change="(val)=>changeFun(widget.model,val)"
              align="center"
              style="width: 95%">
        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column
                v-for="(item,index) in widget.options.options"
                :prop="item.value"
                :label="item.label"
                :key="index"
                width="195">
          <template slot-scope='scope'>
            <el-input v-model='scope.row[item.value]' v-if="item.type ==='input'"></el-input>
            <el-date-picker
                    v-if="item.type ==='date'"
                    v-model="scope.row[item.value]"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    style="width: 170px">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="操作" v-if="widget.options.showDelete">
          <template slot-scope="scope">
            <el-button
                    @click.native.prevent="deleteClick(scope.$index,widget.options.defaultValue)"
                    type="text"
                    size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="" v-if="!widget.options.showDelete">
          <template slot-scope="scope">
            <el-button type="text"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="text" @click='addClick(widget)'>添加</el-button>
      <div class="block" style="line-height: 2px; left: 0;right: 0;">
        <el-pagination
                :current-page="widget.options.pagination.currentPage"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="widget.options.pagination.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="widget.options.pagination.total"
                @size-change="(val)=>handleSizeChange(widget.model,val)"
                @current-change="(val)=>handleCurrentChange(widget.model,val)"
        />
      </div>
    </template>

    <template v-if="widget.type == 'button'">
      <el-button
              :type="widget.options.buttonType"

              :size="widget.options.buttonSize"
              :disabled="widget.options.disabled"
              :icon="widget.options.icon"
              v-on:click="queryPageG(widget.options.methodBody)"
      >{{widget.options.defaultValue}}</el-button>
    </template>

    <template v-if="widget.type=='imgupload'">
      <fm-upload
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :style="{'width': widget.options.width}"
        :width="widget.options.size.width"
        :height="widget.options.size.height"
        :token="widget.options.token"
        :domain="widget.options.domain"
        :multiple="widget.options.multiple"
        :length="widget.options.length"
        :is-qiniu="widget.options.isQiniu"
        :is-delete="widget.options.isDelete"
        :min="widget.options.min"
        :is-edit="widget.options.isEdit"
        :action="widget.options.action"
      >
      </fm-upload>
    </template>

    <template v-if="widget.type == 'editor'">
      <fm-editor
        v-model="dataModel"
        :width="widget.options.width"
        :height="widget.options.height"
      >

      </fm-editor>
    </template>

    <template v-if="widget.type == 'cascader'">
      <el-cascader
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
        :options="widget.options.remoteOptions"
      >

      </el-cascader>
    </template>
  </el-form-item>
</template>

<script>
import FmUpload from './Upload'
import FmEditor from './Editor/tinymce'

export default {
  props: ['widget', 'models', 'rules', 'remote'],
  components: {
    FmUpload,
    FmEditor
  },
  data() {
    return {
      dataModel: this.models[this.widget.model]
    }
  },
  created() {
    if (this.widget.options.remote && this.remote[this.widget.options.remoteFunc]) {
      this.remote[this.widget.options.remoteFunc]((data) => {
        this.widget.options.remoteOptions = data.map(item => { // 进入parentTableData
          return {
            value: item[this.widget.options.props.value],
            label: item[this.widget.options.props.label],
            children: item[this.widget.options.props.children]
          }
        })
      })
    }

    if (this.widget.type === 'imgupload' && this.widget.options.isQiniu) {
      this.remote[this.widget.options.tokenFunc]((data) => {
        this.widget.options.token = data
      })
    }
  },
  methods: {
    queryPageG(val) {
      console.log('组件值为' + JSON.stringify(val))
      // 如果是保存按钮，则清除该列表对应的添加事件
      // 防止第二次点击添加还有第一次的数据
      this.$emit('grandChild', val)
    },
    changeFun(tableFlag, val) {
      // alert(tableFlag)
      // alert(JSON.stringify(val))
      const tableParam = {
        tableModel: tableFlag,
        val: val
      }
      this.$emit('tableList', tableParam)
    },
    // 添加事件
    addClick(val) {
      // 往表格关联的数据里push一条数据，之后表格数据就增加一条
      // alert(JSON.stringify(val))
      let pushStr = 'Test'
      for (let i = 0; i < val.options.options.length; i++) {
        if (val.options.options[i] !== undefined && val.options.options[i] != null) {
          if (val.options.options[i].type === 'input') {
            pushStr = val.options.options[i].value
            break
          }
        }
      }
      // 判断是否是第一次点击列表添加
      if (val.options.addNumber === 0) {
        val.options.addNumber = 1
        val.options.defaultValue = []
      }
      val.options.showDelete = true
      const param = {}
      param[pushStr] = ''
      val.options.defaultValue.push(param)
    },
    // 删除事件
    deleteClick(index, rows) {
      rows.splice(index, 1)
    },
    // 日期转换成字符串
    dateChange(item) {
      const year = item.getFullYear()
      let month = item.getMonth() + 1
      let date = item.getDate()
      if (month < 10) month = '0' + month
      if (date < 10) date = '0' + date
      const dateNum = year + '-' + month + '-' + date
      return dateNum
    },
    handleSizeChange(tableModel, val) {
      console.log(`每页 ${val} 条`)
      this.sizeChange(tableModel, val)
      // 调用该列表的查询方法-----预留
    },
    handleCurrentChange(tableModel, val) {
      console.log(`当前页: ${val}`)
      // 调用该列表的查询方法，把当前页传递给父页面
      // this.queryParam.pageInfo.pageNum = val
      // this.queryPage(this.queryParam)
      // 第一个参数是表格标识，第二个是当前页
      this.currentChange(tableModel, val)
    },
    sizeChange(tableModel, val) {
      const Param = {
        tableModel: tableModel,
        pageSize: val
      }
      this.$emit('sizeChangeQuery', Param)
    },
    currentChange(tableModel, val) {
      const Param = {
        tableModel: tableModel,
        currentPage: val
      }
      this.$emit('currentChangeQuery', Param)
    }
  },
  watch: {
    dataModel: {
      deep: true,
      handler(val) {
        this.models[this.widget.model] = val
        this.$emit('update:models', {
          ...this.models,
          [this.widget.model]: val
        })
      }
    },
    models: {
      deep: true,
      handler(val) {
        this.dataModel = val[this.widget.model]
      }
    }
  }
}
</script>
