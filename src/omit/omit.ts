/**
 * 去掉对象中的某些属性
 * @param {any} obj 对象
 * @param {Array<string>} fields 要去除的属性列表
 * @returns 处理后的对象
 * @example
 * ```ts
 * omit({ a: 1, b: 2, c: 3 }, ['a'])
 * // { b: 2, c: 3 }
 * ```
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  fields: K[] | readonly K[],
): Omit<T, K> {
  const clone = Object.assign({}, obj);

  if (Array.isArray(fields)) {
    fields.forEach((key) => {
      delete clone[key];
    });
  }

  return clone;
}
