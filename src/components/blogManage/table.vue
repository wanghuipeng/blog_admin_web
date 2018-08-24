<template>
    <div class="table pt-0 mt-15 order-table">
      <!-- 表格 -->
      <el-table
        :data="tableData"
        border
        v-loading="loading"
        style="width: 100%;">
        <el-table-column
          type="index"
          label="ID"
          width="50">
        </el-table-column>
        <el-table-column
          prop="type"
          label="博客类型"
          width="180">
          <template slot-scope="scope">
            <span v-for="(item,index) in types" :key="index" v-if="scope.row.type === item.value">{{item.label}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="博客标题">
        </el-table-column>
        <el-table-column
          prop="thumbnail"
          label="缩略图">
          <template slot-scope="scope">
            <img class="thumbnail" :src="scope.row.thumbnail" @click="preview(scope.row.thumbnail)" />
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间">
        </el-table-column>
        <el-table-column
          prop="pv"
          label="PV">
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editBlog(scope.row.id)" size="mini">编辑</el-button>
            <el-button type="text" @click="delBlog(scope.row.id)" size="mini" class="red">删除</el-button>
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
      <!-- 图片预览 -->
      <el-dialog
        :visible.sync="dialogVisible"
        width="50%">
        <img width="100%" :src="previewUrl">
      </el-dialog>
    </div>
</template>

<script>
import { searchAll, deleteArticle } from '@/assets/js/api.js'

export default {
  data () {
    return {
      previewUrl: '',
      dialogVisible: false,
      loading: true,
      pageNum: 10,
      page: 1,
      total: 0,
      tableData: [],
      types: [
        {
          label: '技术',
          value: 'type_1'
        },
        {
          label: '生活',
          value: 'type_2'
        },
        {
          label: '感想',
          value: 'type_3'
        },
        {
          label: '备忘',
          value: 'type_4'
        }
      ]
    }
  },
  created () {
    this.searchAll()
  },
  methods: {
    // 图片预览
    preview (url) {
      this.previewUrl = url
      this.dialogVisible = true
    },
    // 列表数据
    searchAll () {
      let { pageNum, page } = this
      let params = {
        pageNum,
        page
      }
      searchAll(params).then(res => {
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
    editBlog (id) {
      this.$router.push({path: '/blogManage/editBlog', query: {blogId: id}})
    },
    delBlog (id) {
      this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          id
        }
        deleteArticle(params).then(res => {
          if (res.status === 1) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.searchAll()
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
    handleSizeChange (val) {
      this.pageNum = val
      this.loading = true
      this.searchAll()
    },
    handleCurrentChange (val) {
      this.page = val
      this.loading = true
      this.searchAll()
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
