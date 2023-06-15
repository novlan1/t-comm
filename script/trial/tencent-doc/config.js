require('../../utils/env');

const ACCESS_TOKEN = process.env.TENCENT_DOC_ACCESS_TOKEN;
const CLIENT_ID = process.env.TENCENT_DOC_CLIENT_ID;
const CLIENT_SECRET = process.env.TENCENT_DOC_CLIENT_SECRET;
const OPEN_ID = process.env.TENCENT_DOC_OPEN_ID;
const REFRESH_TOKEN = process.env.TENCENT_DOC_REFRESH_TOKEN;

module.exports = {
  ACCESS_TOKEN,
  CLIENT_ID,
  CLIENT_SECRET,
  OPEN_ID,
  REFRESH_TOKEN,
};
