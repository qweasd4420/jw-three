<template>
  <div>
    <!--右侧内容-->
    <!--<router-view/>-->
    <component :is="tabView" :node-info="nodeInfo"></component>
  </div>
</template>
<script>
import page from './PageForm'
import folder from './FolderForm'
export default {
  name: 'TreeMain',
  props: ['viewName', 'viewInfo'],
  data() {
    return {
      data: [],
      tabView: '',
      nodeInfo: ''
    }
  },
  mounted() {
    this.tabView = this.viewName
    this.nodeInfo = this.viewInfo
    console.log(this.nodeInfo)
  },
  watch: {
    'viewName': function(newVal) {
      this.tabView = this.viewName
    },
    'viewInfo': function(newVal) {
      this.nodeInfo = this.viewInfo
      console.log(this.nodeInfo)
    }
  },
  components: {
    page,
    folder
  }
}
</script>

<style scoped>
</style>
