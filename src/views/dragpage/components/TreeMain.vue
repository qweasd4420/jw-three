<template>
  <div>
    <!--右侧内容-->
    <!--<router-view/>-->
    <component :is="tabView" :view-id="pageId"></component>
  </div>
</template>
<script>
import tab from './Table'
import fo from '../../../components/Container'
export default {
  name: 'TreeMain',
  props: ['viewName', 'viewId'],
  data() {
    return {
      data: [],
      tabView: '',
      pageId: ''
    }
  },
  mounted() {
    this.tabView = this.viewName
    this.pageId = this.viewId
  },
  watch: {
    'viewName': function(newVal) {
      this.tabView = this.viewName
    },
    'viewId': function(newVal) {
      this.pageId = this.viewId
      // alert('pageId:' + this.pageId)
      // alert(this.pageId)
    }
  },
  components: {
    tab,
    fo
  }
}
</script>

<style scoped>
</style>
