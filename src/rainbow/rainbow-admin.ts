import { baseRequestRainbow } from './rainbow-base-request'
import { getVersion } from './helper'
import { SecretInfo, ValueType, ModifyConfigParem } from './index.type'

/**
 * 添加或更新配置
 *
 * @param config valueType: 1:NUMBER, 2:STRING,3:TEXT,4:JSON,5:XML,18:日期,20:yaml
 * @returns
 */
export function addOrUpdateRainbowKV({
  keyValue,
  valueType = 2,
  secretInfo,
}: ModifyConfigParem) {
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
  })
}

/**
 * 增加配置
 *
 * @param config 配置信息
 * @returns
 */
export function addRainbowKV({
  keyValue,
  valueType = 2,
  secretInfo,
}: ModifyConfigParem) {
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
  })
}

/**
 * 修改配置
 *
 * @param config - 配置信息
 * @returns
 */
export function updateRainbowKV({
  keyValue,
  valueType = 2,
  secretInfo,
}: ModifyConfigParem) {
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
  })
}

/**
 * 创建发布任务
 *
 * @param obj - 配置信息
 * @returns
 */
export function createRainbowPublishJob({ versionName, secretInfo }) {
  return baseRequestRainbow({
    url: '/adminapi.Config/CreateReleaseTaskReq',
    data: {
      creator: 'guowangyang',
      approvers: 'guowangyang',
      version_name: versionName,
      type: 0,
    },
    secretInfo,
  })
}

/**
 * 发布任务
 *
 * @param obj - 配置信息
 * @returns
 */
export function publishRainbowTask({ taskId, secretInfo }) {
  return baseRequestRainbow({
    url: '/adminapi.Release/ReleaseMainTaskReq',
    data: {
      task_id: taskId,
    },
    secretInfo,
  })
}

/**
 * 关闭任务
 *
 * @param obj - 配置信息
 * @returns
 */
export function closeRainbowTask({ taskId, secretInfo }) {
  return baseRequestRainbow({
    url: '/adminapi.Release/CloseReleaseTaskReq',
    data: {
      task_id: taskId,
    },
    secretInfo,
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
}: {
  key: string
  value: string
  valueType: ValueType
  secretInfo: SecretInfo
}) {
  try {
    await addOrUpdateRainbowKV({
      keyValue: {
        key,
        value,
      },
      valueType,
      secretInfo,
    })
    const taskRes: any = await createRainbowPublishJob({
      versionName: getVersion(),
      secretInfo,
    })
    await publishRainbowTask({
      taskId: taskRes.task_id,
      secretInfo,
    })
    await closeRainbowTask({
      taskId: taskRes.task_id,
      secretInfo,
    })
    return taskRes
  } catch (err) {
    return Promise.reject(err)
  }
}

// 查询分组配置
export function queryGroupInfo({ secretInfo }) {
  return new Promise((resolve, reject) => {
    baseRequestRainbow({
      url: '/adminapi.Config/QueryGroupInfoReq',
      data: {},
      secretInfo,
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
