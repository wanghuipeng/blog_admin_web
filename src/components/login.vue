<template>
  <div class="login">
    <h2 class="system-name">blog</h2>
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="60px" class="demo-ruleForm">
      <el-form-item label="账号" prop="username">
        <el-input v-model.number="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" @keyup.native.enter="submitForm('ruleForm')"></el-input>
      </el-form-item>
      <el-form-item>
         <a @click="register" href="javascript:void(0)">注册</a>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.enter="submitForm('ruleForm')" class="loginBtn">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, userInfo } from '@/assets/js/api.js'

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
      login(params).then(res => {
        let data = res.data
        if (data.status === 1) {
          localStorage.setItem('token', data.token)
          this.userInfo()
        } else {
          this.$notify({title: data.msg, type: 'error', duration: 1000})
        }
      }).catch(data => {
        this.$notify({title: '服务器异常', type: 'error', duration: 1000})
      })
    },
    // 用户详情
    userInfo () {
      userInfo().then(res => {
        let data = res.data
        if (res.status === 1) {
          localStorage.setItem('user', data.user)
          localStorage.setItem('avatar', data.avatar)
          if (data.freeze) {
            this.$notify({title: '很抱歉，您的账户已被冻结，请联系超级管理员！', type: 'error', duration: 3000})
          } else {
            this.$notify({title: '登录成功', type: 'success', duration: 1000})
            let menuAll = ['blogManage', 'remarkManage', 'praiseManage', 'collectManage', 'accountManage', 'orderListFront']
            localStorage.setItem('menu', JSON.stringify(menuAll))
            localStorage.setItem('menuIndex', JSON.stringify({menuIndex1: 0}))
            this.$router.push({name: menuAll[0]})
          }
        } else {
          this.$notify({title: res.msg, type: 'error', duration: 1000})
        }
      }).catch(res => {
        this.$notify({title: '服务器异常', type: 'error', duration: 1000})
      })
    },
    // 注册
    register () {
      this.$router.push({name: 'register'})
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
  .loginBtn{
    width: 100%;
    margin-top: 10px;
  }
}
</style>
