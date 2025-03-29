/**
 * 加了 try-catch 的 JSON.parse
 * @param data 传入数据
 * @param defaultValue 默认值，不传则为 空对象
 * @returns 解析后的数据
 *
 * @example
 *
 * ```ts
 * safeJsonParse(data)
 *
 * safeJsonParse(data, {})
 *
 * safeJsonParse(data, [])
 * ```
 */
export function safeJsonParse(data: string, defaultValue = {}) {
  let result = defaultValue;

  try {
    result = JSON.parse(data);
  } catch (e) {}
  return result;
}
