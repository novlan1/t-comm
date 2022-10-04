import { instance } from './helper';

/**
 * 获取commit详情
 * @param {object} options 输入配置
 * @param {string} options.projectName 项目名称
 * @param {string} options.commitId 提交hash
 * @param {string} options.privateToken 密钥
 * @returns {Promise<object>} 请求Promise
 * @example
 *
 * getOneCommitDetail({
 *   projectName: 't-comm',
 *   commitId: 'aaaa',
 *   privateToken: 'xxxxx',
 * }).then((resp) => {
 *
 * })
 */
export function getOneCommitDetail({ projectName, commitId, privateToken }: {
  projectName: string
  commitId: string
  privateToken: string
}): Promise<object> {
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
        resolve({});
      });
  });
}
