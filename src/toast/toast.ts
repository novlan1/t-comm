
let loadingToastId: any = {};
let toastId: any = {};
const mToast: {[key: string]: Function} = {};

let toastComp: any;


function getToast() {
  return new Promise((resolve) => {
    if (toastComp) {
      resolve(toastComp);
      return;
    }
    Promise.all([
      import('press-ui/press-toast/index'),
    ]).then((comp) => {
      toastComp = comp?.[0]?.default;
      resolve(toastComp);
    });
  });
}

/**
 * 显示普通Toast
 * @param text  文案
 * @param duration  显示时间，默认2秒
 */
mToast.show = function (text = '', duration = 2000) {
  getToast().then(() => {
    if (loadingToastId?.clear) {
      setTimeout(() => {
        toastId = toastComp({ message: text, zIndex: 10000, duration });
      }, 100);
    } else {
      toastId = toastComp({ message: text, zIndex: 10000, duration });
    }
  });
};

/**
 * 显示成功样式Toast（toast带√样式）
 * @param text  文案
 * @param duration  显示时间，默认2秒
 */
mToast.showSuccess = function (text = '', duration = 2000) {
  getToast().then(() => {
    if (loadingToastId?.clear) {
      setTimeout(() => {
        toastId = toastComp.success({ message: text, zIndex: 10000, duration });
      }, 100);
    } else {
      toastId = toastComp.success({ message: text, zIndex: 10000, duration });
    }
  });
};

/**
 * 显示失败样式Taost(toast带！样式)
 * @param text  文案
 * @param duration  显示时间，默认2秒
 */
mToast.showFail = function (text = '', duration = 2000) {
  getToast().then(() => {
    if (loadingToastId?.clear) {
      setTimeout(() => {
        toastId = toastComp.fail({ message: text, zIndex: 10000, duration });
      }, 100);
    } else {
      toastId = toastComp.fail({ message: text, zIndex: 10000, duration });
    }
  });
};

/**
 * 清除（隐藏）上一个toast
 */
mToast.clear = function () {
  if (toastId.clear) toastId.clear();
};

/**
 * 显示loading Toast
 * @function
 * @name showLoading-web
 * @param {string | object} options 配置，传递字符串时候为message
 * @param {string} options.message 内容
 * @param {number} options.duration 展示时长(ms)，值为 0 时，toast 不会消失
 * @param {boolean} options.forbidClick 是否禁止背景点击
 * @param {string} options.selector 自定义选择器
 */
mToast.showLoading = function (options = {}) {
  getToast().then(() => {
    if (loadingToastId?.clear) {
      loadingToastId.clear();
      loadingToastId = {};
    }
    if (typeof options === 'string') {
      loadingToastId = toastComp.loading({ message: options, duration: 0, zIndex: 10000 });
    } else {
      loadingToastId = toastComp.loading(options);
    }
  });
};

/**
 * 隐藏loading toast
 */
mToast.dismissLoading = function () {
  if (loadingToastId?.clear) {
    loadingToastId.clear();
    loadingToastId = {};
  }
};


export { mToast as Toast };
