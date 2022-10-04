import { instance } from './helper';

/**
 * 创建MR
 * @param {object} options 输入配置
 * @param {string} options.projectName 项目名称
 * @param {string} options.privateToken 密钥
 * @param {string} options.sourceBranch 源分支
 * @param {string} options.targetBranch 目标分支
 * @return {Promise<object>} 请求Promise
 * @example
 *
 * createMR({
 *   projectName: 't-comm',
 *   privateToken: 'xxxxx',
 *   sourceBranch: 'master',
 *   targetBranch: 'release',
 * }).then((resp) => {
 *
 * })
 */
export async function createMR({
  projectName,
  privateToken,
  sourceBranch,
  targetBranch,
}) {
  return new Promise((resolve, reject) => {
    if (!sourceBranch || !targetBranch || !projectName) {
      reject();
      return;
    }

    instance({
      url: `/projects/${encodeURIComponent(projectName)}/merge_requests`,
      method: 'POST',
      data: {
        source_branch: sourceBranch,
        target_branch: targetBranch,
        title: `${sourceBranch} => ${targetBranch}`,
        approver_rule: 1,
        necessary_approver_rule: 0,
      },
      headers: {
        'PRIVATE-TOKEN': privateToken,
      },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 获取MR列表
 * @param {object} options 输入配置
 * @param {string} options.projectName 项目名称
 * @param {string} options.privateToken 密钥
 * @return {Promise<object>} 请求Promise
 * @example
 *
 * getMrList({
 *   projectName: 't-comm',
 *   privateToken: 'xxxxx',
 * }).then((resp) => {
 *
 * })
 */
export function getMrList({ projectName, privateToken }: {
  projectName: string
  privateToken: string
}): Promise<object> {
  return new Promise((resolve, reject) => {
    instance({
      url: `/projects/${encodeURIComponent(projectName)}/merge_requests`,
      method: 'GET',
      headers: {
        'PRIVATE-TOKEN': privateToken,
      },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 获取MR的一条评论
 * @param {object} options 输入配置
 * @param {string} options.projectName 项目名称
 * @param {string} options.privateToken 密钥
 * @param {string} options.mrId 某次MR的Id
 * @return {Promise<object>} 请求Promise
 * @example
 *
 * getOneMrComments({
 *   projectName: 't-comm',
 *   privateToken: 'xxxxx',
 *   mrId: '1'
 * }).then((resp) => {
 *
 * })
 */
export function getOneMrComments({ mrId, projectName, privateToken }: {
  projectName: string
  mrId: string
  privateToken: string
}): Promise<object> {
  return new Promise((resolve, reject) => {
    instance({
      url: `/projects/${encodeURIComponent(projectName)}/merge_request/${mrId}/comments`,
      method: 'GET',
      headers: {
        'PRIVATE-TOKEN': privateToken,
      },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
