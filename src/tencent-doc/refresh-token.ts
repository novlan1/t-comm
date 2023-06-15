import axios from 'axios';

export async function refreshTencentDocToken({
  clientId,
  clientSecret,
  refreshToken,
}: {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}) {
  const result = await axios({
    method: 'GET',
    url: 'https://docs.qq.com/oauth/v2/token',
    params: {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    },
  });
  return result.data;
}


