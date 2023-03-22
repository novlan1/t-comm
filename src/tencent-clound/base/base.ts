/* eslint-disable @typescript-eslint/no-require-imports */

const DEFAULT_RUM_INFO = {
  ENDPOINT: 'rum.tencentcloudapi.com',
  REGION: 'ap-guangzhou',
  VERSION: '2021-06-22',
  SERVICE: 'rum',
};


function sha256(message, secret = '', encoding: undefined | string = undefined) {
  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha256', secret);
  return hmac.update(message).digest(encoding);
}

function getHash(message, encoding = 'hex') {
  const crypto = require('crypto');
  const hash = crypto.createHash('sha256');
  return hash.update(message).digest(encoding);
}

function getDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const year = date.getUTCFullYear();
  const month = (`0${date.getUTCMonth() + 1}`).slice(-2);
  const day = (`0${date.getUTCDate()}`).slice(-2);
  return `${year}-${month}-${day}`;
}

function getAuthorization({
  secretId,
  secretKey,
  endpoint,
  action,
  payload,
  timestamp,
  service,
}) {
  // 时间处理, 获取世界时间日期
  const date = getDate(timestamp);

  const hashedRequestPayload = getHash(payload);
  const httpRequestMethod = 'POST';
  const canonicalUri = '/';
  const canonicalQueryString = '';
  const canonicalHeaders = 'content-type:application/json; charset=utf-8\n'
        + `host:${endpoint}\n`
        + `x-tc-action:${action.toLowerCase()}\n`;
  const signedHeaders = 'content-type;host;x-tc-action';

  const canonicalRequest = `${httpRequestMethod}\n${
    canonicalUri}\n${
    canonicalQueryString}\n${
    canonicalHeaders}\n${
    signedHeaders}\n${
    hashedRequestPayload}`;

  // ************* 步骤 2：拼接待签名字符串 *************
  const algorithm = 'TC3-HMAC-SHA256';
  const hashedCanonicalRequest = getHash(canonicalRequest);
  const credentialScope = `${date}/${service}/` + 'tc3_request';
  const stringToSign = `${algorithm}\n${
    timestamp}\n${
    credentialScope}\n${
    hashedCanonicalRequest}`;

  // ************* 步骤 3：计算签名 *************
  const kDate = sha256(date, `TC3${secretKey}`);
  const kService = sha256(service, kDate);
  const kSigning = sha256('tc3_request', kService);
  const signature = sha256(stringToSign, kSigning, 'hex');

  // ************* 步骤 4：拼接 Authorization *************
  const authorization = `${algorithm} `
                    + `Credential=${secretId}/${credentialScope}, `
                    + `SignedHeaders=${signedHeaders}, `
                    + `Signature=${signature}`;

  return authorization;
}

export function fetchCloudData({
  secretId,
  secretKey,
  payload,
  action,

  endpoint = DEFAULT_RUM_INFO.ENDPOINT,
  region = DEFAULT_RUM_INFO.REGION,
  version = DEFAULT_RUM_INFO.VERSION,
  service = DEFAULT_RUM_INFO.SERVICE,
}) {
  const timestamp = Math.round(Date.now() / 1000);

  const authorization = getAuthorization({
    secretId,
    secretKey,
    endpoint,
    action,
    payload,
    timestamp,
    service,
  });

  const axios = require('axios');

  return axios({
    url: `https://${endpoint}`,
    method: 'POST',
    data: payload,
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json; charset=utf-8',
      Host: endpoint,
      'X-TC-Action': action,
      'X-TC-Timestamp': timestamp.toString(),
      'X-TC-Version': version,
      'X-TC-Region': region,
    },
  });
}

