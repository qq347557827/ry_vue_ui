// src/utils/authUtils.js
import jwtDecode from 'jwt-decode';
import { modal } from '../plugins/modal'; // 引入封装的模态框工具
import { getToken } from './auth';

export const checkAuth = (options = {}) => {
  const {
    silent = false,
    redirect = true
  } = options;

  const token = getToken()
  console.log(token);


  if (!token) {
    !silent && modal.alertError('Token不存在，请登录！'); // 替换为统一错误提示
    redirect && (window.location.href = '/login');
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      !silent && modal.alertError('登录已过期，请重新登录！');
      redirect && (window.location.href = '/login');
      return false;
    }
    return true;
  } catch (error) {
    !silent && modal.alertError('无效的Token，请重新登录！');
    redirect && (window.location.href = '/login');
    return false;
  }
};