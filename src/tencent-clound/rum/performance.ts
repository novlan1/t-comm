import { fetchCloudData } from '../base/base';


export async function getRUMPerformance({
  secretId,
  secretKey,
  id,
  startTime,
  endTime,
  type,
}: {
  secretId: string;
  secretKey: string;
  id: string;
  startTime: string | number;
  endTime: string | number;
  type: string;
}) {
  return fetchCloudData({
    secretId,
    secretKey,
    action: 'DescribeDataPerformancePage',
    payload: JSON.stringify({
      ID: id,
      StartTime: startTime,
      EndTime: endTime,
      Type: type,
    }),
  }).then((res: {
    data: {
      Response: {
        Result: string;
      }
    }
  }) => {
    const resp  = res.data.Response || {};
    const { Result: result = '' } = resp;
    let data: {
      results: Array<unknown>
    } = {
      results: [],
    };

    try {
      data = JSON.parse(result);
    } catch (err) {}

    return {
      data: data || [],
    };
  })
    .catch((err: unknown) => {
      console.log('[getRUMPerformance] err: ', err);
    });
}
