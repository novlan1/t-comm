import { get } from '../lodash-mini/get';
import { setWithString } from '../lodash-mini/set-with-string';

type ConfigType = unknown;

let mConfig: ConfigType;


/**
 * 初始化config
 * @param {ConfigType} config
 */
export function initConfig(config: ConfigType) {
  mConfig = config;
}


/**
 * 获取config
 * @param {string} name
 * @return {*}  {*}
 *
 * @example
 * getConfig('login.loginType')
 * getConfig('game')
 */
export function getConfig(name?: string): any {
  if (!mConfig) {
    throw new Error('config need init');
  }
  if (!name) {
    console.warn('[getConfig] 请传入name进行取值，使用setConfig，避免直接赋值');
    return mConfig;
  }
  const value =  get(mConfig, name);
  if (value) return value;
  return value;
}


/**
 * 设置config
 *
 * @param {string} name
 * @param {*} value
 *
 * @example
 * setConfig('login.loginType','WXPC')
 */
export function setConfig(name: string, value: unknown) {
  if (!mConfig) {
    throw new Error('[setConfig] config need init');
  }
  mConfig = setWithString(mConfig, name, value);
}

