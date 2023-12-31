import { listGoods } from '@/api/customer_order_goods/goods'
import { getConfigKey } from '@/api/system/config'
import { getDicts } from '@/api/system/dict/data'

const state = {
  goodsList: [],
  sysPayMethod: [],
  sysExpressCompany: [],
  sysSourceChannel: []
}

const mutations = {
  GET_GOODS: (state, data) => {
    state.goodsList = data
  },
  GET_SYS_PAY_METHOD: (state, data) => {
    state.sysPayMethod = data
  },
  GET_SYS_EXPRESS_COMPANY: (state, data) => {
    state.sysExpressCompany = data
  },
  GET_SYS_SOURCE_CHANNEL: (state, data) => {
    state.sysSourceChannel = data
  }
}

const actions = {
  getGoods({ commit }) {
    console.log('-----------------getGoods')
    listGoods().then(res => {
      const data = res.rows
      commit('GET_GOODS', data)
    }).catch(error => error)
  },
  getSysPayMethod({ commit }) {
    console.log('-----------------getSysPayMethod')
    getDicts('sys_pay_method').then(res => {
      console.log('response:', res)
      const data = res.data
      commit('GET_SYS_PAY_METHOD', data)
    }).catch(error => error)
  },
  getSysExpressCompany({ commit }) {
    console.log('-----------------getSysPayMethod')
    getDicts('sys_express_company').then(res => {
      console.log('response:', res)
      const data = res.data
      commit('GET_SYS_EXPRESS_COMPANY', data)
    }).catch(error => error)
  },
  getSysSourceChannel({ commit }) {
    console.log('-----------------getSysPayMethod')
    getDicts('sys_source_channel').then(res => {
      console.log('response:', res)
      const data = res.data
      commit('GET_SYS_SOURCE_CHANNEL', data)
    }).catch(error => error)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

