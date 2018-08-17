<template>
<div class="userManage">
    <el-form ref="ruleForm" :model="ruleForm" label-width="80px" size="mini" class="mt-20">
        <el-form-item label="用户名"  prop="user">
            <el-input v-model="ruleForm.user" disabled></el-input>
        </el-form-item>
        <el-form-item label="旧密码"  prop="oldPassword">
            <el-input type="password" v-model="ruleForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码"  prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
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
            <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
import { updatePassword } from '@/assets/js/api.js'

export default {
  data () {
    return {
      uploadUrl: process.env.API_ROOT + 'upload',
      imageUrl: '',
      ruleForm: {
        user: '',
        oldPassword: '',
        password: '',
        avatar: ''
      }
    }
  },
  mounted () {
    this.ruleForm.user = sessionStorage.getItem('userName')
    console.log(this.ruleForm.user)
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
    // 修改
    onSubmit () {
      let { oldPassword: passwordOld, password, user, avatar } = this.ruleForm
      let params = {
        user,
        passwordOld,
        password,
        avatar
      }
      console.log(this.ruleForm.password)
      updatePassword(params).then(res => {
        let data = res.data
        if (data.status === 1) {
          this.$notify({title: '修改密码成功', type: 'success', duration: 1000})
        } else {
          this.$notify({title: data.msg, type: 'error', duration: 1000})
        }
      }).catch(data => {
        this.$notify({title: '修改失败', type: 'error', duration: 1000})
      })
    }
  }
}
</script>

<style scoped lang="less">
.userManage{
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
