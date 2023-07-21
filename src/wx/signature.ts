/* eslint-disable @typescript-eslint/no-require-imports */
const URL_MAP = {
  ACCESS_TOKEN: 'https://api.weixin.qq.com/cgi-bin/token',
  TICKET: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
};


const sha1 = (content: string) => require('crypto').createHash('sha1')
  .update(content)
  .digest('hex');


export function getAccessToken({
  appId,
  appSecret,
}: {
  appId: string;
  appSecret: string;
}) {
  const axios = require('axios');

  return new Promise((resolve, reject) => {
    axios({
      url: `${URL_MAP.ACCESS_TOKEN}?grant_type=client_credential&appid=${appId}&secret=${appSecret}`,
    }).then((res: any) => {
      resolve(res.data || {});
    })
      .catch((err: any) => {
        reject(err);
      });
  });
}


export function getAPITicket(accessToken: string) {
  const axios = require('axios');
  return new Promise((resolve, reject) => {
    axios({
      url: `${URL_MAP.TICKET}?access_token=${accessToken}&type=jsapi`,
    }).then((res: any = {}) => {
      resolve(res.data || {});
    })
      .catch((err: any) => {
        reject(err);
      });
  });
}


function getNonceStr() {
  const buf = require('crypto').randomBytes(12);
  const hexToDec = buf.toString('hex');
  return hexToDec;
}


/**
 * 获取jsAPI签名
 *
 * 校验地址：https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign
 *
 * 文档地址：https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html
 * @param ticket 票据
 * @param url 当前url，不包括#之后的部分
 * @returns signature
 */
export function genSignature(ticket: string, url: string) {
  const timestamp = Math.floor(Date.now() / 1000);
  const nonceStr = getNonceStr();
  const list = [
    `jsapi_ticket=${ticket}`,
    `noncestr=${nonceStr}`,
    `timestamp=${timestamp}`,
    `url=${url}`,
  ];
  const str = list.join('&');

  const signature = sha1(str);

  return {
    timestamp,
    nonceStr,
    signature,
    url,
  };
}
