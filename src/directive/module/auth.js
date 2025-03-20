// src/directives/permission/auth.js
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

// 跳转登录页函数
const redirectToLogin = () => {
  window.location.href = '/login';
};

// 定义指令逻辑
const auth = {
  mounted (el, binding) {
    el.addEventListener('click', (event) => {
      event.preventDefault(); // 阻止默认行为
      console.log("token");

      const token = Cookies.get('admin-token'); // 从Cookie获取Token

      // 检查Token是否存在
      if (!token) {
        alert('Token不存在，请登录！');
        // redirectToLogin();
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          alert('登录已过期，请重新登录！');
          // redirectToLogin();
        } else {
          binding.value(); // 执行绑定的原方法
        }
      } catch (error) {
        alert('无效的Token，请重新登录！');
        // redirectToLogin();
      }
    });
  }
};

export default auth;