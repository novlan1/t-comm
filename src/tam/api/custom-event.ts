import { SecretInfoType } from '../type';
import { getCredential } from './credential';
import { nodePost } from '../../util/node-request';


function getCustomEventQuery({
  startTime,
  endTime,
  projectId,
  env = 'production',
}) {
  let envStr = '';
  if (env === 'production') {
    envStr = ' and "env"=\'production\' ';
  }
  return `select delta(count) as allCount from event_url_statistics where time >= ${startTime}s and time <= ${endTime}s and id='${projectId}' ${envStr} group by "name" slimit 1000`;
}


function parseEventData(data) {
  return data.reduce((acc, item) => {
    const key = item.tags?.name;
    if (!key) {
      return acc;
    }

    acc[key] = item.values?.[0]?.[1] || 0;
    return acc;
  }, {});
}

/**
 * 获取自定义事件数据
 * @param {object} options 配置
 * @param {number} options.startTime 开始时间，格式如 1655282977
 * @param {number} options.endTime 结束时间，格式如 1655282977
 * @param {number} options.projectId 项目Id
 * @param {object} options.secretInfo 密钥信息
 * @param {string} [options.env] 环境，默认为production
 * @returns {Promise<object>} 自定义事件数据
 * @example
 *
 * getCustomEventData({
 *   startTime: 1665383837,
 *   endTime: 1665470227,
 *   projectId: 57706,
 *   secretInfo: {
 *     getPwdCode,
 *     encrypt,
 *     apiKey: '',
 *     loginName: '',
 *   },
 * }).then(resp => {
 *   console.log(resp)
 * })
 *
 * // 结果如下：
 *
 * {
 *   AI_PLAYER_EVENT_0: 7319,
 *   AI_PLAYER_EVENT_14: 14,
 *   AI_PLAYER_EVENT_300001: 6600,
 *   AI_PLAYER_EVENT_4: 10,
 *   LAUNCH_GAME_FAIL_QQ: 170,
 *   LAUNCH_GAME_FAIL_WX: 25,
 *   LAUNCH_GAME_SUC_GP_HELPER: 31,
 *   LAUNCH_GAME_SUC_QQ: 1179,
 * }
 */
export async function getCustomEventData({
  startTime,
  endTime,
  projectId,
  env = 'production',
  secretInfo,
}: {
  startTime: number
  endTime: number
  projectId: number
  env?: string
  secretInfo: SecretInfoType
}): Promise<{[key: string]: number}> {
  const credential = await getCredential(secretInfo);

  const result = await nodePost()({
    url: 'http://tamapi.woa.com/api/interface/monitor/queryData',
    json: {
      Namespace: 'TAM-v1',
      Query: getCustomEventQuery({
        startTime,
        endTime,
        projectId,
        env,
      }),
    },
    headers: {
      ...credential,
    },
  });
  let res: any = [];

  try {
    /**
     * res格式为：
     * body: {
     *     Response: {
     *       RequestId: '22561d33ea8254619d56c05a-183c5c8b617',
     *       Result: '{"request_id":"22561d33ea8254619d56c05a-183c5c8b617","results":[]}'
     *     }
     *   },
     */
    res = JSON.parse(result.body.Response.Result) || {};

    /**
      * res：
      * {
      * 	"request_id": "22561d33ea8254619d56c05a-183c5c8b617",
      * 	"results": [{
      * 		"statement_id": 0,
      * 		"series": [{
      * 			"name": "event_url_statistics",
      * 			"tags": {
      * 				"name": "PAGE_INDEX"
      * 			},
      * 			"columns": ["time", "allCount"],
      * 			"values": [
      * 				[0, 13907]
      * 			]
      * 		}, {
      * 			"name": "event_url_statistics",
      * 			"tags": {
      * 				"name": "LAUNCH_GAME_SUC_WX"
      * 			},
      * 			"columns": ["time", "allCount"],
      * 			"values": [
      * 				[0, 94]
      * 			]
      * 		}, {
      * 			"name": "event_url_statistics",
      * 			"tags": {
      * 				"name": "PAGE_AI_ROOM"
      * 			},
      * 			"columns": ["time", "allCount"],
      * 			"values": [
      * 				[0, 1502]
      * 			]
      * 		}],
      * 		"total": 3
      * 	}]
      * }
      */
    res = res?.results?.[0]?.series || [];
  } catch (e) {}

  return parseEventData(res);
}


/**
 * 获取多个项目的自定义事件数据
 * @param options 配置
 */
export async function getMultiCustomEventData({
  startTime,
  endTime,
  env = 'production',
  secretInfo,
  projectIdMap,
}) {
  const res = {};
  const projectIdList = Object.keys(projectIdMap);
  if (!projectIdList.length) return;

  for (const projectId of projectIdList) {
    const list = await getCustomEventData({
      startTime,
      endTime,
      projectId: +projectId,
      env,
      secretInfo,
    });
    res[projectId] = list;
  }

  // 额外数据
  for (const projectId of projectIdList) {
    const info = projectIdMap[projectId];

    if (info.extraProjectId) {
      const extraData = await getCustomEventData({
        startTime,
        endTime,
        projectId: info.extraProjectId,
        env,
        secretInfo,
      });

      res[projectId].extraData = extraData;
    }
  }
  return res;
}
