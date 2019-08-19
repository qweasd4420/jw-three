<template>
  <el-container style="height: 100%;">
    <el-aside width="300px" >
      <div>
        <el-form :inline="true">
          <el-button size="mini" type="primary" @click="addGroup" >添加</el-button>
          <el-button size="mini" type="primary" @click="updateGroup" >修改</el-button>
          <el-button size="mini" type="primary" @click="deleteGroup" >删除</el-button>
        </el-form>
      </div>
      <br>
      <div style="width: 100%;height: 100%">
        <el-tree
          :data="data"
          :props="defaultProps"
          ref="tree"
          accordion
          show-checkbox
          :check-strictly="true"
          @node-click="handleNodeClick">
        </el-tree>
      </div>
    </el-aside>
    <el-main>
      <div>
        <el-form :inline="true">
          <el-button size="mini" type="primary" @click="addGroup" >新增</el-button>
          <el-button size="mini" type="primary" @click="updateGroup" >从市场成员抽取</el-button>
          <el-button size="mini" type="primary" @click="deleteGroup" >修改</el-button>
          <el-button size="mini" type="primary" @click="deleteGroup" >删除</el-button>
          <el-button size="mini" type="primary" @click="deleteGroup" >从通讯录抽取</el-button>
        </el-form>
      </div>
      <div>
        <br>
        <el-table :data="searchResList" highlight-current-row size="small" height="calc(100vh - 198px)" border style="width: 100%; line-height: 20px">
          <el-table-column type="selection" width="40" />
          <el-table-column prop="numberNo" label="序号" width="123" />
          <el-table-column prop="name" label="姓名" min-width="123" />
          <el-table-column v-model="groupDepart" label="分组" min-width="123" >
            <template>
              <p>{{this.groupDepart}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="sex" :formatter="formatRole" label="性别" min-width="123" />
          <el-table-column prop="phone" label="手机号" min-width="123" />
          <el-table-column prop="depart" label="部门" min-width="123" />
        </el-table>
        <div class="block" style="line-height: 2px">
          <el-pagination
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="queryParam.pageInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="queryParam.pageInfo.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </el-main>
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form :model="addGroupSearch" class="demo-form-inline" label-width="80px" label-position="left">
        <el-form-item label="父级名称">
          <el-select
            :value="valueTitle"
            :clearable="clearable"
            :filterable="true"
            :remote="true"
            @clear="clearHandle">
            <el-option :value="valueTitle" :label="valueTitle">
              <el-tree
                id="tree-option"
                ref="tree2"
                :accordion="accordion"
                :data="options"
                :props="props"
                :node-key="props.value"
                :default-expanded-keys="defaultExpandedKey"
                @node-click="handleNodeClick1">
              </el-tree>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分组名称">
          <el-input v-model="groupName" placeholder="" style="width: 180px"/>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="makesureAdd" >确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: `grouptxl`,
  props: {
    /* 配置项 */
    props: {
      type: Object,
      default: () => {
        return {
          label: 'label', // 显示名称
          children: 'children' // 子级字段名
        }
      }
    },
    /* 选项列表数据(树形结构的对象数组) */
    // options: {
    //   type: Array,
    //   default: () => {
    //     return [
    //       {
    //         label: 'label-A',
    //         children: [
    //           {
    //             label: 'label-A-1',
    //             children: []
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // },
    /* 初始值 */
    value: {
      type: Number,
      default: () => {
        return null
      }
    },
    /* 可清空选项 */
    clearable: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    /* 自动收起 */
    accordion: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      options: [],
      valueId: this.value, // 初始值
      valueTitle: '',
      defaultExpandedKey: [],
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      dialogVisible: false,
      parentNameSearch: '',
      addGroupNext: [],
      queryParam: {
        data: {
          sealName: null,
          state: null,
          type: null,
          startTime: '',
          endTime: '',
          marketId: null
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
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
      addGroupSearch: {
        parentName: '',
        groupName: ''
      },
      groupName: '',
      currentPage4: 1,
      searchResList: [],
      searchList: [{
        numberNo: 1,
        name: '张三',
        group: '北京交易中心',
        sex: '01',
        phone: '13176567898',
        depart: '市场处'
      }, {
        numberNo: 2,
        name: '李四',
        group: '北京交易中心',
        sex: '01',
        phone: '15327655676',
        depart: '交易处'
      }, {
        numberNo: 3,
        name: '王五',
        group: '北京交易中心',
        sex: '02',
        phone: '16876566776',
        depart: '技术处'
      }],
      groupDepart: '',
      labelAdd: ''
    }
  },
  mounted() {
    this.initHandle()
    this.data = [{
      id: 1,
      label: '通讯录',
      children: [{
        id: 2,
        label: '北京交易中心',
        children: [{
          id: 4,
          label: '北京公司',
          children: [{
            label: '技术处'
          }]
        }]
      }, {
        id: 3,
        label: '国网电力交易中心',
        children: [{
          id: 5,
          label: '国网总部',
          children: [{
            id: 7,
            label: '市场处'
          }, {
            id: 8,
            label: '交易处'
          }, {
            id: 9,
            label: '技术处'
          }]
        }, {
          id: 6,
          label: '山西公司',
          children: [{
            label: '交易处'
          }]
        }]
      }]
    }]
  },
  methods: {
    handleNodeClick(data) {
      JSON.stringify(data)
      this.searchResList = this.searchList
      // alert(data.label)
      this.groupDepart = data.label
    },
    getCheckedNodes() {
      alert(JSON.stringify())
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.queryParam.pageInfo.pageSize = val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.queryParam.pageInfo.pageNum = val
    },
    addGroup() {
      // alert(JSON.stringify(this.$refs.tree.getCheckedNodes()))
      const data = this.$refs.tree.getCheckedNodes()
      this.options = data
      this.dialogVisible = true
      // const newChild = { label: 'testtest', children: [] }
      // if (!data.children) {
      //   this.$set(data, 'children', [])
      // }
      // data.children.push(newChild)
      // alert(JSON.stringify(data))
    },
    makesureAdd() {
      alert(this.addGroupNext)
      const data = this.addGroupNext
      const newChild = { label: this.labelAdd, children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      alert(JSON.stringify(data))
      data.children.push(newChild)
      // alert(JSON.stringify(data))
      this.dialogVisible = false
      this.valueTitle = ''
      this.groupName = ''
    },
    updateGroup() {
    },
    deleteGroup() {
      const node = this.$refs.tree.getCheckedNodes()
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === node.id)
      children.splice(index, 1)
    },
    formatRole(row, column) {
      return row.sex === '01' ? '男' : row.sex === '02' ? '女' : ''
    },
    // 初始化值
    initHandle() {
      console.log('初始化值')
      this.$nextTick(() => {
        const scrollWrap = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')[0]
        const scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar')
        scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
        scrollBar.forEach(ele => (ele.style.width = 0))
      })
    },
    // 切换选项
    handleNodeClick1(node) {
      console.log('切换选项')
      this.valueTitle = node[this.props.label]
      // this.valueId = node[this.props.value]
      // this.$emit('getValue', this.valueId)
      this.defaultExpandedKey = []
      this.addGroupNext = node
    },
    // 清除选中
    clearHandle() {
      console.log('清除选中')
      this.valueTitle = ''
      this.valueId = null
      this.defaultExpandedKey = []
      this.clearSelected()
      this.$emit('getValue', null)
    },
    /* 清空选中样式 */
    clearSelected() {
      console.log('清空选择样式')
      const allNode = document.querySelectorAll('#tree-option .el-tree-node')
      allNode.forEach((element) => element.classList.remove('is-current'))
    },
    handleClose(done) {
      done()
      this.valueTitle = ''
    }
  },
  watch: {
    value() {
      // this.valueId = this.value
      this.initHandle()
    },
    filterText(val) {
      this.$refs.tree2.filter(val)
    },
    groupName() {
      this.labelAdd = this.groupName
    }
  }
}
</script>

<style scoped>
  .el-scrollbar .el-scrollbar__view .el-select-dropdown__item{
    height: auto;
    max-height: 274px;
    padding: 0;
    overflow: hidden;
    overflow-y: auto;
  }
  .el-select-dropdown__item.selected{
    font-weight: normal;
  }
  ul li >>>.el-tree .el-tree-node__content{
    height:auto;
    padding: 0 20px;
  }
  .el-tree-node__label{
    font-weight: normal;
  }
  .el-tree >>>.is-current .el-tree-node__label{
    color: #409EFF;
    font-weight: 700;
  }
  .el-tree >>>.is-current .el-tree-node__children .el-tree-node__label{
    color:#606266;
    font-weight: normal;
  }
</style>
