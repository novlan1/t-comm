import { instance } from './helper';

/**
 * 获取仓库详情
 * @param {object} options 输入配置
 * @param {string} options.projectName 项目名称
 * @param {string} options.privateToken 密钥
 * @return {Promise<object>} 请求Promise
 * @example
 * getOneProjectDetail({
 *   projectName: 't-comm',
 *   privateToken: 'xxxxx',
 * }).then((resp) => {
 *
 * })
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
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 通过搜索获取一个项目信息
 * @param {object} options 输入配置
 * @param {string} options.search 搜索内容
 * @param {string} options.page 起始页码
 * @param {string} options.privateToken 密钥
 * @return {Promise<Array<object>>} 请求Promise
 * @example
 *
 * getOneProjectBySearch({
 *   search: 't-comm',
 *   page: 1,
 *   privateToken: 'xxxxx',
 * }).then((resp) => {
 *
 * })
 */
export function getOneProjectBySearch({
  search,
  page = 1,
  privateToken,
}): Promise<Array<object>> {
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
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 获取某个token名下所有项目
 * @param {string} privateToken 密钥
 * @return {Array<object>} 项目列表
 * @example
 *
 * const projects = await getAllProjects('xxxxx');
 *
 * console.log(projects)
 */
export async function getAllProjects(privateToken: string): Promise<Array<object>> {
  let res: Array<object> = [];
  let page = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const temp = await getOneProjectBySearch({
      page,
      search: '',
      privateToken,
    });
    res = res.concat(temp);
    page += 1;
    if (!temp || !temp.length) {
      break;
    }
  }
  return res;
}
