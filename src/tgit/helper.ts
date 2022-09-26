// eslint-disable-next-line @typescript-eslint/no-require-imports
const axios = require('axios');

export const instance = axios.create({
  baseURL: 'https://git.woa.com/api/v3',
  timeout: 10000,
});
