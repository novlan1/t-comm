/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * 启动流水线
 *
 * @param {object} config 配置信息
 * @param {string} config.buildId 流水线构建Id
 * @param {object} config.data 携带的数据
 * @returns Promise
 *
 * @example
 *
 * startPipeline({
 *   buildId,
 *   data: {}
 * }).then(() => {
 *
 * })
 * ```
 */
export function startPipeline({
  buildId,
  data = {},
}: {
  buildId: string;
  data: Record<string, any>
}) {
  return new Promise((resolve, reject) => {
    if (!buildId) {
      reject(new Error('缺少buildId'));
      return;
    }
    const pipelineUrl = `http://devops.oa.com/ms/process/api/external/pipelines/${buildId}/build`;
    const axios = require('axios');

    axios
      .post(pipelineUrl, {
        ...data,
      })
      .then((res: {
        data: unknown
      }) => {
        resolve(res.data);
      })
      .catch((err: unknown) => {
        reject(err);
      });
  });
}
