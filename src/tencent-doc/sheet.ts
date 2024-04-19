import axios from 'axios';
import type { ISecretInfo } from './types';

export async function updateTencentSheet({
  accessToken,
  clientId,
  openId,

  bookId,
  range,
  values,
}: ISecretInfo & {
  bookId: string;
  range: string;
  values: Array<{}>
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


export async function updateTencentSheetImage({
  accessToken,
  clientId,
  openId,

  bookId,
  insertImages,
}: ISecretInfo & {
  bookId: string;
  insertImages: any;
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

export async function batchUpdateTencentSheetV3({
  accessToken,
  clientId,
  openId,

  bookId,
  requests,
}: ISecretInfo & {
  bookId: string;
  requests: Record<string, any>;
}) {
  const result = await axios({
    method: 'POST',
    url: `https://docs.qq.com/openapi/spreadsheet/v3/files/${bookId}/batchUpdate`,
    headers: {
      'Access-Token': accessToken,
      'Client-Id': clientId,
      'Open-Id': openId,
      'Content-Type': 'application/json',
    },
    data: {
      requests,
    },
  });
  return result.data;
}


