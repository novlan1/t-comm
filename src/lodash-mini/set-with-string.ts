import { isIndex } from '../validate/is-index';

/**
 * 设置对象深层属性的值（类似 Lodash 的 _.set）
 * @param obj 目标对象
 * @param path 属性路径（字符串或数组，如 'a.b.c' 或 ['a', 'b', 'c']）
 * @param value 要设置的值
 * @returns 修改后的对象
 */
export function setWithString<T extends object>(
  obj: T,
  path: string | Array<string | number>,
  value: any,
): T {
  if (typeof path === 'string') {
    // 将字符串路径转换为数组（处理 'a[0].b' 这类格式）
    path = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  }

  let current: any = obj;
  for (let i = 0; i < path.length; i++) {
    const key = path[i];
    if (i === path.length - 1) {
      // 到达路径末端，直接赋值
      current[key] = value;
    } else {
      // 确保中间路径存在（不存在则创建空对象/数组）
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = isIndex(path[i + 1]) ? [] : {};
      }
      current = current[key];
    }
  }
  return obj;
}
