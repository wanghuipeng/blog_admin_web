<template>
  <div class="login">
    <h2 class="system-name">blog</h2>
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="60px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model.number="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" @keyup.native.enter="submitForm('ruleForm')"></el-input>
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
      ruleForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      let { username: user, password } = this.ruleForm
      let params = {
        user,
        password
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
        this.$notify({title: '注册失败', type: 'error', duration: 1000})
      })
    }
  }
}
</script>

<style scoped lang='less'>
.login{
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
}
</style>
