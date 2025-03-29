import { readFileSync, writeFileSync } from '../fs/fs';

const DEFAULT_EXTRACT_REGEXP = /(?<=class=")([^"=/?).]+?)(?=")/g;
// /(?!class=")(?=tip)([^"]+)/g

/**
 * 提取 Vue 组件的 class
 * @param {obj} params 参数
 * @param {string} params.filePath 源文件地址
 * @param {string} [params.targetFilePath] 输出文件地址
 * @param {Regexp} [params.extractRegexp] 提取正则
 *
 * ```ts
 * extractClass({
 *   filePath: 'xxx.vue',
 * })
 * ```
 */
export function extractClass({
  filePath,
  targetFilePath = './log/extract-class.md',
  extractRegexp = DEFAULT_EXTRACT_REGEXP,
}: {
  filePath: string;
  targetFilePath?: string;
  extractRegexp?: RegExp;
}) {
  const content = readFileSync(filePath);

  let res: Array<string> = [];
  res = Array.from(new Set(content.match(extractRegexp)));

  console.log('[extractClass] res: ', res);

  writeFileSync(targetFilePath, res, true);
}
