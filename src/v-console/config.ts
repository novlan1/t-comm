export const BUILD_NAME_MAP = {
  build: '_vConsoleBuildInfo',
  commit: '_vConsoleCommitInfo',
} as const;

export const V_CONSOLE_DOM = {
  LINE: 'line',
  WRAP: 'v-console-custom-tab',
  URL_INPUT_ID: 'vConsolePluginInput',
  URL_JUMP_BUTTON: 'vConsolePluginUrlJumpButton',
  GO_BACK_BUTTON: 'vConsolePluginGoBackButton',

  PLUGIN_NAME_PREFIX: '__vc_plug_',
  // 需要小写，作为插件 id
  PLUGIN_VERSION_NAME: 'version_performance',
  PLUGIN_SIMPLE_VERSION_NAME: 'simple_version',
} as const;

export const EMPTY_LINE = `<div class="${V_CONSOLE_DOM.LINE}"> </div>`;
export const V_CONSOLE_NO_DELAY = {
  KEY: 'vConsole_no_delay',
  VALUE: '1',
} as const;

export const V_CONSOLE_URL = 'https://image-1251917893.file.myqcloud.com/igame/npm/vconsole%403.15.1/vconsole.min.js';
export const V_CONSOLE_STYLE_CONTENT = `
.${V_CONSOLE_DOM.WRAP} {
  padding: 12px 16px 30px;
  user-select: auto;
}

.${V_CONSOLE_DOM.WRAP} .${V_CONSOLE_DOM.LINE} {
  line-height: 20px;
  padding: 5px 0;
  color: var(--VC-PURPLE, #6467f0);
  word-break: break-all;
  user-select: auto;
}

.${V_CONSOLE_DOM.WRAP} textarea {
  display: block;
  width: 100%;
  min-width: 0;
  padding: 0;
  color: #323233;
  line-height: inherit;
  text-align: left;
  background-color: transparent;
  resize: none;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin-bottom: 10px;
  height: 60px;
  padding: 4px;
  line-height: 16px;
  font-size: 13px;
  user-select: auto;
}

.${V_CONSOLE_DOM.WRAP} textarea:focus {
  outline: none;
}

.${V_CONSOLE_DOM.WRAP} button {
  height: 30px;
  line-height: 1.2;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
  color: #fff;
  background-color: #07c160;
  border: 1px solid #07c160;
  font-size: 14px;
  padding: 0 12px;
  margin-right: 10px;
}

.vc-cmd,
.vc-cmd-input {
  user-select: auto !important;
}

#${V_CONSOLE_DOM.URL_INPUT_ID} {
  user-select: auto !important;
}
`;

export const DEBUG_CGI_ENV = {
  KEY: 'tip_debug_cgi_env',
  PROD: 'prod',
  TEST: 'test',
};

export const BUILD_LIST = [
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

export const COMMIT_LIST = [
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
    key: 'hash',
    label: 'Last Commit Hash',
  },
];


export const AEGIS_PERFORMANCE_KEY = '__AEGIS_PERFORMANCE';
export const AEGIS_PERFORMANCE_LIST = [
  {
    key: 'dnsLookup',
    label: 'Aegis DNS 查询',
  },
  {
    key: 'tcp',
    label: 'Aegis TCP 链接',
  },
  {
    key: 'ttfb',
    label: 'Aegis SSL 建连',
  },
  {
    key: 'contentDownload',
    label: 'Aegis contentDownload',
  },
  {
    key: 'resourceDownload',
    label: 'Aegis resourceDownload',
  },
  {
    key: 'domParse',
    label: 'Aegis DOM解析',
  },
  {
    key: 'firstScreenTiming',
    label: 'Aegis 首屏耗时',
  },
];
