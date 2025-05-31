/* eslint-disable @typescript-eslint/no-require-imports */


export function getJsonFromSheet(dataPath: string) {
  const xlsx = require('xlsx');
  const { readFileSync } = require('fs');

  const excelBuffer = readFileSync(dataPath, {
    encoding: 'utf-8',
  });

  // 解析数据
  const result = xlsx.read(excelBuffer, {
    type: 'binary',
    cellHTML: false,
  });

  return xlsx.utils.sheet_to_json(result.Sheets.Sheet1);
}


/**
 * excel 转 json
 * @param {object} params 参数
 * @returns jsonData
 * @example
 *
 * const options = {
 *   header: ['id', 'name', 'age'], // 可选：自定义表头
 *   range: 1,                      // 可选：跳过第一行（标题行）
 *   defval: null,                  // 可选：空单元格的默认值
 *   raw: false,                    // 可选：是否保留原始数据格式
 * };
 *
 * excelToJson({
 *   filePath: CONFIG.xlsxPath,
 *   sheetIndex: 1,
 *   options,
 * });
 *
 * // [
 * //   { id: 1, name: '2', age: '3' },
 * //   { id: 1, name: '2', age: '3' }
 * // ];
 *
 */
export function excelToJson({
  filePath,
  sheetIndex = 0,
  options = {},
}: {
  filePath: string;
  sheetIndex?: number;
  options?: Record<string, any>;
}) {
  const xlsx = require('xlsx');
  // 读取 Excel 文件
  const workbook = xlsx.readFile(filePath);

  // 获取第一个工作表名
  const sheetName = workbook.SheetNames[sheetIndex];

  // 获取工作表
  const worksheet = workbook.Sheets[sheetName];

  // 转换为 JSON
  const jsonData = xlsx.utils.sheet_to_json(worksheet, options);

  return jsonData;
}


/**
 * json 转 excel
 * @param {object} params 参数
 * @example { workbook, worksheet }
 *
 * const jsonData = [
 *   { id: 1, name: '2', age: '3' },
 *   { id: 1, name: '2', age: '3' },
 * ];
 *
 * jsonToExcel({
 *   jsonData,
 *   outputPath: CONFIG.outputFilePath,
 *   options: {
 *     header: ['id', 'name', 'age'],  // 可选：自定义表头顺序
 *     skipHeader: false,              // 可选：是否跳过表头行
 *   },
 *   sheetName: 'addedData',
 * });
 */
export function jsonToExcel({
  jsonData,
  outputPath,
  options = {},
  sheetName = 'Sheet1',
  overwrite = true,
}: {
  jsonData: Array<Record<string, string>>;
  outputPath: string;
  options?: Record<string, any>;
  sheetName?: string;
  overwrite?: boolean;
}) {
  const xlsx = require('xlsx');
  const fs = require('fs');

  let workbook;
  if (fs.existsSync(outputPath)) {
    workbook = xlsx.readFile(outputPath);
  } else {
    workbook = xlsx.utils.book_new();
  }

  // 创建工作表
  const worksheet = xlsx.utils.json_to_sheet(jsonData, options);

  if (workbook.SheetNames.includes(sheetName)) {
    if (overwrite) {
      // 删除现有sheet
      const sheetIndex = workbook.SheetNames.indexOf(sheetName);
      workbook.SheetNames.splice(sheetIndex, 1);
      delete workbook.Sheets[sheetName];
    } else {
      throw new Error(`工作表 "${sheetName}" 已存在`);
    }
  }

  xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);

  // 写入文件
  xlsx.writeFile(workbook, outputPath, {
    bookType: 'xlsx', // 文件类型
    type: 'file',      // 输出类型
  });

  return {
    workbook,
    worksheet,
  };
}


