/* eslint-disable @typescript-eslint/no-require-imports */
import axios from 'axios';


export async function createTencentDoc({
  accessToken,
  clientId,
  openId,

  type,
  title,
  folderId = '/',
}) {
  const qs = require('qs');
  const res = await axios({
    method: 'POST',
    url: 'https://docs.qq.com/openapi/drive/v2/files',
    headers: {
      'Access-Token': accessToken,
      'Client-Id': clientId,
      'Open-Id': openId,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      type,
      title,
      folderId,
    }),
  });
  return res.data;
}


export async function updateTencentSheet({
  accessToken,
  clientId,
  openId,

  bookId,
  range,
  values,
}) {
  const result = await axios({
    method: 'PUT',
    url: `https://docs.qq.com/openapi/sheetbook/v2/${bookId}/values/${range}`,
    headers: {
      'Access-Token': accessToken,
      'Client-Id': clientId,
      'Open-Id': openId,
      'Content-Type': 'application/json',
    },
    data: { values },
  });
  return result.data;
}


export async function convertTencentFileId({
  accessToken,
  clientId,
  openId,

  type,
  value,
}) {
  const result = await axios({
    method: 'GET',
    url: `https://docs.qq.com/openapi/drive/v2/util/converter?type=${type}&value=${value}`,
    headers: {
      'Access-Token': accessToken,
      'Client-Id': clientId,
      'Open-Id': openId,
    },
  });
  return result.data;
}


export async function uploadTencentDocImage({
  accessToken,
  clientId,
  openId,

  image,
}) {
  const FormData = require('form-data');
  const formData = new FormData();
  formData.append('image', require('fs').createReadStream(image));

  // eslint-disable-next-line max-len
  const len = await new Promise((resolve, reject) => formData.getLength((err, length) => (err ? reject(err) : resolve(length))));

  const result = await axios({
    method: 'POST',
    url: 'https://docs.qq.com/openapi/resources/v2/images',

    headers: {
      'Access-Token': accessToken,
      'Client-Id': clientId,
      'Open-Id': openId,
      'Content-Type': 'application/json',
      'Content-Length': len as any,
      ...formData.getHeaders(),
    },
    data: formData,
  });

  return result.data;
}

export async function updateTencentSheetImage({
  accessToken,
  clientId,
  openId,

  bookId,
  insertImages,
}) {
  const result = await axios({
    method: 'POST',
    url: `https://docs.qq.com/openapi/sheetbook/v2/${bookId}:batchUpdate`,
    headers: {
      'Access-Token': accessToken,
      'Client-Id': clientId,
      'Open-Id': openId,
      'Content-Type': 'application/json',
    },
    data: {
      bookID: bookId,
      insertImages,
    },
  });
  return result.data;
}

export async function asyncExportTencentDoc({
  accessToken,
  clientId,
  openId,

  fileId,
  exportType,
}) {
  const qs = require('qs');
  const result = await axios({
    method: 'POST',
    url: `https://docs.qq.com/openapi/drive/v2/files/${fileId}/async-export`,
    headers: {
      'Access-Token': accessToken,
      'Client-Id': clientId,
      'Open-Id': openId,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      exportType,
    }),
  });
  return result.data;
}

export async function checkExportTencentDocProgress({
  accessToken,
  clientId,
  openId,

  fileId,
  operationId,
}) {
  const result = await axios({
    method: 'GET',
    url: `https://docs.qq.com/openapi/drive/v2/files/${fileId}/export-progress?operationID=${operationId}`,
    headers: {
      'Access-Token': accessToken,
      'Client-Id': clientId,
      'Open-Id': openId,
      'Content-Type': 'application/json',
    },
  });
  return result.data;
}

