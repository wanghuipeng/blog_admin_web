<template>
    <div class="table pt-0 mt-15 order-table">
      <!-- 表格 -->
      <el-table
        :data="tableData"
        border
        v-loading="loading"
        style="width: 100%;">
        <el-table-column
          label="博客ID"
          prop="blogId">
        </el-table-column>
        <el-table-column
          prop="praiseBlogId"
          label="点赞ID">
        </el-table-column>
        <el-table-column
          prop="praiseBlogTime"
          label="点赞时间">
          <template slot-scope="scope">
            {{scope.row.praiseBlogTime | formatDate}}
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
import { searchPraiseBlog } from '@/assets/js/api.js'
import { formatDate } from '@/assets/js/common.js'

export default {
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  props: [ 'blogTab' ],
  data () {
    return {
      loading: true,
      pageNum: 10,
      page: 1,
      total: 0,
      tableData: []
    }
  },
  created () {
    this.searchPraiseBlog()
  },
  methods: {
    // 列表数据
    searchPraiseBlog () {
      let { pageNum, page } = this
      let params = {
        pageNum,
        page
      }
      searchPraiseBlog(params).then(res => {
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
      this.searchPraiseBlog()
    },
    handleCurrentChange (val) {
      this.page = val
      this.loading = true
      this.searchPraiseBlog()
    }
  },
  watch: {
    blogTab: function (e) {
      if (e === '0') {
        this.searchPraiseBlog()
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
