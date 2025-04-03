// src/utils/sf-print.js
let isInitialized = false;
import SCPPrint from "../plugins/SCPPrint"

export const initSfPrint = () => {
  // ✅ 正确初始化方式
  const sfPrinter = new SCPPrint({
    partnerID: 'YNR1URDE',
    env: 'sbox', // 生产环境
    notips: false, // 关闭 SDK 默认提示
    callback: (result) => {
      console.log(result.getPrint)
      if (result.code === 2 || result.code === 3) {
        console.error('需安装或升级插件:', result.downloadUrl);
      }
    }
  });

  // 将实例挂载到全局或 Vue 原型
  window.sfPrinter = sfPrinter;
  return sfPrinter;
};
// src/utils/sf-print.js
export const printWaybill = async (params) => {
  const { accessToken, templateCode, waybillNo } = params;

  // 构造请求数据（单票示例）
  const requestData = {
    requestID: `PRINT_${Date.now()}`,
    accessToken,
    templateCode,
    documents: [
      {
        masterWaybillNo: waybillNo, // 注意字段名正确性
        seq: "1",                   // 单票默认1
        sum: "1"                    // 单票总数1
      }
    ],
    version: "2.0"
  };

  return new Promise((resolve, reject) => {
    SCPPrint.print(requestData, (result) => {
      if (result.code === 1) {
        resolve({ success: true });
      } else {
        reject({
          code: result.code,
          message: this.parseErrorCode(result.code),
          downloadUrl: result.downloadUrl
        });
      }
    });
  });
};

// 错误码解析
const parseErrorCode = (code) => {
  const errorMap = {
    2: '请安装顺丰打印插件',
    3: '打印插件需要升级',
    11: '网络故障，请重试',
    15: '预览未执行打印'
  };
  return errorMap[code] || `打印失败，错误码：${code}`;
};
