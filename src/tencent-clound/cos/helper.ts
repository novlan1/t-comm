/* eslint-disable @typescript-eslint/no-require-imports */


export function getCOSInstance(secretId, secretKey) {
  const COS = require('cos-nodejs-sdk-v5');
  const cos = new COS({
    SecretId: secretId,
    SecretKey: secretKey,
  });
  return cos;
}
