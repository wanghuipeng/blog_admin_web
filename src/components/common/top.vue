<template>
  <el-header>blog后台管理系统
      <ul class="right-bar">
        <li class="notice"><i class="fa fa-bell"></i><span class="num">{{notice}}</span></li>
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
import { userInfo } from '@/assets/js/api.js'

export default {
  data () {
    return {
      quitDialogVisible: false,
      avatar: '',
      userName: '',
      notice: 0
    }
  },
  created () {
    this.userName = localStorage.getItem('user')
    this.avatar = localStorage.getItem('avatar')
    let moveToken = localStorage.getItem('token')
    this.$socket.emit('sendPrivateMsg', moveToken)
    this.$socket.on('onlinenums', data => {
      this.notice = data.nums
      console.log(this.notice)
    })
    // this.userInfo()
  },
  methods: {
    // 用户详情
    userInfo () {
      userInfo()
        .then(res => {
          if (res.status === 1) {
            this.$socket.on('onlinenums', data => {
              this.notice = data.nums
              console.log(this.notice)
            })
          } else {
            this.$notify({ title: res.msg, type: 'error', duration: 1000 })
          }
        })
        .catch(res => {
          this.$notify({ title: '服务器异常', type: 'error', duration: 1000 })
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
      let moveToken = localStorage.getItem('token')
      if (moveToken) {
        localStorage.clear()
      }
      this.$router.push({ name: 'login' })
      window.location.reload()
    }
  }
}
</script>

<style scoped lang='less'>
.userName {
  font-size: 14px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  display: inline-block;
  vertical-align: -14px;
}
.right-bar {
  .notice {
    position: relative;
    margin-right: 10px;
    .num {
      position: absolute;
      top: -5px;
      font-size: 12px;
      background-color: #f56c6c;
      height: 12px;
      min-width: 12px;
      display: inline-block;
      text-align: center;
      line-height: 12px;
      border-radius: 15px;
      padding: 3px;
      left: 7px;
    }
  }
}
</style>
