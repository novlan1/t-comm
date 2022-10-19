export const ENV_UA_MAP = {
  isMsdk: ' msdk/',
  isSlugSdk: 'ingame',
  isWeixin: 'micromessenger',
  isQQ: ' qq/',
  isGHelper: 'gamehelper',
  isPvpApp: ' igameapp/',
  isTipApp: ' gamelife/',
  isIOS: 'iphone',
  isIos: 'iphone',
  isAndroid: 'android',
};

export const defineProperty = (objName: string, key: string, value = '') => {
  Object.defineProperty(window, objName, {
    value: {
      [key]: value,
    },
    writable: true,
    configurable: true,
  });
};

export function mockUserAgent(ua: string) {
  defineProperty('navigator', 'userAgent', ua);
}

export function mockQQUserAgent() {
  mockUserAgent(ENV_UA_MAP.isQQ);
}

export function mockWXUserAgent() {
  mockUserAgent(ENV_UA_MAP.isWeixin);
}
