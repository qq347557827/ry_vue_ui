<template>
  <div class="ba-zhi-fan-tui">
    <el-form :model="form" :rules="baZhirules" ref="baZhirules" label-width="80px" labelPosition="top"
      class="demo-ruleForm">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="2">
          <el-form-item label="年柱" prop="nian">
            <el-cascader v-model="form.nian" :options="options" :props="{ expandTrigger: 'hover' }"
              :show-all-levels="false" popper-class="ba-zhi-fan-tui-popper" filterable></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="月柱" prop="yue">
            <el-cascader v-model="form.yue" :options="options" :props="{ expandTrigger: 'hover' }"
              :show-all-levels="false" popper-class="ba-zhi-fan-tui-popper" filterable></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="日柱" prop="ri">
            <el-cascader v-model="form.ri" :options="options" :props="{ expandTrigger: 'hover' }"
              popper-class="ba-zhi-fan-tui-popper" :show-all-levels="false" @change="changeRiGan"
              filterable></el-cascader>
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
        <el-col :span="2">
          <el-form-item label="操作栏">
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { Solar } from 'lunar-typescript'
export default {
  name: 'BaZhiFanTui',
  data () {
    return {
      form: {
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
  created () {
    this.ganZhiOptions()
    // this.generateTimeGanZhiOptions()
  },
  methods: {
    ganZhiOptions () {
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
    generateTimeGanZhiOptions (dayGan) {
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
    changeRiGan (value) {
      console.log(value)
      this.generateTimeGanZhiOptions(value[0])
    },
    onSubmit () {
      this.$refs['baZhirules'].validate((valid) => {
        if (valid) {
          console.log(this.form);
          const nian = this.form.nian[1]
          const yue = this.form.yue[1]
          const ri = this.form.ri[1]
          const hh = this.form.hh ? this.form.hh : this.hourOptions[0]
          console.log(nian, yue, ri, hh);

          const solar = Solar.fromBaZi(nian, yue, ri, hh)
          if (solar.length > 0) {
            // 循环，导入农历数据---》 赋予给this.solarArr,写组件列表
          } else {
            this.$modal.msgError('没有查询出，请检查年柱 月柱 日柱是否对应')
          }
          // const lunar = solar.getLunar();
          console.log(solar);

        } else {
          console.log('error submit!!')
          return false
        }
      })
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
