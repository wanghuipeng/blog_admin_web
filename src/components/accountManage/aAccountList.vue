<template>
    <div class="">
        <a-account-table :remarkTab="remarkTab" />
     </div>
</template>

<script>
import aAccountTable from '@/components/accountManage/aAccountTable'

export default {
  components: { aAccountTable },
  props: [ 'remarkTab' ],
  data () {
    return {
    }
  }
}
</script>

<style scoped lang='less'>

</style>
