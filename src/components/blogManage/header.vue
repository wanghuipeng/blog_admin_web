<template>
  <div class="blogManage">
    <el-button type="primary" @click="addBlog" size="mini">添加博客</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    addBlog () {
      this.$router.push({path: '/blogManage/addBlog'})
    }
  }
}
</script>

<style scoped lang='less'>
.blogManage{

}
</style>
