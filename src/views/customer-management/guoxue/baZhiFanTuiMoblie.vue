<template>
  <el-form :model="form" :rules="baZhirules" ref="baZhirules" labelPosition="left">
    <el-row type="flex" justify="center" class="mobile-row">
      <el-col :span="6" class="form-column">
        <el-form-item label="生辰" label-width="42px" >
          <el-switch :value="isFanTui" @change="switchChange" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="18" class="form-column">
        <el-form-item label="姓名" label-width="42px">
          <el-input v-model.trim="form.name"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="6" class="form-column">
        <el-form-item  prop="nian">
          <el-cascader v-model="form.nian" :options="options" :props="{ expandTrigger: 'hover' }"
                       :show-all-levels="false" popper-class="ba-zhi-fan-tui-popper" filterable></el-cascader>
        </el-form-item>
      </el-col>

      <el-col :span="6" class="form-column">
        <el-form-item  prop="yue">
          <el-cascader v-model="form.yue" :options="options" :props="{ expandTrigger: 'hover' }"
                       :show-all-levels="false" popper-class="ba-zhi-fan-tui-popper" filterable></el-cascader>
        </el-form-item>
      </el-col>

      <el-col :span="6" class="form-column">
        <el-form-item  prop="ri">
          <el-cascader v-model="form.ri" :options="options" :props="{ expandTrigger: 'hover' }"
                       popper-class="ba-zhi-fan-tui-popper" :show-all-levels="false" @change="changeRiGan" filterable></el-cascader>
        </el-form-item>
      </el-col>

      <el-col :span="6" class="form-column">
        <el-form-item >
          <el-select v-model="form.hh" placeholder="时柱" clearable>
            <el-option v-for="(item, index) in hourOptions" :key="index" :label="item" :value="item" filterable></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center" class="mobile-row">
      <el-col :span="24" class="form-column">
        <el-form-item style="display: flex; justify-content: center;">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="switchChange(false)">关闭</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { checkAuth } from '../../../utils/authUtils'

export default {
  props: {
    form: {
      type: Object,
      required: true,
      default: () => ({}) // 防止未传入时为空
    },
    baZhirules: Object,
    options: Array,
    hourOptions: Array,
    isFanTui: Boolean,
    // switchChange: Function,
    // onSubmit: Function,
    changeRiGan: Function
  },
  methods: {
    onSubmit() {
      if (!checkAuth(this)) return;
      this.$emit('onSubmit')
    },
    switchChange(v) {
      this.$emit('switchChange', v)
    },
  }
};
</script>

<style scoped>
.mobile-row {
  margin-bottom: 10px;
}
.form-column {
  margin-bottom: 10px;
}
</style>
