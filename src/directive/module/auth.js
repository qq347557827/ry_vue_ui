import Vue from 'vue';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

Vue.directive('auth', {
  mounted (el, binding) {
    el.addEventListener('click', () => {
      const token = Cookies.get('admin-token'); // 从Cookie获取Token

      // 检查Token是否存在
      if (!token) {
        alert('Token不存在，请登录！');
        redirectToLogin();
        return;
      }

      try {
        // 解析Token内容
        const decoded = jwtDecode(token);
        // 检查是否过期（exp是秒级时间戳）
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          alert('登录已过期，请重新登录！');
          redirectToLogin();
        } else {
          // 执行绑定的原方法（如提交表单）
          binding.value();
        }
      } catch (error) {
        // Token解析失败（格式错误或被篡改）
        alert('无效的Token，请重新登录！');
        redirectToLogin();
      }
    });
  }
});

// 跳转登录页
function redirectToLogin () {
  window.location.href = '/login';
}