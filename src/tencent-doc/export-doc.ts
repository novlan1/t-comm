import { asyncExportTencentDoc, checkExportTencentDocProgress } from './tencent-doc';
import type { ISecretInfo } from './types';

async function checkUrl({
  accessToken,
  clientId,
  openId,

  fileId,
  operationId,
}: ISecretInfo & {
  fileId: string
  operationId: string;
}) {
  const res = await checkExportTencentDocProgress({
    accessToken,
    clientId,
    openId,
    fileId,
    operationId,
  });
  return res.data;
}

const holding = (time: number) => new Promise((resolve) => {
  setTimeout(() => resolve(time), time);
});

async function pollCheckUrl({
  accessToken,
  clientId,
  openId,

  fileId,
  operationId,
  waitTime,
}: ISecretInfo & {
  fileId: string;
  operationId: string;
  waitTime: number;
}): Promise<string> {
  await holding(waitTime);

  const res = await checkUrl({
    accessToken,
    clientId,
    openId,

    fileId,
    operationId,
  });
  console.log('[checkUrl] res: ', res);

  if (res.url) {
    return res.url;
  }
  return pollCheckUrl({
    accessToken,
    clientId,
    openId,

    fileId,
    operationId,
    waitTime,
  });
}

export async function exportTencentDoc({
  accessToken,
  clientId,
  openId,

  fileId,
  exportType,
  waitTime = 0,
}: ISecretInfo & {
  fileId: string;
  exportType: number;
  waitTime?: number;
}) {
  const data = await asyncExportTencentDoc({
    accessToken,
    clientId,
    openId,
    fileId,

    exportType,
  });
  console.log('[asyncExportTencentDoc] data: ', data);

  const { operationID: operationId } = data.data || {};
  console.log('[exportTencentDoc] operationId: ', operationId);

  if (!operationId) return;
  return pollCheckUrl({
    accessToken,
    clientId,
    openId,

    fileId,
    operationId,
    waitTime,
  });
}


