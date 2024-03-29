/* eslint-disable @typescript-eslint/no-require-imports */
interface ICrypto {
  createHmac: Function;
  randomBytes: Function;
}


type ISignMethod = 'sha256' | 'sha1';

/**
 * 密码学随机数
 * @private
 */
const randomNum = (crypto: ICrypto) => {
  const buf = crypto.randomBytes(6);
  const hexToDec = parseInt(buf.toString('hex'), 16);
  return hexToDec;
};

const sha256 = (secret: string, content: string, crypto: ICrypto) => crypto.createHmac('sha256', secret).update(content)
  .digest('base64');

const sha1 = (secret: string, content: string, crypto: ICrypto) => crypto.createHmac('sha1', secret).update(content)
  .digest('base64');

/**
 * 获取API算法签名，默认sha1
 * @private
 * @param secret
 * @param content
 * @param signMethod
 */
const signatureGenerator = (secret: string, content: string, signMethod: ISignMethod, crypto: ICrypto) => {
  switch (signMethod) {
    case 'sha256':
      return sha256(secret, content, crypto);
    case 'sha1':
    default:
      return sha1(secret, content, crypto);
  }
};

/**
 * 请求签名Header生成
 * @private
 * @param {object} signInfo 密钥信息
 */
export function genRainbowHeaderSignature(signInfo: {
  appID?: string
  appId?: string
  userID?: string
  userId?: string
  secretKey: string
  signMethod?: ISignMethod
}) {
  const crypto = require('crypto');
  const { appID, userID, appId, userId, signMethod = 'sha1', secretKey } = signInfo;

  if (!secretKey) {
    return {};
  }

  const rainbowSgnType = 'apisign';
  const rainbowVersion = '2020';
  const rainbowAppId = appId || appID;
  const rainbowUserId = userId || userID;
  const rainbowTimestamp = `${Math.ceil(new Date().getTime() / 1000)}`; // ms => s
  const rainbowNonce = `${randomNum(crypto)}`;
  const rainbowSgnMethod = signMethod;
  const rainbowSgnBody = '';

  const content = `${rainbowVersion}.${rainbowAppId}.${rainbowUserId}.${rainbowTimestamp}.${rainbowNonce}`
    + `.${rainbowSgnMethod}.${rainbowSgnBody}`;
  const rainbowSignature = signatureGenerator(
    secretKey,
    content,
    signMethod,
    crypto,
  );
  return {
    rainbow_sgn_type: rainbowSgnType, // 签名类型	该字段为 apisign
    rainbow_version: rainbowVersion, // 版本号	暂固定为2020
    rainbow_app_id: rainbowAppId, // 项目ID	如bf904363-16c6-47f6-85cb-fdcacf288988
    rainbow_user_id: rainbowUserId, // 用户ID	如bx90434316c647f685cbfdcacf286988，用来标识哪个用户
    rainbow_timestamp: rainbowTimestamp, // 当前时间戳	如1569490800
    rainbow_nonce: rainbowNonce, // 随机正整数	如3557156860265374221
    rainbow_sgn_method: rainbowSgnMethod, // 签名方式	sha256或sha1，默认sha1
    rainbow_sgn_body: rainbowSgnBody, // 包体签名字符串	如UodgxU3P77iThrEJtsiHi2kjYJmNA2jGEgYNnMD%2FX0s%3D，默认不传
    rainbow_signature: rainbowSignature, // 签名串	如%2BysXvBSshSbHOsCX2zWBE1tapVs68hi5GLdcQtwBUNk%3D
  };
}
