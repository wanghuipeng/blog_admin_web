<template>
  <div class="main statement">
    <el-tabs v-model="editableTabsValue" type="card" >
      <anchor :breadcrumb='breadcrumb' />
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="index"
        :label="item.title"
        :name="item.name"
      >
        <statement-header />
        <statement-table />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import anchor from '@/components/common/anchor'
import statementHeader from '@/components/data/statementHeader'
import statementTable from '@/components/data/statementTable'

export default {
  components: { anchor, statementHeader, statementTable },
  data () {
    return {
      editableTabsValue: '0',
      editableTabs: [],
      breadcrumb: ['数据管理', '报表']// 面包屑导航
    }
  },
  created () {
    // 添加title
    this.addTab('报表')
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
