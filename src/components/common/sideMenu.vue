<template>
    <el-aside width="155px">
      <el-col>
        <el-menu
          :default-active="menuIndex"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"  >
          <div  v-for="(item,key) of menus" :key="key">
            <template v-if="item.item">
              <el-submenu :index="key.toString()" >
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{item.title}}</span>
                </template>
                <el-menu-item-group v-for="(items,indexs) of item.item" :key="indexs">
                  <el-menu-item :index="key+'-'+indexs" @click="toLink(items.name,key,indexs)">{{items.text}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :index="key.toString()" @click="toLink(item.name,key)">
                <i :class="item.icon"></i>
                <span slot="title">{{item.text}}</span>
              </el-menu-item>
            </template>
            </div>
        </el-menu>
      </el-col>
    </el-aside>
</template>

<script>
export default {
  data () {
    return {
      editableTabsValue: '0',
      editableTabs: [],
      index: '',
      index1: '0',
      index2: '',
      menus: []
    }
  },
  computed: {
    menuIndex: function () {
      return typeof (this.index2) === 'undefined' ? this.index1 : this.index1 + '-' + this.index2
    }
  },
  mounted () {
    let menu = JSON.parse(sessionStorage.getItem('menu')) || []
    let menuObj = menu.map(function (item, index) {
      let obj = {
        icon: '',
        name: item,
        text: index
      }
      switch (item) {
        case 'userManage':
          obj.text = '用户管理'
          obj.icon = 'el-icon-news'
          break
        case 'blogManage':
          obj.text = '博客管理'
          obj.icon = 'el-icon-document'
          break
        case 'allotLog':
          obj.text = 'menu4'
          obj.icon = 'el-icon-setting'
          break
        case 'statement':
          obj.text = 'menu5'
          obj.icon = 'el-icon-tickets'
          break
        case 'firstBarList':
          obj.text = 'menu6'
          obj.icon = 'el-icon-location'
          break
        case 'busiHallFront':
          obj.text = 'menu7'
          obj.icon = 'el-icon-setting'
          break
        case 'orderListFront':
          obj.text = 'menu8'
          obj.icon = 'el-icon-document'
          break
        default:
          return
      }
      return obj
    })
    this.menus = menuObj
    this.index1 = JSON.parse(sessionStorage.getItem('menuIndex'))['menuIndex1'] + '' // 获取激活的一级菜单项
    this.index2 = JSON.parse(sessionStorage.getItem('menuIndex'))['menuIndex2'] // 获取激活的二级菜单项
  },
  methods: {
    toLink (name, key1, key2) {
      this.$router.push({name: name})
      sessionStorage.setItem('menuIndex', JSON.stringify({menuIndex1: key1, menuIndex2: key2})) // 存储激活的菜单项
    }
  }
}
</script>

<style scoped lang='less'>

</style>
