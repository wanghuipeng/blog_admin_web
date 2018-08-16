<template>
  <div class="main allotLog">
    <el-tabs v-model="editableTabsValue" type="card" >
      <anchor :breadcrumb='breadcrumb' />
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="index"
        :label="item.title"
        :name="item.name"
      >
        <ul>
          <li v-for="(item,index) in logs" :key="index">{{item.time}}<span>分配客户</span>{{item.name}}<span>{{item.firstBar}}</span></li>
        </ul>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import anchor from '@/components/common/anchor'

export default {
  components: { anchor },
  data () {
    return {
      editableTabsValue: '0',
      editableTabs: [],
      breadcrumb: ['数据管理', '分配日志'], // 面包屑导航
      logs: [
        {
          time: '2018年4月4 18:50',
          name: '1bjsdas',
          fisrtBar: '上海 浦西吧'
        },
        {
          time: '2018年4月4 18:50',
          name: '1bjsdas',
          fisrtBar: '上海 浦西吧'
        }
      ]
    }
  },
  created () {
    // 添加title
    this.addTab('分配日志')
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
.allotLog{
  width:100;
  ul{
    padding-left: 15px;
    li{
      margin-bottom: 5px;
      list-style: initial;
      span{
        margin: 0 5px;
      }
    }
  }
}
</style>
