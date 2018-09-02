<template>
    <div class="table pt-0 mt-15 order-table">
      <!-- 表格 -->
      <el-table
        :data="tableData"
        border
        v-loading="loading"
        style="width: 100%;">
        <el-table-column
          prop="blogId"
          label="博客ID"
         >
        </el-table-column>
        <el-table-column
          prop="time"
          label="评论时间">
          <template slot-scope="scope">
            {{scope.row.time | formatDate}}
          </template>
        </el-table-column>
        <el-table-column
          prop="markContent"
          label="评论内容">
        </el-table-column>
        <el-table-column
          prop="name"
          label="评论者">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="delRemark(scope.row.remarkId,scope.row.blogId)" size="mini" class="red">删除</el-button>
          </template>
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
import { searchRemark, deleteRemark } from '@/assets/js/api.js'
import { formatDate } from '@/assets/js/common.js'

export default {
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
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
    this.searchRemark()
  },
  methods: {
    delRemark (remarkId, blogId) {
      this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          remarkId,
          blogId
        }
        deleteRemark(params).then(res => {
          if (res.status === 1) {
            this.$notify({title: res.msg, type: 'success', duration: 1000})
            this.searchRemark()
          } else {
            this.$notify({title: res.msg, type: 'error', duration: 1000})
          }
        }).catch(res => {
          this.$notify({title: '服务器异常', type: 'error', duration: 1000})
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    searchRemark () {
      searchRemark().then(res => {
        let data = res.data
        if (res.status === 1) {
          this.loading = false
          this.tableData = data.list
          this.total = data.length
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
    },
    handleCurrentChange (val) {
      this.page = val
      this.loading = true
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
