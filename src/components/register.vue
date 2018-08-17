<template>
  <div class="register">
    <h2 class="system-name">blog</h2>
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="60px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model.number="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" @keyup.native.enter="submitForm('ruleForm')"></el-input>
      </el-form-item>
      <el-form-item label="头像">
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
      <el-form-item>
        <el-button type="primary" @click.enter="submitForm('ruleForm')" class="registerBtn">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { register } from '@/assets/js/api.js'

export default {
  data () {
    return {
      uploadUrl: process.env.API_ROOT + 'upload',
      imageUrl: '',
      ruleForm: {
        username: '',
        password: '',
        avatar: ''
      }
    }
  },
  methods: {
    // 上传成功
    handleAvatarSuccess (res, file) {
      this.ruleForm.avatar = res.data.filePath
      this.imageUrl = this.ruleForm.avatar
    },
    // 上传之前
    beforeAvatarUpload (file) {
    },
    // 注册
    submitForm (formName) {
      let { username: user, password, avatar } = this.ruleForm
      let params = {
        user,
        password,
        avatar
      }
      register(params).then(res => {
        let data = res.data
        if (data.status === 1) {
          this.$notify({title: '注册成功', type: 'success', duration: 1000})
          this.$router.push({name: 'login'})
        } else {
          this.$notify({title: data.msg, type: 'error', duration: 1000})
        }
      }).catch(res => {
        this.$notify({title: '服务器异常', type: 'error', duration: 1000})
      })
    }
  }
}
</script>

<style scoped lang='less'>
.register{
  background-color: #eff2f7;
  height: 100%;
  form{
    width: 350px;
    margin: 0 auto;
    padding-top: 10px;
  }
  .system-name{
    padding-left: 40px;
    text-align: center;
    margin-bottom: 20px;
    margin-top: 0;
    padding-top: 150px;
  }
  .registerBtn{
    width: 100%;
    margin-top: 10px;
  }
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
