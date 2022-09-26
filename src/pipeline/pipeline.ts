// eslint-disable-next-line @typescript-eslint/no-require-imports
const axios = require('axios');

/**
 * 启动流水线
 *
 * @param config - buildId: 流水线构建Id， data：携带的数据
 * @returns Promise
 *
 * @example
 * ```ts
 *
 * startPipeline({
 *  buildId,
 *  data: {}
 * }).then(() => {
 *
 * })
 * ```
 */
export function startPipeline({ buildId, data = {} }) {
  const pipelineUrl = `http://devops.oa.com/ms/process/api/external/pipelines/${buildId}/build`;

  return new Promise((resolve, reject) => {
    if (!buildId) {
      reject(new Error('缺少buildId'));
      return;
    }

    axios
      .post(pipelineUrl, {
        ...data,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
