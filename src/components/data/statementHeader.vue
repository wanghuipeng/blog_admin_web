<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
      <el-form-item class="w-140">
        <el-select v-model="formInline.source">
          <el-option label="所有来源" value="allSource"></el-option>
          <el-option label="来源1" value="source1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="w-140">
        <el-select v-model="formInline.media">
          <el-option label="所有媒体" value="allMedia"></el-option>
          <el-option label="媒体1" value="media1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="w-140">
        <el-select v-model="formInline.account">
          <el-option label="所有账号" value="allAccount"></el-option>
          <el-option label="账号1" value="account1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="w-140">
        <el-input v-model="formInline.variety" placeholder="来源/媒体/账号"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onFilter">筛选</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formInline: {
        source: 'allSource',
        media: 'allMedia',
        account: 'allAccount',
        variety: ''
      },
      createTimeStart: '',
      createTimeEnd: '',
      dateValue: [],
      // 日期配置项
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  methods: {
    onFilter () {
      console.log('筛选!')
    },
    // 时间筛选设置
    dateChange (val) {
      if (val) {
        this.createTimeStart = val[0]
        this.createTimeEnd = val[1]
      } else {
        this.createTimeStart = ''
        this.createTimeEnd = ''
      }
    }
  }
}
</script>

<style scoped lang='less'>

</style>
