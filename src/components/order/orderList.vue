<template>
  <div class="main orderManage">
    <el-tabs v-model="editableTabsValue" type="card" >
      <anchor :breadcrumb='breadcrumb' />
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="index"
        :label="item.title"
        :name="item.name"
      >
        <order-header />
        <order-table />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import anchor from '@/components/common/anchor'
import orderHeader from '@/components/order/orderHeader'
import orderTable from '@/components/order/orderTable'

export default {
  components: { anchor, orderHeader, orderTable },
  data () {
    return {
      editableTabsValue: '0',
      editableTabs: [],
      breadcrumb: ['订单管理', '订单列表']// 面包屑导航
    }
  },
  created () {
    // 添加title
    this.addTab('订单列表')
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
