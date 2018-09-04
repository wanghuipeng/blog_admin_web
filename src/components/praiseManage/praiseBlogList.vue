<template>
    <div class="">
        <praise-blog-table :blogTab="blogTab" />
     </div>
</template>

<script>
import praiseBlogTable from '@/components/praiseManage/praiseBlogTable'

export default {
  components: { praiseBlogTable },
  props: [ 'blogTab' ],
  data () {
    return {
    }
  }
}
</script>

<style scoped lang='less'>

</style>
