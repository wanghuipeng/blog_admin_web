<template>
  <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
    <span class="location">位置：</span>
    <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index" >{{item}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: [ 'breadcrumb' ],
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>

<style scoped lang='less'>

</style>
