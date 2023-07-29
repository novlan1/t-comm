import { V_CONSOLE_DOM } from '../config';
import { dateFormat } from '../../time/time';

export function initVersionSimplePlugin() {
  const plugin = new VConsole.VConsolePlugin('simpleVersion', '版本信息');

  // 先加载version.js，种上IGameVersion对象
  plugin.on('renderTab', (callback: any) => {
    // @ts-ignore
    const info = window.igameVersion;
    let innerHtml = '';

    if (info?.version) {
      const time = `${dateFormat(new Date(+info.version), 'yyyy-MM-dd hh:mm:ss')}`;

      innerHtml = `
      <div class="${V_CONSOLE_DOM.LINE}">构建时间：${time || ''}</div>
      <div class="${V_CONSOLE_DOM.LINE}">构建作者：${info.author || ''}</div>
      `;
    } else {
      innerHtml = ` <div class="${V_CONSOLE_DOM.LINE}">无构建信息</div>`;
    }

    callback(`<div class="${V_CONSOLE_DOM.WRAP}">${innerHtml}</div>`);
  });
  return plugin;
}
