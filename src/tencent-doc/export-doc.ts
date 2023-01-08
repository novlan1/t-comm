import { asyncExportTencentDoc, checkExportTencentDocProgress } from './tencent-doc';

async function checkUrl({
  accessToken,
  clientId,
  openId,

  fileId,
  operationId,
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

const holding = time => new Promise((resolve) => {
  setTimeout(() => resolve(time), time);
});

async function pollCheckUrl({
  accessToken,
  clientId,
  openId,

  fileId,
  operationId,
  waitTime,
}) {
  await holding(waitTime);

  const res = await checkUrl({
    accessToken,
    clientId,
    openId,

    fileId,
    operationId,
  });
  console.log('checkUrl.res', res);

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
}) {
  const data = await asyncExportTencentDoc({
    accessToken,
    clientId,
    openId,
    fileId,

    exportType,
  });
  console.log('asyncExportTencentDoc.data', data);

  const { operationID: operationId } = data.data || {};
  console.log('operationId: ', operationId);

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


