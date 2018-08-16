<template>
    <div class="table pt-0 order-table">
      <!-- 功能 -->
      <el-form :inline="true" class="demo-form-inline mt-15 clearfix bd-0" size="mini">
        <el-form-item class="right  mr-0">
          <el-button type="primary" size="mini" @click="exportExcel">导出excel</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          prop="id"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="media"
          label="媒体名称"
          width="180">
          <template slot-scope="scope">
            {{scope.row.media}}<el-tag type="danger">复购</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="city"
          label="城市">
        </el-table-column>
        <el-table-column
          prop="firstBar"
          label="一级巴">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="订购数量">
        </el-table-column>
        <el-table-column
          prop="checkMethod"
          label="核算方法">
        </el-table-column>
        <el-table-column
          prop="costPercence"
          label="订购单价/佣金比例/放款比例">
        </el-table-column>
        <el-table-column
          prop="orderTotalPrice"
          label="订购总价">
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="订购时间">
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
        id: '01',
        media: '今日头条',
        city: '上海',
        firstBar: '浦东巴',
        orderNum: '400',
        checkMethod: '按单价',
        costPercence: '200',
        orderTotalPrice: '80000',
        orderTime: '2017-10-27 13:50:45'
      }]
    }
  },
  methods: {
    // 导出excel表格
    exportExcel () {
      require.ensure([], () => {
        const { export_json_to_excel: exportJsonToExcel } = require('../../assets/js/excel/Export2Excel')
        const tHeader = ['ID', '媒体名称', '城市', '一级巴', '订购数量', '核算方法', '订购单价/佣金比例/放款比例', '订购总价', '订购时间']
        const filterVal = ['id', 'media', 'city', 'firstBar', 'orderNum', 'checkMethod', 'costPercence', 'orderTotalPrice', 'orderTime']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        exportJsonToExcel(tHeader, data, '订单列表excel')
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
.order-table{
  .el-table_1_column_2 {
    position: relative;
  }
  .el-tag--danger{
      height: initial;
      line-height: inherit;
      position: absolute;
      right: 0;
      top: 0;
      border: none;
      border-radius: 0;
      border-bottom-left-radius: 4px;
   }
}
</style>
