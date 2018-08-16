<template>
    <div class="table pt-0 order-table">
      <!-- 功能 -->
      <el-form :inline="true" class="demo-form-inline mt-15" size="mini">
        <el-form-item>
          <p>成本总额：xxxxx万元</p>
        </el-form-item>
        <el-form-item class="right mr-0">
          <el-button type="primary" size="mini" @click="excelBtn">导出导入</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        v-loading="isLoading"
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
      <!-- 导出导入dialog -->
      <el-dialog
        title=""
        :visible.sync="exportDialogVisible"
        width="400px"
        >
        <el-form label-width="120px">
          <el-form-item label="选择导入日期：">
            <el-date-picker v-model="exportDate" type="date" placeholder="选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="exportBtn" size="small">导出模板</el-button>
            <el-button type="success" @click="importBtn" size="small">导入模板</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
import { costDetailTable } from '@/assets/js/api.js'
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState([
      'isLoading'
    ])
  },
  data () {
    return {
      currentPage: 1,
      pageSize: 12,
      total: 0,
      tableData: [],
      exportDate: '',
      exportDialogVisible: false
    }
  },
  created () {
    this.setLoadingTrue()
    this.fetchDetailList()
  },
  methods: {
    ...mapMutations([
      'setLoadingFalse',
      'setLoadingTrue'
    ]),
    excelBtn () {
      this.exportDialogVisible = true
    },
    exportBtn () {},
    importBtn () {},
    // 获取列表数据
    fetchDetailList () {
      let params = {
        page: this.currentPage,
        size: this.pageSize
      }
      costDetailTable(params).then(res => {
        this.setLoadingFalse()
        this.tableData = res.rows
        this.total = res.total
      })
    },
    // 分页控制
    handleSizeChange (val) {
      this.pageSize = val
      this.setLoadingTrue()
      this.fetchDetailList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.setLoadingTrue()
      this.fetchDetailList()
    }
  }
}
</script>

<style scoped lang='less'>

</style>
