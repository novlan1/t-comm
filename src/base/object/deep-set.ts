/**
 * 深度赋值
 * @param keyStr 以点拼接的 key，比如 foo.bar
 * @param target 目标对象
 * @param value 目标值
 * @example
 * ```ts
 * const obj = { a: { b: 1 } };
 * deepSet('a.c', obj, 2);
 *
 * console.log(obj);
 * // { a: { b: 1, c: 2 } }
 * ```
 */
export function deepSet(keyStr: string, target: Record<string, any>, value: unknown) {
  keyStr.split('.')
    .reduce((obj, key, index, arr) => {
      if (index === arr.length - 1) {
        obj[key] = value; // 最终赋值
      } else {
        obj[key] = obj[key] || {}; // 保留原有结构
      }
      return obj[key];
    }, target);
}
