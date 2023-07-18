import { loadJS } from '../loader/loader';
import {
  BUILD_NAME_MAP,
  LINE_STYLE,
  EMPTY_LINE,
  V_CONSOLE_URL,
} from './config';

interface IPlugin {
  name: string;
  global: boolean;
  onClick: Function
}

type IOriginPerformance = typeof performance;
interface IPerformance extends IOriginPerformance {
  wx: any;
}

let vConsole: any;


export function loadVConsole() {
  if (typeof window.VConsole === 'undefined') {
    loadJS(V_CONSOLE_URL).then(() => {
      initVConsole();
    });
  } else {
    initVConsole();
  }
}


function initVConsole() {
  vConsole = new VConsole({
  });
  vConsole.addPlugin(initOtherInfoPlugin());
}

const buildList = [
  {
    key: 'time',
    label: 'Build Time',
  },
  {
    key: 'author',
    label: 'Build Author',
  },
  {
    key: 'branch',
    label: 'Build Branch',
  },
  {
    key: 'netEnv',
    label: 'Build Net Env',
  },
];

const commitList = [
  {
    key: 'message',
    label: 'Last Commit Message',
  },
  {
    key: 'author',
    label: 'Last Commit Author',
  },
  {
    key: 'date',
    label: 'Last Commit Time',
  },
  {
    key: 'message',
    label: 'Last Commit Hash',
  },
];

function getVersionHtml() {
  const buildInfo = (window[BUILD_NAME_MAP.build as any] || {}) as any;
  const commitInfo = (window[BUILD_NAME_MAP.commit as any] || {}) as any;

  const buildHtmlList = buildList.map((item) => {
    const { key, label } = item;
    return `<div ${LINE_STYLE}>${label}: ${buildInfo[key] || ''}</div>`;
  });
  const commitHtmlList = commitList.map((item) => {
    const { key, label } = item;
    return `<div ${LINE_STYLE}>${label}: ${commitInfo[key] || ''}</div>`;
  });


  return [
    ...buildHtmlList,
    EMPTY_LINE,
    ...commitHtmlList,
    EMPTY_LINE,
    EMPTY_LINE,
  ].join('\n');
}


function initOtherInfoPlugin() {
  const plugin = new VConsole.VConsolePlugin('otherInfo', '其他信息');
  const parseNumber = (num: string | number) => +(+num).toFixed(2);

  plugin.on('renderTab', (callback: Function) => {
    const html = getPerformanceInfo()
      .map((item) => {
        const { label, value } = item;
        return `<div ${LINE_STYLE}>${label}：${parseNumber(value)}ms </div>`;
      })
      .concat(EMPTY_LINE)
      .concat(getVersionHtml())
      .join('\n');

    callback(html);
  });


  const btnList: Array<IPlugin> = [];
  btnList.push({
    name: '隐藏vConsole',
    global: false,
    onClick() {
      vConsole.destroy();
    },
  });

  plugin.on('addTool', (callback: Function) => {
    callback(btnList);
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
