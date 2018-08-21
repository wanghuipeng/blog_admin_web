<template>
<div class="main w-auto addBlog">
    <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-form-item label="分类" prop="type">
            <el-select  v-model="form.type" placeholder="请选择博客类型">
                <el-option v-for="(item,index) in types" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" class="w-193"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
            <el-input type="textarea" v-model="form.content" :rows="8" class="w-500"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="saveBlog" size="mini">保存</el-button>
            <el-button @click="cancelBlog" size="mini">取消</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
import { addArticle } from '@/assets/js/api.js'

export default {
  data () {
    return {
      author: '',
      avatar: '',
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
      ],
      form: {
        type: '',
        title: '',
        desc: ''
      }
    }
  },
  created () {
    let user = sessionStorage.getItem('user')
    let avatar = sessionStorage.getItem('avatar')
    this.author = user
    this.avatar = avatar
  },
  methods: {
    saveBlog () {
      let { author, avatar } = this
      let { type, title, content } = this.form
      let params = {
        type,
        title,
        author,
        avatar,
        content
      }
      addArticle(params).then(res => {
        if (res.status === 1) {
          this.$notify({title: '添加成功', type: 'success', duration: 1000})
          this.$router.push({name: 'blogManage'})
        } else {
          this.$notify({title: res.msg, type: 'error', duration: 1000})
        }
      }).catch(res => {
        this.$notify({title: '服务器异常', type: 'error', duration: 1000})
      })
    },
    cancelBlog () {
      window.history.go(-1)
    }
  }
}
</script>
