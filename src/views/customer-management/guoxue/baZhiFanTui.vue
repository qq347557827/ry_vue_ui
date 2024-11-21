<template>
  <div class="ba-zhi-fan-tui">
    <el-form :model="form" :rules="baZhirules" ref="baZhirules" label-width="80px" labelPosition="top"
             class="demo-ruleForm"
    >
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="5" style="display: flex;align-content: center;justify-content: center;font-size: 18px">
          <el-form-item label="八字反推">
            <el-switch
              :value="isFanTui"
              @change="switchChange"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="年柱" prop="nian">
            <el-cascader v-model="form.nian" :options="options" :props="{ expandTrigger: 'hover' }"
                         :show-all-levels="false" popper-class="ba-zhi-fan-tui-popper" filterable
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="月柱" prop="yue">
            <el-cascader v-model="form.yue" :options="options" :props="{ expandTrigger: 'hover' }"
                         :show-all-levels="false" popper-class="ba-zhi-fan-tui-popper" filterable
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="日柱" prop="ri">
            <el-cascader v-model="form.ri" :options="options" :props="{ expandTrigger: 'hover' }"
                         popper-class="ba-zhi-fan-tui-popper" :show-all-levels="false" @change="changeRiGan"
                         filterable
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="时柱">
            <el-select v-model="form.hh" placeholder="时柱" clearable>
              <el-option v-for="(item, index) in hourOptions" :key="index" :label="item" :value="item" filterable>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="操作栏">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="switchChange(false)">关闭</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div v-for="(item,index) in calendarArr" :key="index">
      <el-divider v-if="index > 0"></el-divider>
      <el-row type="flex" class="row-bg" justify="center"

      >
        <el-col :span="3" style="display: flex;justify-content: flex-end;align-content: center; flex-wrap: wrap; padding-right:10px ">
          <span style="font-size: 20px">{{form.name}}</span>
        </el-col>
        <el-col :span="5">

          <div>
            <span>公历   </span>
            <span>{{ item.solar._year }}年</span>
            <span>{{ item.solar._month }}月</span>
            <span>{{ item.solar._day }}日</span>
            <span>{{ item.solar._hour }}点</span>
          </div>
          <div>
            <span>农历   </span>
            <span>{{ item.lunar.toString() }}</span>
            <span>{{ item.lunar.getTimeZhi() }}时</span>
          </div>


        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="toMinPan(item)" title="新增一个命盘">新增</el-button>
          <el-button type="primary" @click="addMinPan(item)" title="添加到当前命盘">增加</el-button>
        </el-col>
      </el-row>

    </div>
  </div>
</template>
<script>
import { Solar } from 'lunar-typescript'

export default {
  name: 'BaZhiFanTui',
  props: ['isFanTui'],
  data() {
    return {
      calendarArr: [],
      form: {
        name: "",
        nian: '',
        yue: '',
        ri: '',
        hh: ''
      },
      baZhirules: {
        nian: [
          { required: true, message: '年份必填', trigger: 'blur' }
        ],
        yue: [
          { required: true, message: '月份必填', trigger: 'blur' }
        ],
        ri: [
          { required: true, message: '日必填', trigger: 'blur' }
        ]
      },
      options: [],
      hourOptions: []
    }
  },
  created() {
    this.ganZhiOptions()
    // this.generateTimeGanZhiOptions()
  },
  methods: {
    clearForm() {
      this.form = {
        name: '',
        nian: '',
        yue: '',
        ri: '',
        hh: ''
      }
      this.calendarArr = []
    },
    ganZhiOptions() {
      const tiangan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
      const dizhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

      const options = tiangan.map(t => ({
        value: t,
        label: t,
        children: dizhi.map(d => ({
          value: t + d,
          label: t + d
        }))
      }));
      this.options.push(...options)
      console.log(this.options)
    },
    generateTimeGanZhiOptions(dayGan) {
      if (dayGan) {
        const tiangan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
        const dizhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

        let tianganIndex;
        switch (dayGan) {
          case "甲":
          case "己":
            tianganIndex = 0;
            break;
          case "乙":
          case "庚":
            tianganIndex = 2;
            break;
          case "丙":
          case "辛":
            tianganIndex = 4;
            break;
          case "丁":
          case "壬":
            tianganIndex = 6;
            break;
          case "戊":
          case "癸":
            tianganIndex = 8;
            break;
          default:
            throw new Error("无效的日干参数");
        }

        this.hourOptions = []
        for (let i = 0; i < 12; i++) {
          this.hourOptions.push(tiangan[tianganIndex] + dizhi[i]);
          tianganIndex = (tianganIndex + 1) % 10;
        }
        console.log("🚀 ~ file:this.hourOptions method:generateTimeGanZhiOptions line:139 -----", this.hourOptions)

        this.$set(this.form, "hh", '')

      }

    },
    changeRiGan(value) {
      console.log(value)
      this.generateTimeGanZhiOptions(value[0])
    },
    onSubmit() {
      this.$refs['baZhirules'].validate((valid) => {
        if (valid) {
          console.log(this.form);
          const nian = this.form.nian[1]
          const yue = this.form.yue[1]
          const ri = this.form.ri[1]
          const hh = this.form.hh ? this.form.hh : this.hourOptions[0]
          console.log(nian, yue, ri, hh);

          const solarArr = Solar.fromBaZi(nian, yue, ri, hh)
          console.log(solarArr)
          this.calendarArr = []
          if (solarArr.length > 0) {
            // 循环，导入农历数据---》 赋予给this.solarArr,写组件列表
            for (const solar of solarArr) {
              console.log("🚀 ~ file:solarKey method: line:151 -----", solar.toFullString())

              const lunar = solar.getLunar()
              console.log("🚀 ~ file:lunar method: line:154 -----", lunar.toFullString())
              this.calendarArr.push({ solar, lunar })
              console.log("🚀 ~ file:this.calendarArr method: line:158 -----", this.calendarArr)

            }
          } else {
            this.$modal.msgError('没有查询出，请检查年柱 月柱 日柱是否对应')
          }
          // const lunar = solar.getLunar();
          console.log(solarArr);

        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    switchChange(v) {
      console.log(v)
      this.$emit("switchChange", v)
    },
    toMinPan(value) {
      console.log("🚀 ~ file:value method:toMinPan line:227 -----", value)
      this.$emit("toForm", {solar: value.solar, lunar: value.lunar, name:this.form.name})
    },
    addMinPan(value) {
      console.log("🚀 ~ file:value method:toMinPan line:227 -----", value)
      this.$emit("addForm", {solar: value.solar, lunar: value.lunar, name:this.form.name})

    }
  }
}
</script>

<style lang="scss">
.ba-zhi-fan-tui-popper {

  // 调整层级el-cascader宽度
  .el-cascader-panel {
    .el-cascader-menu {
      min-width: 20px;

      .el-cascader-menu__wrap {
        height: 430px;
      }
    }
  }

}
</style>
</style>
