<template>
    <div class="table pt-0 mt-15 order-table">
      <!-- 表格 -->
      <el-table
        :data="tableData"
        border
        v-loading="loading"
        style="width: 100%;">
        <el-table-column
          label="账户"
          prop="account">
        </el-table-column>
        <el-table-column
          prop="avatar"
          label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" class="thumbnail" />
          </template>
        </el-table-column>
        <el-table-column
          prop="joinTime"
          label="注册时间">
          <template slot-scope="scope">
            {{scope.row.joinTime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column
          prop="freeze"
          label="是否冻结">
          <template slot-scope="scope">
            {{scope.row.freeze === 1 ? '已冻结' : '未冻结'}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-dropdown>
              <span class="el-dropdown-link blue pointer">
                管理<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="edit(scope.row.userId)">修改</el-dropdown-item>
                <el-dropdown-item @click.native="freeze(scope.row.userId)" :disabled="scope.row.token === token">冻结</el-dropdown-item>
                <el-dropdown-item @click.native="release(scope.row.userId)" :disabled="scope.row.token === token">释放</el-dropdown-item>
                <el-dropdown-item @click.native="del(scope.row.userId)" :disabled="scope.row.token === token">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
import { searchAccountAdmin, freezeUser, releaseUser, delUser } from '@/assets/js/api.js'
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
      tableData: [],
      token: ''
    }
  },
  created () {
    this.searchAccountAdmin()
    this.token = localStorage.getItem('token')
  },
  methods: {
    edit (userId) {
      this.$router.push({name: 'userManage', query: { userId }})
    },
    freeze (userId) {
      let params = {
        userId
      }
      freezeUser(params).then(res => {
        if (res.status === 1) {
          this.searchAccountAdmin()
          this.$notify({title: res.msg, type: 'success', duration: 1000})
        } else {
          this.$notify({title: res.msg, type: 'error', duration: 1000})
        }
      }).catch(res => {
        this.$notify({title: '服务器异常', type: 'error', duration: 1000})
      })
    },
    release (userId) {
      let params = {
        userId
      }
      releaseUser(params).then(res => {
        if (res.status === 1) {
          this.searchAccountAdmin()
          this.$notify({title: res.msg, type: 'success', duration: 1000})
        } else {
          this.$notify({title: res.msg, type: 'error', duration: 1000})
        }
      }).catch(res => {
        this.$notify({title: '服务器异常', type: 'error', duration: 1000})
      })
    },
    del (userId) {
      this.$confirm('此操作将永久删除该账户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          userId
        }
        delUser(params).then(res => {
          if (res.status === 1) {
            this.$notify({title: res.msg, type: 'success', duration: 1000})
            this.searchAccountAdmin()
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
    // 列表数据
    searchAccountAdmin () {
      let { pageNum, page } = this
      let params = {
        pageNum,
        page
      }
      searchAccountAdmin(params).then(res => {
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

      this.searchAccountAdmin()
    },
    handleCurrentChange (val) {
      this.page = val
      this.loading = true

      this.searchAccountAdmin()
    }
  },
  watch: {
    remarkTab: function (e) {
      if (e === '1') {
        this.searchAccountAdmin()
      } else {
        return false
      }
    }
  }
}
</script>

<style lang='less'>
.blue{
  color: #409EFF;
}
.pointer{
  cursor: pointer;
}
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
