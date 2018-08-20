<template>
  <div class="home">
    <el-container class="is-vertical">
      <top />
      <el-container id="content">
        <side-menu id="aside" />
        <el-container>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import top from '@/components/common/top'
import sideMenu from '@/components/common/sideMenu'
import '@/assets/js/resize.js'

export default {
  name: 'home',
  components: { top, sideMenu },
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

  },
  watch: {
    $route (to, from) {
      switch (to.path) {
        case '/busiList':
          sessionStorage.setItem('menuIndex', JSON.stringify({menuIndex1: 0}))
          break
        case '/orderList':
          sessionStorage.setItem('menuIndex', JSON.stringify({menuIndex1: 1}))
          break
        case '/allotLog':
          sessionStorage.setItem('menuIndex', JSON.stringify({menuIndex1: 2}))
          break
        case '/statement':
          sessionStorage.setItem('menuIndex', JSON.stringify({menuIndex1: 3}))
          break
        case '/firstBarList':
          sessionStorage.setItem('menuIndex', JSON.stringify({menuIndex1: 4}))
          break
        case '/busiHallFront':
          sessionStorage.setItem('menuIndex', JSON.stringify({menuIndex1: 5}))
          break
        case '/orderListFront':
          sessionStorage.setItem('menuIndex', JSON.stringify({menuIndex1: 6}))
          break
        default:
          return false
      }
    }
  }
}
</script>

<style lang='less'>
.home{
  height: 100%;
  .right-bar{
    float:right;
    margin: 0;
    li{
        line-height: 40px;
        height: 40px;
        text-align: center;
        display: inline-block;
        margin-left: 5px;
        i{
          width: 16px;
          height: 16px;
          display: inline-block;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
        }
    }
  }
  .el-menu{
    border-right: none;
  }
  .el-submenu__title,.el-menu-item{
      text-align: left;
      background-color: #262c46 !important;
      padding-left: 10px !important;
      &:hover{
        background-color: #1b2033 !important;
      }
      i{
        color: #fff;
      }
  }
  .el-submenu{
    text-align: left;
    .el-menu-item-group__title{
      padding-top: 0 !important;
      padding-bottom: 0 !important;

    }
    .el-menu-item{
      background-color: #262c46 !important;
      min-width: initial;
      padding-left: 45px  !important;
    }

  }
  .el-container{
    height: 100%;
  }
  .el-header {
    text-align: left;
    font-size: 18px;
    background-color: #262c46;
    color: #fff;
    line-height: 60px;
    height: 60px !important;
    padding: 0 15px;
  }

  .el-aside {
    background-color: #262c46;
    color: #fff;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
}
</style>
