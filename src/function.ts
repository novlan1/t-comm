/**
 * 将字符串转为函数
 * @param func
 * @returns
 *
 * @example
 *
 * ```ts
 * parseFunction('()=>console.log(1)') // ()=>console.log(1)
 * ```
 */
export const parseFunction = func => {
  if (typeof func !== 'string') return func
  let data = ''
  try {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    data = new Function('', `return ${func}`)()
  } catch (e) {
    console.error('解析失败', e)
  }
  return data
}
