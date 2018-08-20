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
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间">
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editBlog(scope.row.id)" size="mini">编辑</el-button>
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
import { searchAll } from '@/assets/js/api.js'

export default {
  data () {
    return {
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
