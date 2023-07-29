import type { IPlugin } from '../types';

export function initMsdkPlugin() {
  const plugin = new VConsole.VConsolePlugin('msdk', 'msdk工具');
  const content = 'msdk工具';

  plugin.on('renderTab', (callback: Function) => {
    callback(content);
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
