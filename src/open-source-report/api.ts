/* eslint-disable @typescript-eslint/no-require-imports */

export function getOpenSourceReport({
  time,
  bgName,
  centerName,
  groupName,
}) {
  return new Promise((resolve, reject) => {
    const axios  = require('axios');
    const params = {
      page:	1,
      page_size:	1000,
      method:	'getProjectDetailV2',
      sort_direction:	'asc',
      sort_column:	'code_specification_score',

      bg_name: bgName,
      center_name: centerName,
      data_date:	`${time}`,
    };
    if (groupName) {
      (params as any).group_name = groupName;
    }
    axios({
      method: 'POST',
      Headers: {},
      url: '/eplus-data-report/api/query',
      data: {
        jsonrpc:	'2.0',
        method:	'noop',
        params,
      },
    }).then((res) => {
      const arr = res.data.result.data.data || [];
      resolve(arr);
    })
      .catch((err) => {
        console.log('[getOpenSourceReport] err: ', err);
        reject(err);
      });
  });
}


