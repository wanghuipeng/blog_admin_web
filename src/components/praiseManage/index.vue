<template>
    <div class="main praiseManage">
      <el-tabs type="border-card" @tab-click="tabClick">
        <el-tab-pane label="文章点赞">
          <praise-blog-list :blogTab="tabIndex"/>
        </el-tab-pane>
        <el-tab-pane label="评论点赞">
          <praise-remark-list :remarkTab="tabIndex" />
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import praiseBlogList from '@/components/praiseManage/praiseBlogList'
import praiseRemarkList from '@/components/praiseManage/praiseRemarkList'

export default {
  components: { praiseBlogList, praiseRemarkList },
  data () {
    return {
      tabIndex: '0'
    }
  },
  methods: {
    tabClick (e) {
      this.tabIndex = e.index
      console.log(this.tabIndex)
    }
  }
}
</script>

<style scoped lang='less'>
</style>
