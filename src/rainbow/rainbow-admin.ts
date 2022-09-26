import { baseRequestRainbow } from './helper/rainbow-base-request'
import { getVersion } from './helper/helper'
import { SecretInfo, ValueType, ModifyConfigParam } from './index.type'

/**
 * 添加或更新配置
 *
 * @param config valueType: 1:NUMBER, 2:STRING,3:TEXT,4:JSON,5:XML,18:日期,20:yaml
 * @returns 请求Promise
 */
export function addOrUpdateRainbowKV({
  keyValue,
  valueType = 2,
  secretInfo,
  crypto,
}: ModifyConfigParam) {
  return baseRequestRainbow({
    url: '/adminapi.Config/ChangeKeyReq',
    data: {
      is_sync: false,
      key_values: [
        {
          value_type: valueType,
          config_op_type: 4,
          description: '',
          ...keyValue,
        },
      ],
    },
    secretInfo,
    crypto,
  })
}

/**
 * 增加配置
 *
 * @param config 配置信息
 * @returns 请求Promise
 */
export function addRainbowKV({
  keyValue,
  valueType = 2,
  secretInfo,
  crypto,
}: ModifyConfigParam) {
  return baseRequestRainbow({
    url: '/adminapi.Config/ChangeKeyReq',
    data: {
      is_sync: false,
      key_values: [
        {
          value_type: valueType,
          config_op_type: 2,
          description: '',
          ...keyValue,
        },
      ],
    },
    secretInfo,
    crypto,
  })
}

/**
 * 修改配置
 *
 * @param config - 配置信息
 * @returns 请求Promise
 */
export function updateRainbowKV({
  keyValue,
  valueType = 2,
  secretInfo,
  crypto,
}: ModifyConfigParam) {
  return baseRequestRainbow({
    url: '/adminapi.Config/ChangeKeyReq',
    data: {
      is_sync: false,
      key_values: [
        {
          value_type: valueType, // 1:NUMBER, 2:STRING,3:TEXT,4:JSON,5:XML,18:日期,20：yaml
          config_op_type: 1,
          description: '',
          ...keyValue,
        },
      ],
    },
    secretInfo,
    crypto,
  })
}

/**
 * 创建发布任务
 *
 * @param obj - 配置信息
 * @returns 请求Promise
 */
export function createRainbowPublishJob({ versionName, secretInfo, crypto }) {
  return baseRequestRainbow({
    url: '/adminapi.Config/CreateReleaseTaskReq',
    data: {
      creator: 'guowangyang',
      approvers: 'guowangyang',
      version_name: versionName,
      type: 0,
    },
    secretInfo,
    crypto,
  })
}

/**
 * 发布任务
 *
 * @param obj - 配置信息
 * @returns 请求Promise
 */
export function publishRainbowTask({ taskId, secretInfo, crypto }) {
  return baseRequestRainbow({
    url: '/adminapi.Release/ReleaseMainTaskReq',
    data: {
      task_id: taskId,
    },
    secretInfo,
    crypto,
  })
}

/**
 * 关闭任务
 *
 * @param obj - 配置信息
 * @returns 请求Promise
 */
export function closeRainbowTask({ taskId, secretInfo, crypto }) {
  return baseRequestRainbow({
    url: '/adminapi.Release/CloseReleaseTaskReq',
    data: {
      task_id: taskId,
    },
    secretInfo,
    crypto,
  })
}

/**
 * 修改值并发布
 *
 * @param obj 配置信息
 */
export async function updateRainbowKVAndPublish({
  key,
  value,
  valueType,
  secretInfo,
  crypto,
}: {
  key: string
  value: string
  valueType: ValueType
  secretInfo: SecretInfo
  crypto: any
}) {
  try {
    await addOrUpdateRainbowKV({
      keyValue: {
        key,
        value,
      },
      valueType,
      secretInfo,
      crypto,
    })
    const taskRes: any = await createRainbowPublishJob({
      versionName: getVersion(),
      secretInfo,
      crypto,
    })
    await publishRainbowTask({
      taskId: taskRes.task_id,
      secretInfo,
      crypto,
    })
    await closeRainbowTask({
      taskId: taskRes.task_id,
      secretInfo,
      crypto,
    })
    return taskRes
  } catch (err) {
    return Promise.reject(err)
  }
}

// 查询分组配置
export function queryGroupInfo({ secretInfo, crypto }) {
  return new Promise((resolve, reject) => {
    baseRequestRainbow({
      url: '/adminapi.Config/QueryGroupInfoReq',
      data: {},
      secretInfo,
      crypto,
    })
      .then((res: any) => {
        const keyValues = res.config_infos?.[0]?.key_values || []
        resolve(keyValues)
      })
      .catch(err => {
        reject(err)
      })
  })
}
