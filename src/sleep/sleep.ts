
/**
 * 等待一段时间
 * @func
 * @param {number} ms 毫秒
 * @returns Promise
 * @example
 *
 * async function main() {
 *   await sleep(2000)
 *
 *   // 等待2秒后才会打印
 *   console.log('hello')
 * }
 *
 * main()
 */
export const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

// const numList = Array.from({ length: 10 }, (_, i) => i);
