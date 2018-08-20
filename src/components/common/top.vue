<template>
  <el-header>blog后台管理系统
      <ul class="right-bar">
        <li class="userName"><img class="avatar" :src="avatar" /></li>
        <li>
          <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom">
            <i class="fa fa-power-off"  @click="quit"></i>
          </el-tooltip>
        </li>
      </ul>
      <!-- 退出dialog -->
      <el-dialog
          title="提示"
          :visible.sync="quitDialogVisible"
          width="30%"
          >
          <span>确定退出吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelBtn" size="small">取 消</el-button>
            <el-button type="primary" @click="sureBtn" size="small">确 定</el-button>
          </span>
        </el-dialog>
  </el-header>
</template>

<script>
import { userInfo } from '@/assets/js/api.js'

export default {
  data () {
    return {
      quitDialogVisible: false,
      avatar: ''
    }
  },
  created () {
    this.userInfo()
  },
  methods: {
    // 用户详情
    userInfo () {
      userInfo().then(res => {
        let data = res.data
        if (res.status === 1) {
          this.avatar = data.avatar
          sessionStorage.setItem('user', data.user)
        } else {
          this.$notify({title: res.msg, type: 'error', duration: 1000})
        }
      }).catch(res => {
        this.$notify({title: '服务器异常', type: 'error', duration: 1000})
      })
    },
    // 退出
    quit () {
      this.quitDialogVisible = true
    },
    //
    cancelBtn () {
      this.quitDialogVisible = false
    },
    sureBtn () {
      this.quitDialogVisible = false
      let moveToken = sessionStorage.getItem('token')
      if (moveToken) {
        sessionStorage.clear()
      }
      this.$router.push({name: 'login'})
      window.location.reload()
    }
  }
}
</script>

<style scoped lang='less'>
.userName{
  font-size: 14px;
}
.avatar{
  width: 40px;
  height: 40px;
  border-radius:40px;
  display: inline-block;
  vertical-align: -14px;
}
</style>
