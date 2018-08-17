<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
      <el-form-item class="w-140">
        <el-select v-model="formInline.check">
          <el-option label="全部核算方法" value="allCheck"></el-option>
          <el-option label="佣金核算" value="check1"></el-option>
          <el-option label="单个核算" value="check2"></el-option>
          <el-option label="放款金额核算" value="check3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="w-140">
        <el-select v-model="formInline.city">
          <el-option label="上海" value="city1"></el-option>
          <el-option label="北京" value="city2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="w-140">
        <el-input v-model="formInline.variety" placeholder="一级巴/媒体名称"></el-input>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="dateValue"
          type="daterange"
          align="center"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :picker-options="pickerOptions"
          @change="dateChange"
          class="w-220"
        >
        </el-date-picker>
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
        check: 'allCheck',
        city: 'city1',
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
