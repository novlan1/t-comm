import { batchUpdateTencentSheetV3 } from '../tencent-doc/sheet';

import type { ISecretInfo } from '../tencent-doc/types';


function getUpdateQQMpResultRows({
  result,
}: {
  result: Record<string, any>;
}) {
  const { time, branch, env, robot, version, lastCommit, link } = result;
  const rowValues: any = [
    time,
    branch,
    env,
    robot,
    version,
    lastCommit,
  ].map(item => ({
    cellValue: {
      text: item,
    },
  }));

  rowValues.push({
    cellValue: {
      link: {
        url: link,
        text: link,
      },
    },
  });

  const rows = [{
    values: rowValues,
  }];

  return rows;
}


export async function updateQQMpResultToSheet({
  result,

  accessToken,
  clientId,
  openId,

  bookId,
  sheetId,

  startRow,
  startColumn = 1,
}: ISecretInfo& {
  result: Record<string, any>;

  bookId: string;
  sheetId: string;
  startRow: number;
  startColumn?: number;
}) {
  const rows = getUpdateQQMpResultRows({
    result,
  });

  if (!startRow) {
    console.log('[updateQQMpResultToSheet.error] startRow 不可为空，且必须大于等于1');
    return;
  }

  return await batchUpdateTencentSheetV3({
    accessToken,
    clientId,
    openId,

    bookId,

    requests: [
      {
        updateRangeRequest: {
          sheetId,
          gridData: {
            startRow: startRow - 1,
            startColumn,
            rows,
          },
        },
      }],
  });
}
