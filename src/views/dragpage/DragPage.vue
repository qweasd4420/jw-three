<template>
  <el-container>
    <button @click="collapseStatus">
      <i class="el-icon-d-arrow-right"></i>
    </button>
    <el-aside
        v-if="isCollapse"
        style="background-color: rgb(238, 241, 246);padding:2px 6px">
      <!--左侧内容-->
      <el-input
        style="padding: 18px 0 18px 0;background: #ffffff"
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
      <el-tree
        style="height:calc(100vh - 185px);"
        :data="data"
        ref="tree"
        node-key="id"
        default-expand-all
        :highlight-current="true"
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
        @filter-node-method="filterNode"
        @node-contextmenu="rightClick"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }" v-on:mouseleave=mouseleave(data,$event)>
          <span v-on:mouseover=mouseover(data,$event)>
            <template v-if="data.children == undefined || data.children.length == 0" >
              <i class="el-icon-document"></i>&nbsp;{{ node.label }}
            </template>
            <template v-if="data.children != undefined && data.children.length != 0" >
              <i class="iconfont icon-icon_workfile_line"></i>&nbsp;{{ node.label }}
            </template>
          </span>
<!--
          <span v-on:mouseover=mouseover(data,$event)>
            <template v-if="data.children == undefined || data.children.length == 0" >
              <i class="el-icon-document"></i>&nbsp;{{ node.label }}
            </template>
            <template v-if="data.children != undefined && data.children.length != 0" >
              <i class="iconfont icon-icon_workfile_line"></i>&nbsp;{{ node.label }}
            </template>
            &lt;!&ndash; 定义菜单及菜单项的操作 &ndash;&gt;
            <span class="node none">
              <i class="el-icon-success">
              </i>
            </span>
          </span>
-->
        </span>
      </el-tree>
    </el-aside>
    <!-- 右键菜单 -->
    <el-container>
      <!--右侧内容-->
      <!--<router-view/>-->
      <TreeMain style="width: 100%;" :view-name="viewName" :view-id="viewId"></TreeMain>
    </el-container>
  </el-container>
</template>
<script>
import TreeMain from './components/TreeMain'
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
          icon: 'el-icon-document',
          children: [
            {
              id: '2',
              label: '部门1',
              icon: 'el-icon-document',
              children: [
                {
                  id: '466d888fc2564ee2a9d3031703f85154',
                  label: '页面1'
                },
                {
                  id: '31',
                  label: '页面2'
                },
                {
                  id: '32',
                  label: '页面3'
                }
              ]
            },
            {
              id: '21',
              label: '部门2',
              children: [
                {
                  id: '211',
                  label: '页面1',
                  children: []
                }
              ]
            }
          ]
        }
      ],
      viewName: 'tab',
      viewId: '',
      filterText: '',
      collapseBtnClick: false,
      isCollapse: true,
      menuVisible: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    handleNodeClick(data, node) {
      console.log(JSON.stringify(data))
      this.viewId = data.id
      // alert(this.viewId)
      if (!data.children || data.children.length === 0) {
        // this.viewName = 'tab'
        this.viewName = 'fo'
      } else {
        this.viewName = 'fo'
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    collapseStatus() {
      this.isCollapse = !this.isCollapse
    },
    /* rightClick(event, object, value, element) {
      this.menuVisible = true
      const menu = document.querySelector('#menu')
      /!* 菜单定位基于鼠标点击位置 *!/
      menu.style.left = event.clientX + 20 + 'px'
      menu.style.top = event.clientY - 10 + 'px'
      menu.style.position = 'absolute'
      console.log('右键被点击的event:', event)
      console.log('右键被点击的object:', object)
      console.log('右键被点击的value:', value)
      console.log('右键被点击的element:', element)
    }, */
    rightClick(event, object, value, element) {
      this.menuVisible = true
      const menu = document.querySelector('#menu')
      menu.style.position = 'absolute'
      var e = event || window.event
      const x = e.clientX
      menu.style.left = x + 'px'
      console.log('右键被点击的event:', event)
      console.log('右键被点击的object:', object)
      console.log('右键被点击的value:', value)
      console.log('右键被点击的element:', element)
    },
    handleRightSelect(key) {
      console.log(key)
      if (key === 1) {
        this.NodeAdd(this.NODE, this.DATA)
        this.menuVisible = false
      } else if (key === 2) {
        this.NodeEdit(this.NODE, this.DATA)
        this.menuVisible = false
      } else if (key === 3) {
        this.NodeDel(this.NODE, this.DATA)
        this.menuVisible = false
      } else if (key === 4) {
        console.log('4')
        this.menuVisible = false
      }
    },
    mouseleave(data, e) {
      // e.currentTarget.firstElementChild.nextElementSibling.setAttribute('class', 'node none')
      console.log('事件为：', e.currentTarget.firstElementChild.children)
    },
    mouseover(data, e) {
      // e.currentTarget.nextElementSibling.setAttribute('class', 'node block')
      e.currentTarget.children[1].setAttribute('class', 'node block el-icon-success')
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
</style>
