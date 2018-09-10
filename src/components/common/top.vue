<template>
  <el-header>blog后台管理系统
      <ul class="right-bar">
        <li class="userName"><img class="avatar" :src="avatar" :title="userName" /></li>
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
      avatar: '',
      userName: ''
    }
  },
  created () {
    this.userName = localStorage.getItem('user')
    this.avatar = localStorage.getItem('avatar')
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
      let moveToken = localStorage.getItem('token')
      if (moveToken) {
        localStorage.clear()
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
