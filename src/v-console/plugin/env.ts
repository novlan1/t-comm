import type { IPlugin } from '../types';
import { DEBUG_CGI_ENV, V_CONSOLE_DOM } from '../config';

function getCurrentEnv() {
  const value =  window.sessionStorage.getItem(DEBUG_CGI_ENV.KEY);
  console.log('value', value);
  if (value === DEBUG_CGI_ENV.PROD) {
    return '正式';
  }
  if (value === DEBUG_CGI_ENV.TEST) {
    return '测试';
  }
  return '默认';
}

export function initSwitchEnvPlugin() {
  const tipPlugin = new VConsole.VConsolePlugin('switchEnv', '切换环境');

  const currentEnv = getCurrentEnv();
  const html = `<div class="${V_CONSOLE_DOM.WRAP}">
<div class="${V_CONSOLE_DOM.LINE}">当前环境：${currentEnv}</div>
  </div>`;
  tipPlugin.on('renderTab', (callback: Function) => {
    callback(html);
  });

  tipPlugin.on('addTool', (callback: Function) => {
    const toolList: Array<IPlugin> = [];

    toolList.push({
      name: '测试环境',
      global: false,
      onClick() {
        console.log('已切换为测试CGI，即将刷新页面......');
        window.sessionStorage.setItem(DEBUG_CGI_ENV.KEY, DEBUG_CGI_ENV.TEST);
        setTimeout(() => {
          location.reload();
        }, 1000);
      },
    });

    toolList.push({
      name: '现网环境',
      global: false,
      onClick() {
        console.log('已切换为正式CGI，即将刷新页面......');
        window.sessionStorage.setItem(DEBUG_CGI_ENV.KEY, DEBUG_CGI_ENV.PROD);
        setTimeout(() => {
          location.reload();
        }, 1000);
      },
    });
    callback(toolList);
  });
  return tipPlugin;
}
