<template>
  <el-header>blog后台管理系统
      <ul class="right-bar">
        <!-- <li>
          <el-tooltip class="item" effect="dark" content="个人资料" placement="bottom">
            <i class="fa fa-user-circle"></i>
          </el-tooltip>
        </li>
        <li>
          <el-tooltip class="item" effect="dark" content="修改密码" placement="bottom">
            <i class="fa fa-lock" style="font-size: 18px;"></i>
          </el-tooltip>
        </li> -->
        <li class="userName">欢迎您，{{userName}}</li>
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
export default {
  data () {
    return {
      quitDialogVisible: false,
      userName: ''
    }
  },
  created () {
    this.userName = sessionStorage.getItem('userName')
    console.log(1111111111, this.userName)
    // this.userName = JSON.parse(sessionStorage.getItem('user')).name
  },
  methods: {
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
</style>
