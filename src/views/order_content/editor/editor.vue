<template>
  <div>
    <el-drawer
      :title="title"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      :wrapperClosable="false"
      size="70%"
    >
      <!--      <div>{{order}}</div>-->
      <div class="demo-drawer__content">
        <!--        <Address ref="orderAddress" :form-label-width="formLabelWidth"-->
        <!--                 :prop-address-form="propForm"-->
        <!--        />-->
        <recipient-details :prop-form="addressForm" :prop-rules="orderRules"
                           ref="orderAddress" :form-label-width="formLabelWidth"
                           @blurAddressParse="blurAddressParse"
                           @cascaderChange="cascaderChange"
        />
        <template v-if="isCustomer">
          <create-customer :form-label-width="formLabelWidth"
                           :prop-customer-form="customerForm"
                           :prop-customer-rules="customerRules"
                           style="margin-top: 10px"
                           ref="orderCustomer"
          />
        </template>

        <template v-if="isOrder">
          <el-form :model="orderForm" :rules="orderRules" ref="orderForm">


            <el-card class="box-card" shadow="never" style="margin-top: 10px">
              <div slot="header">
                <div>商品信息</div>
              </div>
              <el-form-item prop="orderGoodsList">
                <el-table
                  :data="orderForm.orderGoodsList"
                  min-height="180"
                  max-height="350"
                  empty-text="请添加商品"
                >
                  <el-table-column
                    label="ID"
                    type="index"
                    width="90"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="goodsName"
                    width="420"
                  >
                    <template v-slot:header="scope">
                      <el-select style="width: 380px"
                                 v-model="goodsNumData.goodsId" placeholder="请选择商品信息"
                                 @change="changeOrderGoodsNameSelect"
                      >
                        <el-option
                          v-for="item in order.goodsList"
                          :key="item.goodsId"
                          :label="item.goodsName"
                          :value="item.goodsId"
                        >
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="quantity"
                    width="180"
                  >
                    <template v-slot:header="scope">
                      <el-input-number size="mini" v-model="goodsNumData.quantity" @change="changeOrderGoodsNum"
                                       :min="1"
                                       :max="25" label="数量"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column
                    width="180"
                    align="right"
                  >
                    <template slot="header" slot-scope="scope">
                      <el-button
                        type="primary"
                        @click="handleAddOrderGoodsList"
                      >添加商品
                      </el-button>
                    </template>
                    <template v-slot="scope">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelOrderGoodsList(scope.$index, scope.row)"
                      >删除商品
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-card>
            <el-card class="box-card" style="margin-top: 10px" shadow="never">
              <div slot="header">
                <div>金额信息</div>
              </div>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="总金额" prop="totalAmount" :label-width="formLabelWidth">
                    <el-input v-model="orderForm.totalAmount" placeholder="请输入总金额" @blur="blurGetCollectAmount"/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="定金" prop="deposit" :label-width="formLabelWidth">
                    <el-input v-model="orderForm.deposit" placeholder="请输入定金" @blur="blurGetCollectAmount"/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="付款方式" prop="payMethod" :label-width="formLabelWidth">
                    <el-select v-model.number="orderForm.payMethod" placeholder="付款方式">
                      <el-option
                        v-for="item in order.sysPayMethod"
                        :key="item.dictCode"
                        :label="item.dictLabel"
                        :value="item.dictLabel"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="代收金额" prop="collectAmount" :label-width="formLabelWidth">
                    <el-input v-model="orderForm.collectAmount" placeholder="请输入代收金额"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="快递公司" :label-width="formLabelWidth">
                    <el-select v-model="orderForm.expressCompany" placeholder="快递公司">
                      <el-option
                        v-for="item in order.sysExpressCompany"
                        :key="item.dictCode"
                        :label="item.dictLabel"
                        :value="item.dictLabel"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="快递单号" :label-width="formLabelWidth">
                    <el-input v-model="orderForm.trackingNumber" placeholder="请输入快递单号"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="订单备注" :label-width="formLabelWidth">
                <el-input v-model="orderForm.remark" placeholder="请输入订单备注"/>
              </el-form-item>
              <el-form-item label="">
                <el-radio-group v-model="orderForm.orderType" size="medium">
                  <el-radio :label="'0'">预定单</el-radio>
                  <el-radio :label="'1'">正常订单</el-radio>
                  <el-radio :label="'2'">退款单</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-card>
            <!--          <el-card shadow="never">-->
            <!--            -->
            <!--          </el-card>-->
          </el-form>
        </template>

        <el-card shadow="never">

          <div class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-card>

      </div>
    </el-drawer>
  </div>
