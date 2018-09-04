<template>
    <div class="table pt-0 mt-15 order-table">
      <!-- 表格 -->
      <el-table
        :data="tableData"
        border
        v-loading="loading"
        style="width: 100%;">
        <el-table-column
          label="评论ID"
          prop="remarkId">
        </el-table-column>
        <el-table-column
          prop="praiseRemarkId"
          label="点赞ID">
        </el-table-column>
        <el-table-column
          prop="praiseRemarkTime"
          label="点赞时间">
          <template slot-scope="scope">
            {{scope.row.praiseRemarkTime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="点赞者">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageNum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
</template>

<script>
import { searchPraiseRemark } from '@/assets/js/api.js'
import { formatDate } from '@/assets/js/common.js'

export default {
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  props: [ 'remarkTab' ],
  data () {
    return {
      loading: true,
      pageNum: 10,
      page: 1,
      total: 0,
      tableData: []
    }
  },
  methods: {
    // 列表数据
    searchPraiseRemark () {
      let { pageNum, page } = this
      let params = {
        pageNum,
        page
      }
      searchPraiseRemark(params).then(res => {
        let data = res.data
        if (res.status === 1) {
          this.loading = false
          this.tableData = data.list
          this.total = data.count
        } else {
          this.$notify({title: res.msg, type: 'error', duration: 1000})
        }
      }).catch(res => {
        this.$notify({title: '服务器异常', type: 'error', duration: 1000})
      })
    },
    handleSizeChange (val) {
      this.pageNum = val
      this.loading = true
      this.searchPraiseRemark()
    },
    handleCurrentChange (val) {
      this.page = val
      this.loading = true
      this.searchPraiseRemark()
    }
  },
  watch: {
    remarkTab: function (e) {
      if (e === '1') {
        this.searchPraiseRemark()
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped lang='less'>
.order-table{
  .red{
   color: red
  }
  .thumbnail{
    width: auto;
    height: 60px;
    vertical-align: middle;
    padding: 5px 0;
  }
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
