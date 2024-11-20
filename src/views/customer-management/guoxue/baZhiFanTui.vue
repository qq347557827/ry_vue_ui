<template>
  <div class="ba-zhi-fan-tui">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px" labelPosition="top"
             class="demo-ruleForm"
    >
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="2">
          <el-form-item label="年柱" prop="nian">
            <el-cascader
              v-model="form.nian"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              :show-all-levels="false"
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="月柱" prop="yue">
            <el-cascader
              v-model="form.yue"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              :show-all-levels="false"
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="日柱" prop="ri">
            <el-cascader
              v-model="form.ri"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              :show-all-levels="false"
              @change="changeRiGan"
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="时柱">
            <el-select v-model="form.hh" placeholder="时柱" clearable>
              <el-option v-for="(item, index) in hourOptions" :key="index" :label="item.label" :value="item.value">
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
export default {
  name: 'BaZhiFanTui',
  data() {
    return {
      form: {
        nian: '',
        yue: '',
        ri: '',
        hh: ''
      },
      rules: {
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
        const tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
        const diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

        // 获取日天干的索引
        const dayGanIndex = tianGan.indexOf(dayGan);
        if (dayGanIndex === -1) {
          throw new Error('Invalid dayGan. Must be one of: 甲, 乙, 丙, 丁, 戊, 己, 庚, 辛, 壬, 癸');
        }

        // 生成时辰干支
        const options = diZhi.map((zhi, zhiIndex) => {
          const ganIndex = (dayGanIndex + zhiIndex) % 10; // 计算当前时辰的天干索引
          const ganZhi = tianGan[ganIndex] + zhi; // 拼接天干和地支
          return {
            value: ganZhi,
            label: ganZhi
          };
        });
        console.log("🚀 ~ file:options method:generateTimeGanZhiOptions line:139 -----", options)
        this.hourOptions = []
        this.$set(this.form, "hh", '')
        this.hourOptions.push(...options)

      }

    },
    changeRiGan(value) {
      console.log(value)
      this.generateTimeGanZhiOptions(value[0])
    },
    onSubmit() {
    }
  }
}
</script>

<style scoped lang="scss">
.ba-zhi-fan-tui {
}
</style>
</style>
