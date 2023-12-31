<template>
  <div>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>客户资料</span>
      </div>
      <el-form :model="propCustomerForm" :rules="propCustomerRules" ref="customerForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="微信" prop="wechat" :label-width="formLabelWidth">
              <el-input v-model="propCustomerForm.wechat" placeholder="请输入微信"/>
            </el-form-item>
          </el-col>
          <el-col :span="8" :label-width="formLabelWidth">
            <el-form-item label="添加时间" prop="wechatDate" :label-width="formLabelWidth">
              <el-date-picker clearable
                              v-model="propCustomerForm.wechatDate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="请选择添加时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="来源渠道" :label-width="formLabelWidth">
              <el-select v-model.number="propCustomerForm.sourceChannel" placeholder="来源渠道">
                <el-option
                  v-for="item in order.sysSourceChannel"
                  :key="item.dictCode"
                  :label="item.dictLabel"
                  :value="item.dictLabel"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item label="身高" :label-width="formLabelWidth">
              <el-input v-model="propCustomerForm.height" placeholder="请输入身高"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="年龄" :label-width="formLabelWidth">
              <el-input v-model.number="propCustomerForm.age" placeholder="请输入年龄"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="体重" :label-width="formLabelWidth">
              <el-input v-model="propCustomerForm.weight" placeholder="请输入体重"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="减" :label-width="formLabelWidth">
              <el-input v-model="propCustomerForm.loseWeight" placeholder="请输入减重多少斤"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="客户备注" :label-width="formLabelWidth">
          <el-input v-model="propCustomerForm.remark" placeholder="客户备注"/>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'CreateCustomer',
  props: {
    formLabelWidth: String,
    propCustomerForm: {
      type: Object,
      default: () => {
      }
    },
    propCustomerRules: {
      type: Object,
      default: () => {
      }
    }
  },
  computed: {
    ...mapState(['order'])

  },
  data() {
    return {
      //   customerForm: {},
      //   // 表单校验
      //   customerRules: {
      //     wechat: [
      //       { required: true, message: '微信不能为空', trigger: 'blur' }
      //     ],
      //     wechatDate: [
      //       { required: true, message: '添加时间不能为空', trigger: 'blur' }
      //     ]
      //   }
    }
  },
  created() {
    // if (this.propCustomerForm.customerId) {
    //   this.reset()
    //   Object.keys(this.customerForm).forEach(item => {
    //     this.$set(this.customerForm, item, this.propCustomerForm[item])
    //   })
    // } else {
    //   this.reset()
    // }
  },
  methods: {
    // 表单重置
    // reset() {
    //   this.customerForm = {
    //     id: null,
    //     wechat: null,
    //     wechatDate: null,
    //     height: null,
    //     weight: null,
    //     loseWeight: null,
    //     customerRemark: null
    //     // province: null,
    //     // city: null,
    //     // district: null,
    //     // address: null,
    //     // userId: null,
    //     // deptId: null,
    //
    //   }
    //   this.resetForm('customerForm')
    // }
  }
}
</script>

<style scoped lang="scss">

</style>
