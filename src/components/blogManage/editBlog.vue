<template>
<div class="main w-auto editBlog">
    <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-form-item label="分类" prop="type">
            <el-select  v-model="form.type" placeholder="请选择博客类型">
                <el-option v-for="(item,index) in types" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" class="w-193"></el-input>
        </el-form-item>
        <el-form-item label="缩略图">
            <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            name="avatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
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
import { detailArticle, editArticle } from '@/assets/js/api.js'

export default {
  data () {
    return {
      uploadUrl: process.env.API_ROOT + 'upload',
      imageUrl: '',
      author: '',
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
    let user = localStorage.getItem('user')
    this.author = user
    this.detailArticle()
  },
  methods: {
    // 上传成功
    handleAvatarSuccess (res, file) {
      this.imageUrl = res.data.filePath
    },
    // 上传之前
    beforeAvatarUpload (file) {
    },
    detailArticle () {
      let params = {
        id: this.$route.query.blogId
      }
      detailArticle(params).then(res => {
        let data = res.data
        if (res.status === 1) {
          this.form.type = data.type
          this.form.title = data.title
          this.form.content = data.content
          this.imageUrl = data.thumbnail
        } else {
          this.$notify({title: res.msg, type: 'error', duration: 1000})
        }
      }).catch(res => {
        this.$notify({title: '服务器异常', type: 'error', duration: 1000})
      })
    },
    saveBlog () {
      let { author, imageUrl: thumbnail } = this
      let { type, title, content } = this.form
      let params = {
        type,
        title,
        author,
        content,
        thumbnail,
        id: this.$route.query.blogId
      }
      editArticle(params).then(res => {
        if (res.status === 1) {
          this.$notify({title: '编辑成功', type: 'success', duration: 1000})
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
<style scoped lang="less">
.editBlog{
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 120px;
      height: 120px;
      line-height: 120px;
      text-align: center;
      border: 1px solid #dcdfe6;
    }
    .avatar {
      width: 120px;
      height: 120px;
      display: block;
    }
}
</style>
