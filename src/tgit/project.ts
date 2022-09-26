import { instance } from './helper'

/**
 * 获取仓库详情
 * @param object - 包含 projectName、privateToken 的对象
 * @returns 请求Promise
 */
export function getOneProjectDetail({ projectName, privateToken }) {
  return new Promise((resolve, reject) => {
    instance({
      url: `/projects/${encodeURIComponent(projectName)}`,
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
 * 获取一个项目
 */
export function getOneProjectBySearch({
  search,
  page = 1,
  privateToken,
}): Promise<any> {
  return new Promise((resolve, reject) => {
    instance({
      url: '/projects',
      method: 'GET',
      params: {
        per_page: 100,
        search,
        page,
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
 * 获取所有项目
 */
export async function getAllProjects(privateToken) {
  let res = []
  let page = 1
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const temp = await getOneProjectBySearch({
      page,
      search: '',
      privateToken,
    })
    res = res.concat(temp)
    page += 1
    if (!temp || !temp.length) {
      break
    }
  }
  return res
}
