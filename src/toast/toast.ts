
let loadingToastId: any = {};
let toastId: any = {};

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
 * @example
 * ```ts
 * Toast.show('文本', 3000);
 * ```
 */
export const showToast = function (text = '', duration = 2000) {
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
 * @example
 * ```ts
 * Toast.showSuccess('文本', 3000);
 * ```
 */
export const showSuccess = function (text = '', duration = 2000) {
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
 * 显示失败样式 Toast(toast带！样式)
 * @param text  文案
 * @param duration  显示时间，默认2秒
 * @example
 * ```ts
 * Toast.showFail('文本', 3000);
 * ```
 */
export const showFail = function (text = '', duration = 2000) {
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
 * @example
 * ```ts
 * Toast.clear();
 *
 * clearToast();
 * ```
 */
export const clearToast = function () {
  if (toastId.clear) toastId.clear();
};

/**
 * 显示loading Toast
 * @param {string | object} options 配置，传递字符串时候为message
 * @param {string} options.message 内容
 * @param {number} options.duration 展示时长(ms)，值为 0 时，toast 不会消失
 * @param {boolean} options.forbidClick 是否禁止背景点击
 * @param {string} options.selector 自定义选择器
 * @example
 * ```ts
 * Toast.showLoading('文本');
 *
 * Toast.showLoading({
 *   message: '文本',
 *   zIndex: 1000,
 * });
 * ```
 */
export const showLoading = function (options = {}) {
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
 * @example
 * ```ts
 * Toast.dismissLoading();
 * ```
 */
export const dismissLoading = function () {
  if (loadingToastId?.clear) {
    loadingToastId.clear();
    loadingToastId = {};
  }
};

/**
 * Toast 对象
 * @example
 * ```ts
 * Toast.show('文本')
 * ```
 */
export const Toast = {
  show: showToast,
  showToast,

  showSuccess,
  showFail,

  clear: clearToast,
  clearToast,

  showLoading,
  dismissLoading,
};

