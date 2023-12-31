export default {
  bind(el, binding, vnode) {
    el.addEventListener('input', function (event) {
      let value = event.target.value;

      // 移除非数字和小数点的字符
      value = value.replace(/[^\d.-]/g, '');

      // 确保小数点后只有两位
      const parts = value.split('.');
      if (parts.length > 1) {
        parts[1] = parts[1].slice(0, 2);
        value = parts.join('.');
      }

      // 确保不为负数
      if (parseFloat(value) < 0) {
        value = '0';
      }

      // 手动触发v-model的更新
      vnode.context.$set(vnode.context, binding.expression, parseFloat(value));
    });
  },
}
