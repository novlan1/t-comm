import axios from 'axios';

/**
 * 用于获取用户信息，同时也可以用来校验 AccessToken 的有效性。
 */
export async function getTencentDocUserInfo({
  accessToken,
}: {
  accessToken: string;
}) {
  const result = await axios({
    method: 'GET',
    url: 'https://docs.qq.com/oauth/v2/userinfo',
    params: {
      access_token: accessToken,
    },
  });
  return result.data;
}


