// src/utils/authUtils.js
import { jwtDecode } from 'jwt-decode';
import { modal } from '../plugins/modal'; // 引入封装的模态框工具
import { getToken } from './auth';

export const checkAuth = (vm, options = {}) => {
  const {
    silent = false,
    redirect = true
  } = options;

  const token = getToken()
  console.log(token);
  console.log("🚀 ~ file:authUtils method:checkAuth line:15 -----", vm)

  if (!token) {
    !silent && vm.$modal.msgError('Token不存在，请登录！'); // 替换为统一错误提示
    redirect && (window.location.href = '/login');
    return false;
  }
  const decoded = jwtDecode(token);
  console.log("🚀 ~ file:authUtils method:checkAuth line:24 -----", decoded)

  try {
    const decoded = jwtDecode(token);
    console.log("🚀 ~ file:authUtils method:checkAuth line:24 -----", decoded)

    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      !silent && vm.$modal.msgError('登录已过期，请重新登录！');
      redirect && (window.location.href = '/login');
      return false;
    }
    return true;
  } catch (error) {
    !silent && vm.$modal.msgError('无效的Token，请重新登录！');
    redirect && (window.location.href = '/login');
    return false;
  }
};
