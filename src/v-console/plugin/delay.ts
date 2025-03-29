import { V_CONSOLE_DOM, V_CONSOLE_NO_DELAY } from '../config';

import type { IPlugin } from '../types';

function getCurrentState() {
  const value =  window.sessionStorage.getItem(V_CONSOLE_NO_DELAY.KEY);
  if (value === V_CONSOLE_NO_DELAY.VALUE) {
    return '已去掉延迟';
  }
  return '默认';
}
export function initLoadDelayPlugin() {
  const plugin = new VConsole.VConsolePlugin('loadDelay', 'vConsole加载延迟');

  const html = `<div class="${V_CONSOLE_DOM.WRAP}">
  <div class="${V_CONSOLE_DOM.LINE}">当前状态：${getCurrentState()}</div>
    </div>`;

  plugin.on('renderTab', (callback: Function) => {
    callback(html);
  });

  const btnList: Array<IPlugin> = [];

  btnList.push({
    name: '去除延迟',
    global: false,
    onClick() {
      sessionStorage.setItem(V_CONSOLE_NO_DELAY.KEY, V_CONSOLE_NO_DELAY.VALUE);
      console.log('已设置去除延迟，即将刷新页面......');
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
  });
  btnList.push({
    name: '恢复延迟',
    global: false,
    onClick() {
      sessionStorage.removeItem(V_CONSOLE_NO_DELAY.KEY);
      console.log('已设置恢复延迟，即将刷新页面......');
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
  });
  btnList.push({
    name: '刷新页面',
    global: false,
    onClick() {
      window.location.reload();
    },
  });
  plugin.on('addTool', (callback: Function) => {
    callback(btnList);
  });
  return plugin;
}
