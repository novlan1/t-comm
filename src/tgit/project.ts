import { instance } from './helper';

/**
 * 获取仓库详情
 * @param {object} options 输入配置
 * @param {string} options.projectName 项目名称
 * @param {string} options.privateToken 密钥
 * @returns {Promise<object>} 请求Promise
 * @example
 * getOneProjectDetail({
 *   projectName: 't-comm',
 *   privateToken: 'xxxxx',
 * }).then((resp) => {
 *
 * })
 */
export function getOneProjectDetail({
  projectName,
  privateToken,
  baseUrl,
}: {
  projectName: string;
  privateToken: string;
  baseUrl?: string;
}) {
  let url = `/api/v3/projects/${encodeURIComponent(projectName)}`;
  if (baseUrl) {
    url = `${baseUrl}${url}`;
  }
  return new Promise((resolve, reject) => {
    instance({
      url,
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
 * @returns {Promise<Array<object>>} 请求Promise
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
  privateToken,
  page = 1,
}: {
  search: string
  privateToken: string;
  page?: number;
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
 * @param {string} search 搜索内容
 * @returns {Array<object>} 项目列表
 * @example
 *
 * const projects = await getAllProjects('xxxxx');
 *
 * console.log(projects)
 */
export async function getAllProjects(privateToken: string, search = ''): Promise<Array<object>> {
  let res: Array<object> = [];
  let page = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const temp = await getOneProjectBySearch({
      page,
      search,
      privateToken,
    });
    res = res.concat(temp);
    page += 1;
    if (!temp?.length) {
      break;
    }
  }
  return res;
}

/**
 * 删除一个项目
 * @param {object} options 输入配置
 * @param {string} options.id 项目id
 * @param {string} options.privateToken 密钥
 * @returns {Promise<Array<object>>} 请求Promise
 * @example
 *
 * deleteTGitProject({
 *   id: '123'
 *   privateToken: 'xxxxx',
 * }).then((resp) => {
 *
 * })
 */
export function deleteTGitProject({
  id,
  privateToken,
}: {
  id: number | string
  privateToken: string
}): Promise<Array<object>> {
  return new Promise((resolve, reject) => {
    instance({
      url: `/projects/${encodeURIComponent(id)}`,
      method: 'DELETE',
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
