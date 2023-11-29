import * as fs from 'fs';
import { transFormRem } from '../rem/rem';


/**
 * 替换文件的 rem 单位，转为 px
 * @param {string} filePath 文件路径
 * @example
 * ```ts
 * remToPxInFile('xxx.vue');
 * ```
 */
export function remToPxInFile(filePath: string) {
  const data = fs.readFileSync(filePath, {
    encoding: 'utf-8',
  });

  const newData = transFormRem(data, 50, 'px');

  fs.writeFileSync(filePath, newData, {
    encoding: 'utf-8',
  });
}
