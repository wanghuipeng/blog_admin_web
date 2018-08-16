<template>
    <div class="table pt-0 order-table">
      <!-- 功能 -->
      <el-form :inline="true" class="demo-form-inline mt-15" size="mini">
        <el-form-item>
          <p>成本总额：xxxxx万元</p>
        </el-form-item>
        <el-form-item class="right mr-0">
          <el-button type="primary" size="mini" @click="exportExcel">导出excel</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          prop="time"
          label="时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="source"
          label="来源"
          width="180">
        </el-table-column>
        <el-table-column
          prop="media"
          label="媒体">
        </el-table-column>
        <el-table-column
          prop="account"
          label="账号">
        </el-table-column>
        <el-table-column
          prop="city"
          label="城市">
        </el-table-column>
        <el-table-column
          prop="costMoney"
          label="消费成本金额（元）">
        </el-table-column>
        <el-table-column
          prop="firstBar"
          label="一级巴">
        </el-table-column>
        <el-table-column
          prop="distribution"
          label="分配">
        </el-table-column>
        <el-table-column
          prop="costTotalMoney"
          label="消费">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      tableData: [{
        time: '2016-05-02',
        source: '网络营销',
        media: '今日头条',
        account: '今日头条房金云-ts',
        city: '上海',
        costMoney: '1000',
        firstBar: '浦西',
        distribution: '20',
        costTotalMoney: '20000'
      }]
    }
  },
  methods: {
    // 导出excel表格
    exportExcel () {
      require.ensure([], () => {
        const { export_json_to_excel: exportJsonToExcel } = require('../../assets/js/excel/Export2Excel')
        const tHeader = ['时间', '来源', '媒体', '账号', '城市', '消费成本金额（元）', '一级巴', '分配', '消费']
        const filterVal = ['time', 'source', 'media', 'account', 'city', 'costMoney', 'firstBar', 'distribution', 'costTotalMoney']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        exportJsonToExcel(tHeader, data, '报表excel')
      })
    },
    // 格式化excel表格
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped lang='less'>

</style>
