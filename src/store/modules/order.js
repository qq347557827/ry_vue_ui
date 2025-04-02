import { listGoods } from '@/api/customer_order_goods/goods'
import { getConfigKey } from '@/api/system/config'
import { getDicts } from '@/api/system/dict/data'
import { getAccessToken } from '../../api/customer_order_goods/order'

const state = {
  goodsList: [],
  sysPayMethod: [],
  sysExpressCompany: [],
  sysSourceChannel: [],
  sfAccessToken: null,          // 存储accessToken
  expireTime: 0,        // Token过期时间戳（毫秒）
  isRefreshing: false   // 防止重复请求的锁
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
  },
  SET_TOKEN(state, { token, expiresIn }) {
    state.token = token;
    // 顺丰返回 expiresIn 单位为秒，转换为毫秒计算
    state.expireTime = Date.now() + expiresIn * 1000 - 300000; // 提前5分钟刷新
  },
  SET_REFRESHING(state, status) {
    state.isRefreshing = status;
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
  },
  async getSfToken({ commit, state, dispatch }) {
    // 有效期内直接返回缓存
    if (state.token && Date.now() < state.expireTime) {
      return state.token;
    }

    // 防止重复请求
    if (state.isRefreshing) {
      return new Promise(resolve => {
        const timer = setInterval(() => {
          if (!state.isRefreshing) {
            clearInterval(timer);
            resolve(state.token);
          }
        }, 200);
      });
    }

    commit('SET_REFRESHING', true);

    try {
      const response = await getAccessToken();

      // 解析嵌套的 msg 字段
      const result = JSON.parse(response.msg);

      // 验证顺丰业务状态码
      if (result.apiResultCode !== 'A1000') {
        throw new Error(`[${result.apiResultCode}] ${result.apiErrorMsg}`);
      }

      commit('SET_TOKEN', {
        token: result.accessToken,
        expiresIn: result.expiresIn // 7199 秒
      });

      return result.accessToken;
    } catch (error) {
      console.error('Token获取失败:', error);
      throw new Error(`认证失败: ${error.message}`);
    } finally {
      commit('SET_REFRESHING', false);
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

