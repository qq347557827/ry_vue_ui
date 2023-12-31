<template>
  <div>
    <!--    <div>{{intRegionData}}</div>-->
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>客户收件信息</span>
      </div>
      <el-row>
        <el-form :model="propForm" :rules="propRules" ref="addressForm">
          <el-col :span="12">

            <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
              <el-input v-model="propForm.name" placeholder="请输入姓名"/>
            </el-form-item>
            <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
              <el-input v-model="propForm.phone" placeholder="请输入手机"/>
            </el-form-item>
            <el-form-item label="省市区" prop="selectedOptions" :label-width="formLabelWidth">
              <el-cascader style="width: 100%"
                           size="large"
                           :options="regionData"
                           v-model="propForm.selectedOptions"
                           :clearable="true"
                           @change="handleChange"
              >
              </el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="detailAddress" :label-width="formLabelWidth">
              <el-input v-model="propForm.detailAddress" placeholder="请输入地址"/>
            </el-form-item>


          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="识别地址" :label-width="formLabelWidth" style="width: 100%;height: 100%">
                <el-input
                  v-model="propForm.addressParse" placeholder="请输入地址"
                  type="textarea"
                  style="width: 100%; height: 214px"
                  @blur="blurAddressParse"
                />
              </el-form-item>
            </div>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
  </div>
</template>
<script>
// import AddressParse from 'zh-address-parse'

import AddressParse from '../../../plugins/addressParse'
import { codeToText, regionData } from 'element-china-area-data'
import axios from 'axios'

export default {
  name: 'RecipientDetails',
  props: {
    propRules: {
      type: Object,
      default: () => {
      }
    },
    propForm: {
      type: Object,
      default: () => {
      }
    },
    formLabelWidth: String
  },
  data() {
    return {
      regionData,
      // selectedOptions: [],

      areaCode: ''
    }
  },
  computed: {
    // selectedOptions:{
    //   get() {
    //     // return this.propForm.areaCode ? this.initSelectedOptions(this.propForm.areaCode) : ""
    //     return this.areaCode ? this.initSelectedOptions(this.areaCode) : ""
    //
    //   },
    //   set(value) {
    //     console.log("selectedOptions Set",value)
    //     // this.value = value
    //     const province = codeToText[value[0]]
    //     const city = codeToText[value[1]]
    //     const area = codeToText[value[2]]
    //     console.log(province, city, area)
    //
    //     // this.$emit('updata')
    //   }
    // },

  },
  created() {
    // axios.get('https://files.erp321.com/cdn/expire-1-Y/address/address.json?t=1').then(res => {
    //   console.log(res)
    //   // this.regionData.push(...res.data.data)
    // }).catch(err => console.log(err))
  },

  methods: {
    handleChange(value) {
      console.log(value)
      if (!value ) return;
      this.$emit('cascaderChange', value)

    },
    blurAddressParse() {
      this.selectedOptions = []
      const options = {
        type: 0, // 哪种方式解析，0：正则，1：树查找
        textFilter: [], // 预清洗的字段
        nameMaxLength: 10, // 查找最大的中文名字长度
        extraGovData: {
          city: [{ name: 'name', code: 'code', provinceCode: 'provinceCode' }],
          province: [{ name: 'name', code: 'code' }],
          area: [{ name: 'name', code: 'code', provinceCode: 'provinceCode', cityCode: 'cityCode' }]
        }
      }
// type参数0表示使用正则解析，1表示采用树查找, textFilter地址预清洗过滤字段。
      const parseResult = AddressParse(this.propForm.addressParse, options)
      this.$emit('blurAddressParse', parseResult)
    }
  }

  // reset() {
  //   this.addressForm = {
  //     name: null,
  //     phone: null,
  //     address: null
  //   }
  //   this.resetForm('addressForm')
  // }

}
</script>

<style scoped lang="scss">
.bg-purple-light {
  display: flex;

  .title {
    width: 80px;
    display: flex;
  }

  .input {
    flex: 1;
  }

  ::v-deep .el-textarea__inner {
    height: 214px;
  }

  .el-input--medium {
    .el-input__inner {
      height: 214px;
    }
  }
}
</style>
