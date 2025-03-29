import { V_CONSOLE_DOM } from '../config';

import type { IPlugin } from '../types';

export function initMsdkPlugin() {
  const plugin = new VConsole.VConsolePlugin('msdk', 'msdk工具');

  const html = `<div class="${V_CONSOLE_DOM.WRAP}">
  <div class="${V_CONSOLE_DOM.LINE}">msdk工具</div>
  </div>`;

  plugin.on('renderTab', (callback: Function) => {
    callback(html);
  });
  const btnList: Array<IPlugin> = [];
  btnList.push({
    name: '关闭页面',
    global: false,
    onClick() {
      // @ts-ignore
      window?.app?.closeWebView?.();
    },
  });

  plugin.on('addTool', (callback: Function) => {
    callback(btnList);
  });
  return plugin;
}
