import { instance } from './helper';
import { getOneProjectDetail } from './project';

/**
 * 获取tGit上某分支生命周期
 * @param {object} options 输入配置
 * @param {string} options.projectName 项目名称
 * @param {string} options.branchName 分支名称
 * @param {string} options.privateToken 密钥
 * @returns {Promise<object>} 请求Promise
 * @example
 *
 * getBranchLifeCycle({
 *   projectName: 't-comm',
 *   branchName: 'master',
 *   privateToken: 'xxxxx',
 * }).then((resp) => {
 *
 * })
 */
export function getBranchLifeCycle({ projectName, branchName, privateToken }: {
  projectName: string
  branchName: string
  privateToken: string
}): Promise<object> {
  return new Promise((resolve, reject) => {
    if (!projectName || !branchName) {
      return;
    }
    instance({
      url: `/projects/${encodeURIComponent(projectName)}/tloc/branch/lifecycle`,
      method: 'GET',
      params: {
        branch_name: branchName,
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
 * 获取默认分支
 * @param {object} options 输入配置
 * @param {string} options.projectName 项目名称
 * @param {string} options.privateToken 密钥
 * @returns {Promise<string>} 请求Promise
 * @example
 *
 * getProjectDefaultBranch({
 *   projectName: 't-comm',
 *   privateToken: 'xxxxx',
 * }).then((branch) => {
 *  console.log('branch: ', branch)
 * })
 */
export async function getProjectDefaultBranch({ projectName, privateToken }: {
  projectName: string
  privateToken: string
}): Promise<string> {
  const detail: any = await getOneProjectDetail({
    projectName,
    privateToken,
  });
  function getMainBranch() {
    return detail.default_branch || '';
  }
  const branch = getMainBranch();
  return branch;
}

/**
 * 获取仓库的分支列表
 * @param {object} options 输入配置
 * @param {string} options.projectName 项目名称
 * @param {string} options.privateToken 密钥
 * @param {string} options.baseUrl baseUrl
 * @returns {Promise<Array<object>>} 请求Promise
 * @example
 *
 * getBranchesByProjectName({
 *   projectName: 't-comm',
 *   privateToken: 'xxxxx',
 * }).then((resp) => {
 *
 * })
 */
export function getBranchesByProjectName({ projectName, privateToken, baseUrl }: {
  projectName: string;
  privateToken: string;
  baseUrl: string
}): Promise<Array<object>> {
  return new Promise((resolve, reject) => {
    if (!projectName) {
      reject('No ProjectName');
      return;
    }

    instance({
      url: `${baseUrl}/api/v3/projects/${encodeURIComponent(projectName)}/repository/branches`,
      method: 'GET',
      params: {
        per_page: 100,
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
 * 获取分支详情
 * @param {object} options 输入配置
 * @param {string} options.projectName 项目名称
 * @param {string} options.branchName 分支名称
 * @param {string} options.privateToken 密钥
 * @returns {Promise<object>} 请求Promise
 * @example
 *
 * getOneBranchDetail({
 *   projectName: 't-comm',
 *   branchName: 'master',
 *   privateToken: 'xxxxx',
 * }).then((resp) => {
 *
 * })
 */
export function getOneBranchDetail({ projectName, branchName, privateToken }: {
  projectName: string
  branchName: string
  privateToken: string
}): Promise<object> {
  return new Promise((resolve, reject) => {
    if (!projectName || !branchName) {
      return;
    }

    instance({
      url: `/projects/${encodeURIComponent(projectName)}/repository/branches/${encodeURIComponent(branchName)}`,
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
