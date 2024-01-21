<template>
  <div class="guoxue">
    <div class="search">
      <el-form :form="form" label-width="80px" labelPosition="top">
        <el-row>
          <el-col :span="4">
            <el-form-item label="姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="是否公历">
              <el-switch v-model="form.isSolar"></el-switch>
            </el-form-item>
          </el-col>
          <!--          <el-col :span="4">-->
          <!--            <el-form-item label="性别">-->
          <!--              <el-radio-group v-model="form.sex">-->
          <!--                <el-radio label="男"></el-radio>-->
          <!--                <el-radio label="女"></el-radio>-->
          <!--              </el-radio-group>-->
          <!--            </el-form-item>-->
          <!--          </el-col>-->
          <el-col :span="2">
            <el-form-item label="年份">
              <el-select  v-model="form.nian" filterable placeholder="请选择">
                <el-option
                  v-for="item in 74"
                  :key="item"
                  :label="item + 1950"
                  :value="item + 1950"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="月">
              <el-select v-model="form.yue" placeholder="请选择">
                <el-option
                  v-for="item in 12"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="是否闰月">
              <el-switch v-model="form.isLeapMonth"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="日">
              <el-select v-model="form.ri" placeholder="请选择">
                <el-option
                  v-for="item in 30"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="时">
              <el-select v-model="form.hh" placeholder="请选择">
                <el-option
                  v-for="item in timeArr"
                  :key="item.time"
                  :label="item.timeStr"
                  :value="item.time"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="main">
      <div style="width: 760px; margin: auto" v-html="html"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import calendar from "js-calendar-converter"
import { postGuoxue } from '../../../api/customer_order_goods/customer'

export default {
  name: 'GuoXue',
  data() {
    return {
      html: null,
      form: {},
      timeArr: [
        { time: 0, timeStr: '00子时(晚上12点)' },
        { time: 1, timeStr: '01丑时(凌晨1点)' },
        { time: 2, timeStr: '02丑时(凌晨2点)' },
        { time: 3, timeStr: '03寅时(凌晨3点)' },
        { time: 4, timeStr: '04寅时(凌晨4点)' },
        { time: 5, timeStr: '05卯时(凌晨5点)' },
        { time: 6, timeStr: '06卯时(早上6点)' },
        { time: 7, timeStr: '07辰时(早上7点)' },
        { time: 8, timeStr: '08辰时(早上8点)' },
        { time: 9, timeStr: '09巳时(早上9点)' },
        { time: 10, timeStr: '10巳时(上午10点)' },
        { time: 11, timeStr: '11午时(上午11点)' },
        { time: 12, timeStr: '12午时(中午12点)' },
        { time: 13, timeStr: '13未时(下午1点)' },
        { time: 14, timeStr: '14未时(下午2点)' },
        { time: 15, timeStr: '15申时(下午3点)' },
        { time: 16, timeStr: '16申时(下午4点)' },
        { time: 17, timeStr: '17酉时(下午5点)' },
        { time: 18, timeStr: '18酉时(下午6点)' },
        { time: 19, timeStr: '19戌时(晚上7点)' },
        { time: 20, timeStr: '20戌时(晚上8点)' },
        { time: 21, timeStr: '21亥时(晚上9点)' },
        { time: 22, timeStr: '22亥时(晚上10点)' },
        { time: 23, timeStr: '23子时(晚上11点)' }
      ]
    }
  },
  created() {

  },
  methods: {
    onSubmit() {
      console.log(this.form)
      const y =  calendar.lunar2solar(this.form.nian, this.form.yue, this.form.ri, this.form.isLeapMonth)
      console.log(y)
      const data = {
        nian: y.cYear,
        yue: y.cMonth,
        ri: y.cDay,
        hh: this.form.hh ? this.form.hh : 0,
        mm: this.form.mm ? this.form.mm : 0,
      }
      postGuoxue(data).then(res => {
        console.log(res)
        this.html = res
        const  k = this.html.indexOf("<table")
        console.log(k)
        this.html = this.html.slice(k);
        console.log(this.html)
      }).catch(err => console.log(err))
    },
    reset() {
      this.form = {
        nian: null,
        yue: null,
        ri: null,
        hh: null,
        mm: null,
        isLeapMonth: false,
        isSolar:false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
