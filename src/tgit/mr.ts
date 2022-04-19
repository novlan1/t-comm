import { instance } from './helper'

/**
 * 创建MR
 */
export async function createMR({
  sourceBranch,
  targetBranch,
  projectName,
  privateToken,
}) {
  return new Promise((resolve, reject) => {
    if (!sourceBranch || !targetBranch || !projectName) {
      reject()
      return
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
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 获取MR列表
 */
export function getMrList({ projectName, privateToken }) {
  return new Promise((resolve, reject) => {
    instance({
      url: `/projects/${encodeURIComponent(projectName)}/merge_requests`,
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

/**
 * 获取MR的一条评论
 */
export function getOneMrComments({ mrId, projectName, privateToken }) {
  return new Promise((resolve, reject) => {
    instance({
      url: `/projects/${encodeURIComponent(
        projectName,
      )}/merge_request/${mrId}/comments`,
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
