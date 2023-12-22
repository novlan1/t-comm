import { transFormRem } from '../rem/rem';
import { writeFileSync, readFileSync } from '../fs/fs';

/**
 * 替换文件的 rem 单位，转为 px
 * @param {string} filePath 文件路径
 * @example
 * ```ts
 * remToPxInFile('xxx.vue');
 * ```
 */
export function remToPxInFile(filePath: string) {
  const data = readFileSync(filePath);

  const newData = transFormRem(data, 50, 'px');

  writeFileSync(filePath, newData);
}
