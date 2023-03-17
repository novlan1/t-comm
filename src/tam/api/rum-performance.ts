import { fetchRUMData } from './rum-base';


export async function getRUMPerformance({
  secretId,
  secretKey,
  id,
  startTime,
  endTime,
  type,
}) {
  return fetchRUMData({
    secretId,
    secretKey,
    action: 'DescribeDataPerformancePage',
    payload: JSON.stringify({
      ID: id,
      StartTime: startTime,
      EndTime: endTime,
      Type: type,
    }),
  }).then((res) => {
    const resp  = res.data.Response || {};
    let { Result: result = '' } = resp;

    try {
      result = JSON.parse(result);
    } catch (err) {}

    return {
      data: result.results || [],
    };
  })
    .catch((err) => {
      console.log('[getRUMPerformance] err: ', err);
    });
}
