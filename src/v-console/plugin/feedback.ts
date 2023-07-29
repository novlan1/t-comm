import { clipboardWeb } from '../../clipboard/clipboard-web';
import { V_CONSOLE_DOM } from '../config';
import type { IPlugin } from '../types';


function copyInfo(text: string) {
  clipboardWeb(text).then(() => {
    alert('已复制，开去粘贴吧～');
  })
    .catch(() => {
      alert('当前环境暂不支持复制，请长按选择复制～');
    });
}

export function initFeedbackPlugin(uid = '') {
  const loginPlugin = new VConsole.VConsolePlugin('feedback', '反馈');

  loginPlugin.on('init', () => {
    // this.list = [];
  });
  const url = window.location.href;
  const UA = navigator.userAgent;
  const { cookie } = document;

  const html = `<div class="${V_CONSOLE_DOM.WRAP}">
<div class="${V_CONSOLE_DOM.LINE}">url：${url}</div>
<div class="${V_CONSOLE_DOM.LINE}">uid：${uid}</div>
<div class="${V_CONSOLE_DOM.LINE}">ua：${UA}</div>
<div class="${V_CONSOLE_DOM.LINE}">cookie：${cookie}</div>
  </div>
  `;

  loginPlugin.on('renderTab', (callback: any) => {
    callback(html);
  });

  const btnList: Array<IPlugin> = [];
  btnList.push({
    name: '复制用户信息',
    global: false,
    onClick() {
      const userInfo = { url, uid, UA, cookie };
      copyInfo(JSON.stringify(userInfo));
    },
  });
  loginPlugin.on('addTool', (callback: Function) => {
    callback(btnList);
  });

  return loginPlugin;
}
