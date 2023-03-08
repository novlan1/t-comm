import { fetchRUMData } from './rum-base';
import { ScoreInfoType } from '../type';


export async function getRUMAllProject({
  secretId,
  secretKey,
}) {
  return fetchRUMData({
    secretId,
    secretKey,
    action: 'DescribeProjects',
    payload: JSON.stringify({
      Limit: 1000,
      Offset: 0,
    }),
  }).then((res) => {
    const resp  = res.data.Response || {};
    return {
      data: resp.ProjectSet || [],
      total: resp.TotalCount || 0,
    };
  })
    .catch((err) => {
      console.log('[getRUMAllProject] err: ', err);
    });
}


async function getRUMScoreInfo({
  secretId,
  secretKey,
  startTime,
  endTime,
}) {
  return fetchRUMData({
    secretId,
    secretKey,
    action: 'DescribeScores',
    payload: JSON.stringify({
      StartTime: startTime,
      EndTime: endTime,
    }),
  }).then((res) => {
    const resp = res.data.Response || {};
    return resp.ScoreSet || [];
  })
    .catch((err) => {
      console.log('[getRUMScores] err: ', err);
    });
}


export async function getRUMScores({
  secretId,
  secretKey,
  startTime,
  endTime,
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

  const projectMap = project.data.reduce((acc, item) => {
    acc[item.ID] = item;
    return acc;
  }, {});

  const score = scoreList.map((item) => {
    const projectInfo = projectMap[item.ProjectID] || {};

    return {
      ...item,
      ProjectName: projectInfo.Name,
      GroupName: projectInfo.InstanceName || '',
      CreateUser: projectInfo.Creator,
      ProjectId: item.ProjectID,
    };
  });

  return score;
}
