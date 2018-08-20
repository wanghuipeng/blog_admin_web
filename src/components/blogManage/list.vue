<template>
    <div class="main orderManage">
        <blog-header />
        <blog-table />
        <router-view></router-view>
     </div>
</template>

<script>
import blogHeader from '@/components/blogManage/header'
import blogTable from '@/components/blogManage/table'

export default {
  components: { blogHeader, blogTable },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang='less'>

</style>
