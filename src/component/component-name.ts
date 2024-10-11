import { hyphenate } from '../base/string/string';


/**
 * 获取组件全称
 * @param name 组件名称
 * @param prefix 前缀
 * @returns 全称
 * @example
 * ```ts
 * getFullCompName('swiper-item', 'press-')
 * getFullCompName('press-swiper-item', 'press-')
 *
 * // press-swiper-item
 * ```
 */
export function getFullCompName(name = '', prefix = '') {
  name = hyphenate(name);
  if (!name.startsWith(prefix)) {
    return `${prefix}${name}`;
  }
  return name;
}


/**
 * 获取组件简称
 * @param name 组件名称
 * @param prefix 前缀
 * @returns 简称
 * ```ts
 * getPureCompName('press-swiper-item', 'press-')
 * getPureCompName('swiper-item', 'press-')
 *
 * //swiper-item
 * ```
 */
export function getPureCompName(name = '', prefix = '') {
  name = hyphenate(name);
  return name.replace(new RegExp(`^${prefix}`), '');
}


