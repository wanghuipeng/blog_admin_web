<template>
    <div class="">
        <praise-remark-table :remarkTab="remarkTab" />
     </div>
</template>

<script>
import praiseRemarkTable from '@/components/praiseManage/praiseRemarkTable'

export default {
  components: { praiseRemarkTable },
  props: [ 'remarkTab' ],
  data () {
    return {
    }
  }
}
</script>

<style scoped lang='less'>

</style>
