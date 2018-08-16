<template>
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
        <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import { updatePassword } from '@/assets/js/api.js'

export default {
  data () {
    return {
      ruleForm: {
        user: '',
        oldPassword: '',
        password: ''
      }
    }
  },
  mounted () {
    this.ruleForm.user = sessionStorage.getItem('userName')
    console.log(this.ruleForm.user)
  },
  methods: {
    onSubmit () {
      let { oldPassword: passwordOld, password, user } = this.ruleForm
      let params = {
        user,
        passwordOld,
        password
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
