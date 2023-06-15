/* eslint-disable @typescript-eslint/no-require-imports */
import axios from 'axios';
import type { ISecretInfo } from './types';

export async function createTencentDoc({
  accessToken,
  clientId,
  openId,

  type,
  title,
  folderId = '/',
}: ISecretInfo & {
  type: number;
  title: string;
  folderId?: string;
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


export async function convertTencentFileId({
  accessToken,
  clientId,
  openId,

  type,
  value,
}: ISecretInfo & {
  type: number;
  value: string;
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
}: ISecretInfo & {
  image: string;
}) {
  const FormData = require('form-data');
  const formData = new FormData();
  formData.append('image', require('fs').createReadStream(image));

  // eslint-disable-next-line max-len
  const len = await new Promise((resolve, reject) => formData.getLength((err: unknown, length: number) => (err ? reject(err) : resolve(length))));

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


export async function asyncExportTencentDoc({
  accessToken,
  clientId,
  openId,

  fileId,
  exportType,
}: ISecretInfo & {
  fileId: string;
  exportType: number;
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
}: ISecretInfo & {
  fileId: string;
  operationId: string;
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


