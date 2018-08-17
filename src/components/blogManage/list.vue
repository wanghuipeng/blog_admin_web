<template>
    <div class="main orderManage">
        <blog-header />
        <blog-table />
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
  },
  created () {
    // 添加title
    this.addTab('订单列表')
  },
  methods: {

  }
}
</script>

<style scoped lang='less'>

</style>
