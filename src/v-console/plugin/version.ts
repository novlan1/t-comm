import {

  AEGIS_PERFORMANCE_KEY,
  AEGIS_PERFORMANCE_LIST,
  BUILD_LIST,
  BUILD_NAME_MAP,
  COMMIT_LIST,
  EMPTY_LINE,
  V_CONSOLE_DOM,
} from '../config';

import type { IPlugin } from '../types';


type IOriginPerformance = typeof performance;

interface IPerformance extends IOriginPerformance {
  wx: any;
}

let inputValue: string;

function updateInputValue(event: any) {
  inputValue = event?.target?.value || '';
}

function jumpToUrl() {
  if (!inputValue) return;
  location.href = inputValue;
}

function goBack() {
  history.go(-1);
  window.vConsole?.hide?.();
}

function renderPlugin(callback: Function) {
  const parseNumber = (num: string | number) => +(+num).toFixed(2);
  let html = `<div class="${V_CONSOLE_DOM.WRAP}">`;

  html += getPerformanceInfo()
    .map((item) => {
      const { label, value } = item;
      return `<div class="${V_CONSOLE_DOM.LINE}">${label}：${parseNumber(value)}ms </div>`;
    })
    .concat(EMPTY_LINE)
    .concat(getVersionHtml())
    .concat(EMPTY_LINE)
    .concat(getAegisPerformanceInfo())
    .join('\n');

  html += `
<textarea id="${V_CONSOLE_DOM.URL_INPUT_ID}" type="text" placeholder="请输入跳转路径"></textarea>
<button id="${V_CONSOLE_DOM.URL_JUMP_BUTTON}">跳转</button>
<button id="${V_CONSOLE_DOM.GO_BACK_BUTTON}">返回上一页</button>
  `;

  html += '</div>';

  callback(html);
}


export function initVersionPlugin() {
  const plugin = new VConsole.VConsolePlugin(V_CONSOLE_DOM.PLUGIN_VERSION_NAME, '其他信息');
  const callback = function (html: string) {
    const dom = document.getElementById(`${V_CONSOLE_DOM.PLUGIN_NAME_PREFIX}${V_CONSOLE_DOM.PLUGIN_VERSION_NAME}`);

    if (dom) {
      dom.innerHTML = html;
    }
  };

  plugin.on('renderTab', (callback: Function) => {
    renderPlugin(callback);
  });
  plugin.on('showConsole', () => {
    renderPlugin(callback);
  });
  plugin.on('show', () => {
    renderPlugin(callback);
  });

  const btnList: Array<IPlugin> = [];
  btnList.push({
    name: '隐藏vConsole',
    global: false,
    onClick() {
      window.vConsole?.destroy();
    },
  });

  plugin.on('addTool', (callback: Function) => {
    callback(btnList);
  });

  plugin.on('show', () => {
    document.getElementById(V_CONSOLE_DOM.URL_INPUT_ID)
      ?.addEventListener('input', updateInputValue);
    document.getElementById(V_CONSOLE_DOM.URL_JUMP_BUTTON)
      ?.addEventListener('click', jumpToUrl);
    document.getElementById(V_CONSOLE_DOM.GO_BACK_BUTTON)
      ?.addEventListener('click', goBack);
  });

  plugin.on('hide', () => {
    document.getElementById(V_CONSOLE_DOM.URL_INPUT_ID)
      ?.removeEventListener('input', updateInputValue);
    document.getElementById(V_CONSOLE_DOM.URL_JUMP_BUTTON)
      ?.removeEventListener('click', jumpToUrl);

    document.getElementById(V_CONSOLE_DOM.GO_BACK_BUTTON)
      ?.addEventListener('click', goBack);
  });

  return plugin;
}


function getPerformanceInfo() {
  const timing = performance.timing || {};
  const timeOrigin = ((performance as IPerformance)?.wx?.timeOrigin) || timing.fetchStart;

  const dnsTime = timing.domainLookupEnd - timing.domainLookupStart;
  const tcpTime = timing.connectEnd - timing.connectStart;
  const backendTime = timing.responseStart - timing.requestStart;
  const respTime = timing.responseEnd - timing.responseStart;
  const domTime = timing.domContentLoadedEventStart - timing.responseEnd;
  const firstRenderTime = timing.domLoading - timeOrigin;
  const wholePageTime = timing.loadEventEnd - timeOrigin;
  const parseDomTime = timing.domComplete - timing.domInteractive;

  const list = [
    {
      value: dnsTime,
      label: 'DNS连接耗时',
    },
    {
      value: tcpTime,
      label: 'TCP连接耗时',
    },
    {
      value: backendTime,
      label: '后端响应时间',
    },
    {
      value: respTime,
      label: 'HTML页面下载时间',
    },
    {
      value: domTime,
      label: 'DOM时间',
    },
    {
      value: parseDomTime,
      label: '解析DOM树耗时',
    },
    {
      value: firstRenderTime,
      label: '首次加载耗时',
    },
    {
      value: wholePageTime,
      label: '整页耗时',
    },
  ];
  return list;
}

function getVersionHtml() {
  const buildInfo = (window[BUILD_NAME_MAP.build as any] || {}) as any;
  const commitInfo = (window[BUILD_NAME_MAP.commit as any] || {}) as any;

  const buildHtmlList = BUILD_LIST.map((item) => {
    const { key, label } = item;
    return `<div class="${V_CONSOLE_DOM.LINE}">${label}: ${buildInfo[key] || ''}</div>`;
  });
  const commitHtmlList = COMMIT_LIST.map((item) => {
    const { key, label } = item;
    return `<div class="${V_CONSOLE_DOM.LINE}">${label}: ${commitInfo[key] || ''}</div>`;
  });


  return [
    ...buildHtmlList,
    EMPTY_LINE,
    ...commitHtmlList,
    EMPTY_LINE,
    EMPTY_LINE,
  ].join('\n');
}


function getAegisPerformanceInfo() {
  const perfInfo = (window[AEGIS_PERFORMANCE_KEY as any] || {}) as any;

  const perfHtmlList = AEGIS_PERFORMANCE_LIST.map((item) => {
    const { key, label } = item;
    return `<div class="${V_CONSOLE_DOM.LINE}">${label}: ${perfInfo[key] ?? ''}</div>`;
  });


  return [
    EMPTY_LINE,
    ...perfHtmlList,
    EMPTY_LINE,
  ].join('\n');
}
