<template>
    <div class="">
        <c-account-table :blogTab="blogTab" />
     </div>
</template>

<script>
import cAccountTable from '@/components/accountManage/cAccountTable'

export default {
  components: { cAccountTable },
  props: [ 'blogTab' ],
  data () {
    return {
    }
  }
}
</script>

<style scoped lang='less'>

</style>
