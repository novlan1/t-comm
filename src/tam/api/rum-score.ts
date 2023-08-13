import { fetchCloudData } from '../../tencent-cloud/base/base';
import { ScoreInfoType } from '../types';


export async function getRUMAllProject({
  secretId,
  secretKey,
}: {
  secretId: string;
  secretKey: string;
}) {
  return fetchCloudData({
    secretId,
    secretKey,
    action: 'DescribeProjects',
    payload: JSON.stringify({
      Limit: 1000,
      Offset: 0,
    }),
  }).then((res: {
    data: {
      Response: {
        ProjectSet: Array<any>,
        TotalCount: number
      }
    }
  }) => {
    const resp  = res.data.Response || {};
    return {
      data: resp.ProjectSet || [],
      total: resp.TotalCount || 0,
    };
  })
    .catch((err: unknown) => {
      console.log('[getRUMAllProject] err: ', err);
    });
}


async function getRUMScoreInfo({
  secretId,
  secretKey,
  startTime,
  endTime,
}: {
  secretId: string;
  secretKey: string;
  startTime: string;
  endTime: string;
}) {
  return fetchCloudData({
    secretId,
    secretKey,
    action: 'DescribeScores',
    payload: JSON.stringify({
      StartTime: startTime,
      EndTime: endTime,
    }),
  }).then((res: {
    data: {
      Response: {
        ScoreSet: Array<any>
      }
    }
  }) => {
    const resp = res.data.Response || {};
    return resp.ScoreSet || [];
  })
    .catch((err: unknown) => {
      console.log('[getRUMScores] err: ', err);
    });
}


export async function getRUMScores({
  secretId,
  secretKey,
  startTime,
  endTime,
}: {
  secretId: string;
  secretKey: string;
  startTime: string;
  endTime: string;
}): Promise<Array<ScoreInfoType>> {
  const scoreList = await getRUMScoreInfo({
    secretId,
    secretKey,
    startTime,
    endTime,
  });

  const project = await getRUMAllProject({
    secretId,
    secretKey,
  });

  const projectMap = project.data.reduce((acc: Record<string, any>, item: any) => {
    acc[item.ID] = item;
    return acc;
  }, {});

  const score = scoreList.map((item: any) => {
    const projectInfo = projectMap[item.ProjectID] || {};

    return {
      ...item,
      PagePv: +item.PagePv,
      PageUv: +item.PageUv,
      PageDuration: +item.PageDuration,
      PageError: +item.PageError,
      ApiNum: +item.ApiNum,
      ApiFail: +item.ApiFail,
      ApiDuration: +item.ApiDuration,
      StaticNum: +item.StaticNum,
      StaticFail: +item.StaticFail,
      StaticDuration: +item.StaticDuration,
      Score: +item.Score,

      ProjectName: projectInfo.Name,
      GroupName: projectInfo.InstanceName || '',
      CreateUser: projectInfo.Creator,
      ProjectId: item.ProjectID,
    };
  });

  return score;
}
