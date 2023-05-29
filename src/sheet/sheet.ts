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
