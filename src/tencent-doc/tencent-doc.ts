/* eslint-disable @typescript-eslint/no-require-imports */
import { nodePost, nodePut, nodeGet } from '../util/node-request';


export async function createTencentDoc({
  accessToken,
  clientId,
  openId,

  type,
  title,
  folderId = '/',
}) {
  return await nodePost()({
    url: 'https://docs.qq.com/openapi/drive/v2/files',
    headers: {
      'Access-Token': accessToken,
      'Client-Id': clientId,
      'Open-Id': openId,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: {
      type,
      title,
      folderId,
    },
  });
}


export async function updateTencentSheet({
  accessToken,
  clientId,
  openId,

  bookId,
  range,
  values,
}) {
  const result = await nodePut()({
    url: `https://docs.qq.com/openapi/sheetbook/v2/${bookId}/values/${range}`,
    headers: {
      'Access-Token': accessToken,
      'Client-Id': clientId,
      'Open-Id': openId,
      'Content-Type': 'application/json',
    },
    json: { values },
  });
  return await result?.body;
}


export async function convertTencentFileId({
  accessToken,
  clientId,
  openId,

  type,
  value,
}) {
  return await nodeGet()({
    url: `https://docs.qq.com/openapi/drive/v2/util/converter?type=${type}&value=${value}`,
    headers: {
      'Access-Token': accessToken,
      'Client-Id': clientId,
      'Open-Id': openId,
    },
  });
}


export async function uploadTencentDocImage({
  accessToken,
  clientId,
  openId,

  image,
}) {
  const result = await nodePost()({
    url: 'https://docs.qq.com/openapi/resources/v2/images',
    headers: {
      'Access-Token': accessToken,
      'Client-Id': clientId,
      'Open-Id': openId,
      'Content-Type': 'application/json',
    },
    formData: {
      image: require('fs').createReadStream(image),
    },
  });

  return parseResponse(result);
}

export async function updateTencentSheetImage({
  accessToken,
  clientId,
  openId,

  bookId,
  insertImages,
}) {
  const result = await nodePost()({
    url: `https://docs.qq.com/openapi/sheetbook/v2/${bookId}:batchUpdate`,
    headers: {
      'Access-Token': accessToken,
      'Client-Id': clientId,
      'Open-Id': openId,
      'Content-Type': 'application/json',
    },
    json: {
      bookID: bookId,
      insertImages,
    },
  });
  return await result?.body;
}

export async function exportTencentDoc({
  accessToken,
  clientId,
  openId,

  fileId,
  exportType,
}) {
  const result = await nodePost()({
    url: `https://docs.qq.com/openapi/drive/v2/files/${fileId}/async-export`,
    headers: {
      'Access-Token': accessToken,
      'Client-Id': clientId,
      'Open-Id': openId,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: {
      exportType,
    },
  });
  return parseResponse(result);
}

export async function checkExportTencentDocProgress({
  accessToken,
  clientId,
  openId,

  fileId,
  operationId,
}) {
  const result = await nodeGet()({
    url: `https://docs.qq.com/openapi/drive/v2/files/${fileId}/export-progress?operationID=${operationId}`,
    headers: {
      'Access-Token': accessToken,
      'Client-Id': clientId,
      'Open-Id': openId,
      'Content-Type': 'application/json',
    },
  });
  return parseResponse(result);
}

async function parseResponse(result) {
  let res = {};
  try {
    res = JSON.parse(result?.body);
  } catch (err) {}
  return await res;
}
