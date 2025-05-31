import axios from 'axios';


export async function createMRNote({
  privateToken,
  gitApiPrefix,

  projectName,
  mrId,

  body,
  path,
  line,

  lineType = 'new',

  // 严重程度 可选值 0、1、2、3
  // 0 : "default"（默认）1 : "slight"（轻微）
  // 2 : "normal"（一般）3 : "serious"（严重
  risk = 3,

  // 需解决 可选值 0、1、2
  // 0 : "default"（默认）
  // 1 : "unresolved"（未解决）
  // 2 : "resolved"（已解决）
  resolveState = 1,

  // 默认值为 true，发通知给相关用户
  notifyEnabled = true,

}: {
  privateToken: string;
  gitApiPrefix: string;

  projectName: string;
  mrId: string | number;

  body: any;
  path: string;
  line: number;

  lineType?: string;
  risk?: 0 | 1 | 2 | 3;

  resolveState?: 0 | 1 | 2;
  notifyEnabled?: boolean;

}) {
  if (!mrId || !projectName || !privateToken) {
    return Promise.reject('参数不全');
  }

  return new Promise((resolve, reject) => {
    axios({
      url: `${gitApiPrefix}/projects/${encodeURIComponent(projectName)}/merge_requests/${mrId}/notes?private_token=${privateToken}`,
      method: 'POST',
      data: {
        body,
        path,
        line,
        line_type: lineType,
        risk,
        resolve_state: resolveState,
        notify_enabled: notifyEnabled,
      },
    }).then((res) => {
      resolve(res.data);
    })
      .catch((err) => {
        console.log('err', err);
        reject(err);
      });
  });
}


export async function createMRComment({
  projectName,
  mrId,
  data,
  privateToken,
  gitApiPrefix,
}: {
  projectName: string;
  mrId: string | number;
  data: any;
  privateToken: string;
  gitApiPrefix: string;
}): Promise<any> {
  return new Promise((resolve, reject) => {
    axios({
      url: `${gitApiPrefix}/projects/${encodeURIComponent(projectName)}/merge_request/${mrId}/comments?private_token=${privateToken}`,
      method: 'POST',
      data: {
        note: data,
      },
    }).then((res) => {
      resolve(res.data);
    })
      .catch((err) => {
        console.log('err', err);
        reject(err);
      });
  });
}
