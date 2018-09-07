<template>
    <div class="main accountManage">
      <el-tabs type="border-card" @tab-click="tabClick">
        <el-tab-pane label="客户端账户">
          <c-account-list :blogTab="tabIndex"/>
        </el-tab-pane>
        <el-tab-pane label="后台账户">
          <a-account-list :remarkTab="tabIndex" />
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import cAccountList from '@/components/accountManage/cAccountList'
import aAccountList from '@/components/accountManage/aAccountList'

export default {
  components: { cAccountList, aAccountList },
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
