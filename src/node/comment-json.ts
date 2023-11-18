import * as fs from 'fs';

/**
 * 解析带注释的 json 文件
 * @param content 原始文件内容
 * @returns json数据
 */
export function parseCommentJson(content) {
  const newContent = content.replace(/(?:\s+|^)\/\/[^\n]*/g, '');
  // console.log('[newContent]', newContent);

  let json: Record<string, any> = {};
  try {
    json = JSON.parse(newContent);
  } catch (err) {

  }
  return json;
}

/**
 * 获取带注释的 json 文件内容
 * @param file 文件路径
 * @returns json数据
 */
export function readCommentJson(file) {
  const content = fs.readFileSync(file, {
    encoding: 'utf-8',
  });
  return parseCommentJson(content);
}
