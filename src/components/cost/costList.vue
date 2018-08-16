<template>
  <div class="main costList">
    <el-tabs v-model="editableTabsValue" type="card" >
      <anchor :breadcrumb='breadcrumb' />
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="index"
        :label="item.title"
        :name="item.name"
      >
        <cost-header />
        <cost-table />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import anchor from '@/components/common/anchor'
import costHeader from '@/components/cost/costHeader'
import costTable from '@/components/cost/costTable'

export default {
  components: { anchor, costHeader, costTable },
  data () {
    return {
      editableTabsValue: '0',
      editableTabs: [],
      breadcrumb: ['成本管理', '成本明细']// 面包屑导航
    }
  },
  created () {
    // 添加title
    this.addTab('成本明细')
  },
  methods: {
    addTab (targetName) {
      this.editableTabs.push({
        title: targetName,
        name: '',
        content: ''
      })
    }
  }
}
</script>

<style scoped lang='less'>

</style>
