<template>
  <div>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>客户收件信息</span>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form :model="addressForm" :rules="addressRules" ref="addressForm">
            <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
              <el-input v-model="addressForm.name" placeholder="请输入姓名"/>
            </el-form-item>
            <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
              <el-input v-model="addressForm.phone" placeholder="请输入手机"/>
            </el-form-item>
            <el-form-item label="详细地址" prop="address" :label-width="formLabelWidth">
              <el-input v-model="addressForm.address" placeholder="请输入地址"/>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'Address',
  props: {
    formLabelWidth: String,
    propAddressForm: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      addressForm: {
        name: '',
        phone: '',
        address: ''
      },
      addressRules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '地址不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.propAddressForm.name) {
      this.reset()
      Object.keys(this.addressForm).forEach(item => {
        this.$set(this.addressForm, item, this.propAddressForm[item])
      })
    } else {
      this.reset()
    }
  },
  methods: {
    reset() {
      this.addressForm = {
        name: null,
        phone: null,
        address: null
      }
      this.resetForm('addressForm')
    }
  }
}
</script>

<style scoped lang="scss">

</style>
