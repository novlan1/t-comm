import { instance } from './helper'
import { getOneProjectDetail } from './project'

/**
 * 获取分支生命周期
 */
export function getBranchLifeCycle({ projectName, branchName, privateToken }) {
  return new Promise((resolve, reject) => {
    if (!projectName || !branchName) {
      return
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
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 获取默认分支
 */
export async function getProjectDefaultBranch({ projectName, privateToken }) {
  const detail: any = await getOneProjectDetail({
    projectName,
    privateToken,
  })
  function getMainBranch() {
    return detail.default_branch || ''
  }
  const branch = getMainBranch()
  return branch
}

/**
 * 获取分支列表
 */
export function getBranchesByProjectName({ projectName, privateToken }) {
  return new Promise((resolve, reject) => {
    if (!projectName) {
      return
    }

    instance({
      url: `/projects/${encodeURIComponent(projectName)}/repository/branches`,
      method: 'GET',
      params: {
        per_page: 100,
      },
      headers: {
        'PRIVATE-TOKEN': privateToken,
      },
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 获取分支详情
 */
export function getOneBranchDetail({ projectName, branchName, privateToken }) {
  return new Promise((resolve, reject) => {
    if (!projectName || !branchName) {
      return
    }

    instance({
      url: `/projects/${encodeURIComponent(
        projectName,
      )}/repository/branches/${encodeURIComponent(branchName)}`,
      method: 'GET',
      headers: {
        'PRIVATE-TOKEN': privateToken,
      },
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
