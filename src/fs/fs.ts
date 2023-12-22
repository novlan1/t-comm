import * as fs from 'fs';


/**
 * 写入文件
 * @param {string} file 文件地址
 * @param {any} data 文件数据
 * @param {boolean} [isJson] 是否需要 json 序列化
 * @example
 * ```ts
 * writeFileSync('a', 'b.txt', false);
 *
 * writeFileSync({ a: 1 }, 'b.json', true);
 * ```
 */
export function writeFileSync(file: string, data: any, isJson = false) {
  const fileData = isJson ? JSON.stringify(data, null, 2) : data;

  fs.writeFileSync(file, fileData, {
    encoding: 'utf-8',
  });
}


/**
 * 读取文件
 * @param {string} file 文件地址
 * @param {boolean} [isJson] 是否需要 json 反序列化
 * @returns {any} 文件内容
 * @example
 * ```ts
 * readFileSync('b.txt', false);
 *
 * readFileSync('b.json', true);
 * ```
 */
export function readFileSync(file: string, isJson = false) {
  const content = fs.readFileSync(file, {
    encoding: 'utf-8',
  });

  let result: any = content;
  if (isJson) {
    try {
      result = JSON.parse(content);
    } catch (e) {}
  }

  return result;
}
