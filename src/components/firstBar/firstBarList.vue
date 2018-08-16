<template>
  <div class="main firstBarList">
    <el-tabs v-model="editableTabsValue" type="card" >
      <anchor :breadcrumb='breadcrumb' />
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="index"
        :label="item.title"
        :name="item.name"
      >
        <!-- 筛选 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline bd-0" size="mini">
          <el-form-item class="w-140">
            <el-input v-model="formInline.firstBar" placeholder="请输入一级巴名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onFilter">筛选</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table
          :data="tableData"
          border
          style="width: 400px">
          <el-table-column
            prop="firstBar"
            label="一级巴名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="times"
            label="可复购次数">
            <template slot-scope="scope">
              <span class="link" @click="setTimes">{{scope.row.times}}</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 设置复购次数dialog -->
        <el-dialog
          title=""
          :visible.sync="timesDialogVisible"
          width="250px"
          >
          <el-form :model="timeForm" size="small">
            <p class="center">请设置可复购次数</p>
            <el-form-item  class="mt-15 center">
              <el-input v-model="timeForm.times" class="w-125"></el-input>
            </el-form-item>
            <el-form-item class="space-around mt-15">
              <el-button size="small" @click="cancelBtn">取消</el-button>
              <el-button type="primary" size="small" @click="sureBtn">确定</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
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
      breadcrumb: [ '一级巴管理' ], // 面包屑导航
      timesDialogVisible: false,
      editableTabsValue: '0',
      editableTabs: [],
      formInline: {
        firstBar: ''
      },
      timeForm: {
        times: ''
      },
      tableData: [
        {
          firstBar: '浦西巴',
          times: '3'
        }
      ]
    }
  },
  created () {
    // 添加title
    this.addTab('一级巴管理')
  },
  methods: {
    onFilter () {
      console.log('筛选!')
    },
    addTab (targetName) {
      this.editableTabs.push({
        title: targetName,
        name: '',
        content: ''
      })
    },
    // 设置复购次数
    setTimes () {
      this.timesDialogVisible = true
    },
    // 取消
    cancelBtn () {
      this.timesDialogVisible = false
    },
    // 确定
    sureBtn () {
      this.timesDialogVisible = false
    }
  }
}
</script>

<style scoped lang='less'>

</style>