</template>

<script>
import Address from '@/views/order_content/editor/address.vue'
import CreateCustomer from '@/views/customer-management/createCustomer.vue'
import { mapState } from 'vuex'
import store from '@/store'
import order from '@/store/modules/order'
import { addOrder, addOrderAndCustomer, updateOrder } from '@/api/customer_order_goods/order'
import AddressTest from '@/views/order_content/editor/recipientDetails.vue'
import RecipientDetails from '@/views/order_content/editor/recipientDetails.vue'
import { codeToText } from 'element-china-area-data'
import { addCustomer, updateCustomer } from '@/api/customer_order_goods/customer'

export default {
  name: 'Editor',
  components: { RecipientDetails, AddressTest, CreateCustomer, Address },
  props: {
    isLoading: false,
    dialog: Boolean,
    title: String,
    isCustomerToAddOrder: {
      type: Boolean,
      default: false
    },
    isUpdateOrder: {
      type: Boolean,
      default: false
    },
    propForm: {
      type: Object,
      default: () => {
      }
    },
    type: {
      type: String,
      default: '',
      validator: function(value) {
        return ['', 'updateOrder', 'customerToAddOrder', 'addCustomer', 'updateCustomer'].includes(value)
      }
    }
  },
  data() {
    var checkMoney = (rule, value, callback) => {
      const regex = /^\d+(\.\d{1,2})?$/
      const flg = regex.test(value)
      console.log(flg)
      if (!flg) {
        return callback(new Error('请输入整数或者小数点不超过两位'))
      }
      return callback()
      // }

    }
    return {
      formLabelWidth: '80px',
      addressParse: '',
      loading: false,
      isOrder: true,
      isCustomer: true,
      orderForm: {
        orderType: '1',
        orderId: null,
        customerId: null,
        totalAmount: null,
        deposit: null,
        collectAmount: null,
        payMethod: null,
        orderGoodsList: [],
        expressCompany: null,
        trackingNumber: null,
        remark: null
      },
      addressForm: {},
      goodsNumData: {
        goodsId: '',
        goodsName: '',
        quantity: 1
      },
      // 表单校验
      orderRules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机不能为空', trigger: 'blur' }
        ],
        selectedOptions: [
          { required: true, message: '请选择区域', trigger: 'blur' }
        ],
        detailAddress: [
          { required: true, message: '地址不能为空', trigger: 'blur' }
        ],
        orderGoodsList: [
          { type: 'array', required: true, message: '请至少选择一个商品' }
        ],
        // totalAmount: [
        //   { required: true, message: '总金额不能为空', trigger: 'blur' },
        // ],
        totalAmount: [
          { required: true, message: '总金额不能为空', trigger: 'blur' },
          { validator: checkMoney, trigger: 'blur' }
        ],
        deposit: [
          { required: true, message: '定金不能为空', trigger: 'blur' },
          { validator: checkMoney, trigger: 'blur' }
        ],
        collectAmount: [
          { required: true, message: '代收不能为空', trigger: 'blur' },
          { validator: checkMoney, trigger: 'blur' }
        ],
        payMethod: [
          { required: true, message: '付款方式', trigger: 'change' }
        ]
      },
      // 客户资料表单
      customerForm: {},
      // 客户资料校验
      customerRules: {
        wechat: [
          { required: true, message: '微信不能为空', trigger: 'blur' }
        ],
        wechatDate: [
          { required: true, message: '添加时间不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    console.log('createdDetail')
    this.reset()
    let sysSourceChannel = store.state.order.sysSourceChannel
    let sysPayMethod = store.state.order.sysPayMethod
    let sysExpressCompany = store.state.order.sysExpressCompany
    let goodsList = store.state.order.goodsList

    if (sysSourceChannel.length < 1) {
      store.dispatch('order/getSysSourceChannel')
    }
    if (goodsList.length < 1) {
      store.dispatch('order/getGoods')
    }
    if (sysPayMethod.length < 1) {
      store.dispatch('order/getSysPayMethod')
    }
    if (sysExpressCompany.length < 1) {
      store.dispatch('order/getSysExpressCompany')
    }
  },
  computed: {
    ...mapState(['order'])
  },
  watch: {
    type(newVal, oldVal) {
      console.log('newVal', newVal)
      if (newVal === 'updateOrder') {
        this.initForm(this.orderForm)
        this.isCustomer = false
      } else if (newVal === 'customerToAddOrder') {
        console.log('进入customerToAddOrder', newVal)
        // 不能再initForm赋值，因为orderForm和CustomerForm的 remark键名相同，否则会把CustomerForm的 remark给order的remark
        this.$set(this.orderForm, "customerId", this.propForm.id)
        this.initForm()
        console.log("this.orderForm",this.orderForm)
        this.isCustomer = false
      } else if (newVal === 'addCustomer') {
        this.isOrder = false
        this.reset()
      } else if (newVal === 'updateCustomer') {
        this.initForm(this.customerForm)
        this.isOrder = false
      } else {
        this.reset()
        this.isOrder = true
        this.isCustomer = true
      }
    }
  },
  methods: {
    initSelectedOptions(areaCodeString) {
      if (!areaCodeString) return;
      let arr = []
      arr[0] = areaCodeString.substring(0, 2) // 取前两位

      arr[1] = areaCodeString.substring(0, 4) // 取前四位

      arr[2] = areaCodeString
      console.log('arr', arr) // 打印数组
      return arr
    },
    initForm(form) {
      // 使用 JSON.stringify 将对象转为 JSON 字符串
      const jsonString = JSON.stringify(this.propForm)
      // 使用 JSON.parse 将 JSON 字符串转为新的对象
      const obj = JSON.parse(jsonString)
      // obj.id && (obj.customerId = obj.id)
      obj.areaCode && (obj.selectedOptions = this.initSelectedOptions(obj.areaCode))

      console.log('obj', obj)
      Object.keys(this.addressForm).forEach(item => {
        this.$set(this.addressForm, item, obj[item])
      })
      form && Object.keys(form).forEach(item => {
        obj[item] !== null && this.$set(form, item, obj[item])
      })

    },
    cascaderChange(value) {
      this.$set(this.addressForm, 'areaCode', value[2])
      this.$set(this.addressForm, 'province', codeToText[value[0]])
      this.$set(this.addressForm, 'city', codeToText[value[1]])
      this.$set(this.addressForm, 'district', codeToText[value[2]])
    },
    blurAddressParse(parseResult) {
      if (parseResult.areaCode && parseResult.areaCode.length >= 4) {
        const arr = this.initSelectedOptions(parseResult.areaCode)
        console.log(arr) // 打印数组
        this.$set(this.addressForm, 'selectedOptions', arr)
        this.$set(this.addressForm, 'name', parseResult.name)
        this.$set(this.addressForm, 'phone', parseResult.phone)
        this.cascaderChange(arr)

        parseResult.detail && (this.$set(this.addressForm, 'detailAddress', parseResult.detail))

      } else {
        console.log('字符串长度不足，无法进行操作')
      }
      this.$set(this.orderForm, 'name', parseResult.name)
      this.$set(this.orderForm, 'phone', parseResult.phone)
    },
    /** */
    handleClose() {
      this.cancel()
    },
    postForm(fn, data) {
      let loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      fn(data).then(response => {
        console.log('updateOrderresponse', response)
        if (response.code === 200) {
          this.$modal.msgSuccess('提交成功')
          this.reset()
          this.$emit('handleSuccess')
        }
      }).catch()
        .finally(() => loading.close())
    },
    /** 提交按钮 */
    submitForm() {
      const allValidate = this.getAllValidate()
      if (allValidate.orderValidate && allValidate.customerValidate) {
        const data = {
          customer: { ...this.addressForm, ...this.customerForm },
          sysOrder: { ...this.orderForm, ...this.addressForm }
        }
        this.postForm(addOrderAndCustomer, data)
      } else if (this.type === 'updateOrder' && allValidate.orderValidate) {
        this.postForm(updateOrder, { ...this.orderForm, ...this.addressForm })
      } else if (this.type === 'customerToAddOrder' && allValidate.orderValidate) {
        this.postForm(addOrder, { ...this.orderForm, ...this.addressForm })
      } else if (this.type === 'addCustomer' && allValidate.customerValidate) {
        console.log('addCustomer')
        this.postForm(addCustomer, { ...this.customerForm, ...this.addressForm })
      } else if (this.type === 'updateCustomer' && allValidate.customerValidate) {
        this.postForm(updateCustomer, { ...this.customerForm, ...this.addressForm })
      }

    },
    // 取消按钮
    cancel() {
      this.reset()
      this.$emit('handleClose')

    },
    // 表单重置
    reset() {
      this.addressForm = {
        name: '',
        phone: '',
        selectedOptions: '',
        areaCode: '',
        province: '',
        city: '',
        district: '',
        detailAddress: '',
        addressParse: ''
      }
      this.resetForm('addressForm')
      this.orderForm = {
        orderType: '1',
        orderId: null,
        customerId: null,
        totalAmount: null,
        deposit: null,
        collectAmount: null,
        payMethod: null,
        orderGoodsList: [],
        expressCompany: null,
        trackingNumber: null,
        remark: null
      }
      this.goodsNumData = {
        goodsId: '',
        goodsName: '',
        quantity: 1
      }
      this.resetForm('orderForm')
      this.customerForm = {
        id: null,
        wechat: null,
        wechatDate: null,
        height: null,
        weight: null,
        loseWeight: null,
        remark: null,
        sourceChannel: null,
        // province: null,
        // city: null,
        // district: null,
        // address: null,
        // userId: null,
        // deptId: null,
      }
      this.resetForm('customerForm')
    },
    getAllValidate() {
      let obj = {
        customerValidate: false,
        orderValidate: false
      }
      let addressValidate
      this.$refs['orderAddress'].$refs['addressForm'].validate(valid => {
        console.log('addressFormvalid', valid)
        addressValidate = valid
      })
      this.$refs['orderCustomer']?.$refs['customerForm'].validate(valid => {
        console.log('customerFormvalid', valid)
        obj.customerValidate = valid && addressValidate
      })
      this.$refs['orderForm']?.validate(valid => {
        console.log('orderForm', valid)
        obj.orderValidate = valid && addressValidate
      })
      return obj
    },
    handleDelOrderGoodsList(index, row) {
      console.log(index)
      this.orderForm.orderGoodsList.splice(index, 1)
    },
    changeOrderGoodsNum() {

    },

    handleAddOrderGoodsList() {
      const flg = this.goodsNumData.goodsId && this.goodsNumData.goodsName && this.goodsNumData.quantity
      console.log('goodsHeaderAdd', flg)
      if (flg) {
        // 判断商品表是否存在相同的商品
        console.log("// 判断商品表是否存在相同的商品", this.orderForm.orderGoodsList)
        const flg1 = this.orderForm.orderGoodsList.some(item => item.goodsId === this.goodsNumData.goodsId)
        if (flg1) {
          this.$alert('已添加有同样的商品')
        } else {
          this.orderForm.orderGoodsList.push({
            goodsId: this.goodsNumData.goodsId,
            goodsName: this.goodsNumData.goodsName,
            quantity: this.goodsNumData.quantity
          })
        }
        // this.$set(this.form, 'orderGoodsList', arr)
      }
    },
    changeOrderGoodsNameSelect(value) {
      console.log('goodsSelectChange--name', value)
      this.order.goodsList.forEach(item => {
        if (item.goodsId === value) {
          console.log(item.goodsName)
          this.$set(this.goodsNumData, 'goodsName', item.goodsName)
        }
      })
    },
    blurGetCollectAmount() {
      if (this.orderForm.totalAmount && this.orderForm.deposit) {
        const num = this.orderForm.totalAmount - this.orderForm.deposit
        this.$set(this.orderForm, 'collectAmount', num)
      }
    }
  }
}
</script>
