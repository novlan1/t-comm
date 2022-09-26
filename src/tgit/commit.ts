import { instance } from './helper';

/**
 * 获取commit详情
 */
export function getOneCommitDetail({ projectName, commitId, privateToken }) {
  return new Promise((resolve) => {
    instance({
      url: `/projects/${encodeURIComponent(projectName)}/repository/commits/${encodeURIComponent(commitId)}`,
      method: 'GET',
      headers: {
        'PRIVATE-TOKEN': privateToken,
      },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => {
        resolve('');
      });
  });
}
