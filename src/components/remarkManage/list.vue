<template>
    <div class="main orderManage">
        <blog-header />
        <blog-table />
     </div>
</template>

<script>
import blogHeader from '@/components/remarkManage/header'
import blogTable from '@/components/remarkManage/table'

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
