import { baseRequestRainbow } from './helper/rainbow-base-request';
import { getVersion } from './helper/helper';
import { SecretInfo, ValueType, ModifyConfigParam } from './index.type';

/**
 * 添加或更新配置
 *
 * @param {object} config 配置信息
 * @param {object} config.keyValue 配置对象
 * @param {string} config.keyValue.key 配置的key
 * @param {string} config.keyValue.value 配置的value
 * @param {number} config.valueType 配置类型，1: NUMBER, 2: STRING, 3: TEXT, 4: JSON, 5: XML, 18: 日期, 20: yaml
 * @param {object} config.secretInfo 密钥信息
 * @param {string} config.secretInfo.appId 项目Id
 * @param {string} config.secretInfo.userId 用户Id
 * @param {string} config.secretInfo.secretKey 密钥
 * @param {string} config.secretInfo.envName 配置环境
 * @param {string} config.secretInfo.groupName 配置组
 * @returns {Promise<object>} 请求Promise
 *
 * @example
 * addOrUpdateRainbowKV({
 *   keyValue: {
 *     key: 'theKey',
 *     value: 'theValue',
 *   },
 *   valueType: 2,
 *   secretInfo: {
 *     appId: 'xxx',
 *     userId: 'xxx',
 *     secretKey: 'xxx',
 *     envName: 'prod',
 *     groupName: 'xxx',
 *   }
 * }).then(() => {
 *
 * })
 */
export function addOrUpdateRainbowKV({
  keyValue,
  valueType = 2,
  secretInfo,
}: ModifyConfigParam): Promise<object> {
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
  });
}

/**
 * 增加配置
 *
 * @param {object} config 配置信息
 * @param {object} config.keyValue 配置对象
 * @param {string} config.keyValue.key 配置的key
 * @param {string} config.keyValue.value 配置的value
 * @param {number} config.valueType 配置类型，1: NUMBER, 2: STRING, 3: TEXT, 4: JSON, 5: XML, 18: 日期, 20: yaml
 * @param {object} config.secretInfo 密钥信息
 * @param {string} config.secretInfo.appId 项目Id
 * @param {string} config.secretInfo.userId 用户Id
 * @param {string} config.secretInfo.secretKey 密钥
 * @param {string} config.secretInfo.envName 配置环境
 * @param {string} config.secretInfo.groupName 配置组
 * @returns {Promise<object>} 请求Promise
 *
 * @example
 * addRainbowKV({
 *   keyValue: {
 *     key: 'theKey',
 *     value: 'theValue',
 *   },
 *   valueType: 2,
 *   secretInfo: {
 *     appId: 'xxx',
 *     userId: 'xxx',
 *     secretKey: 'xxx',
 *     envName: 'prod',
 *     groupName: 'xxx',
 *   }
 * }).then(() => {
 *
 * })
 */
export function addRainbowKV({
  keyValue,
  valueType = 2,
  secretInfo,
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
  });
}

/**
 * 修改配置
 * @param {object} config 配置信息
 * @param {object} config.keyValue 配置对象
 * @param {string} config.keyValue.key 配置的key
 * @param {string} config.keyValue.value 配置的value
 * @param {number} config.valueType 配置类型，1: NUMBER, 2: STRING, 3: TEXT, 4: JSON, 5: XML, 18: 日期, 20: yaml
 * @param {object} config.secretInfo 密钥信息
 * @param {string} config.secretInfo.appId 项目Id
 * @param {string} config.secretInfo.userId 用户Id
 * @param {string} config.secretInfo.secretKey 密钥
 * @param {string} config.secretInfo.envName 配置环境
 * @param {string} config.secretInfo.groupName 配置组
 * @returns {Promise<object>} 请求Promise
 *
 * @example
 * updateRainbowKV({
 *   keyValue: {
 *     key: 'theKey',
 *     value: 'theValue',
 *   },
 *   valueType: 2,
 *   secretInfo: {
 *     appId: 'xxx',
 *     userId: 'xxx',
 *     secretKey: 'xxx',
 *     envName: 'prod',
 *     groupName: 'xxx',
 *   }
 * }).then(() => {
 *
 * })
 */
export function updateRainbowKV({
  keyValue,
  valueType = 2,
  secretInfo,
}: ModifyConfigParam) {
  return baseRequestRainbow({
    url: '/adminapi.Config/ChangeKeyReq',
    data: {
      is_sync: false,
      key_values: [
        {
          value_type: valueType,
          config_op_type: 1,
          description: '',
          ...keyValue,
        },
      ],
    },
    secretInfo,
  });
}

/**
 * 创建发布任务
 *
 * @param {object} config 配置信息
 * @param {string} config.versionName 版本信息
 * @param {object} config.secretInfo 密钥信息
 * @param {string} config.secretInfo.appId 项目Id
 * @param {string} config.secretInfo.userId 用户Id
 * @param {string} config.secretInfo.secretKey 密钥
 * @param {string} config.secretInfo.envName 配置环境
 * @param {string} config.secretInfo.groupName 配置组
 * @returns {Promise<object>} 请求Promise
 *
 * @example
 * createRainbowPublishJob({
 *   versionName: 'version',
 *   secretInfo: {
 *     appId: 'xxx',
 *     userId: 'xxx',
 *     secretKey: 'xxx',
 *     envName: 'prod',
 *     groupName: 'xxx',
 *   }
 * }).then(() => {
 *
 * })
 */
export function createRainbowPublishJob({
  versionName,
  secretInfo,
  creator,
  approvers,
  type = 0,
}) {
  return baseRequestRainbow({
    url: '/adminapi.Config/CreateReleaseTaskReq',
    data: {
      creator,
      approvers,
      version_name: versionName,
      type,
    },
    secretInfo,
  });
}

/**
 * 发布任务
 *
 * @param {object} config 配置信息
 * @param {string} config.taskId 任务Id
 * @param {object} config.secretInfo 密钥信息
 * @param {string} config.secretInfo.appId 项目Id
 * @param {string} config.secretInfo.userId 用户Id
 * @param {string} config.secretInfo.secretKey 密钥
 * @param {string} config.secretInfo.envName 配置环境
 * @param {string} config.secretInfo.groupName 配置组
 * @returns {Promise<object>} 请求Promise
 *
 * @example
 * publishRainbowTask({
 *   taskId: 'taskId',
 *   secretInfo: {
 *     appId: 'xxx',
 *     userId: 'xxx',
 *     secretKey: 'xxx',
 *     envName: 'prod',
 *     groupName: 'xxx',
 *   }
 * }).then(() => {
 *
 * })
 */
export function publishRainbowTask({ taskId, secretInfo }) {
  return baseRequestRainbow({
    url: '/adminapi.Release/ReleaseMainTaskReq',
    data: {
      task_id: taskId,
    },
    secretInfo,
  });
}

/**
 * 关闭任务
 *
 * @param {object} config 配置信息
 * @param {string} config.taskId 任务Id
 * @param {object} config.secretInfo 密钥信息
 * @param {string} config.secretInfo.appId 项目Id
 * @param {string} config.secretInfo.userId 用户Id
 * @param {string} config.secretInfo.secretKey 密钥
 * @param {string} config.secretInfo.envName 配置环境
 * @param {string} config.secretInfo.groupName 配置组
 * @returns {Promise<object>} 请求Promise
 *
 * @example
 * closeRainbowTask({
 *   taskId: 'taskId',
 *   secretInfo: {
 *     appId: 'xxx',
 *     userId: 'xxx',
 *     secretKey: 'xxx',
 *     envName: 'prod',
 *     groupName: 'xxx',
 *   }
 * }).then(() => {
 *
 * })
 */
export function closeRainbowTask({ taskId, secretInfo }) {
  return baseRequestRainbow({
    url: '/adminapi.Release/CloseReleaseTaskReq',
    data: {
      task_id: taskId,
    },
    secretInfo,
  });
}

/**
 * 更新或新增值并发布
 * @param {object} config 配置信息
 * @param {string} config.key 配置key
 * @param {string} config.value 配置value
 * @param {number} config.valueType 配置类型，1: NUMBER, 2: STRING, 3: TEXT, 4: JSON, 5: XML, 18: 日期, 20: yaml
 * @param {object} config.secretInfo 密钥信息
 * @param {string} config.secretInfo.appId 项目Id
 * @param {string} config.secretInfo.userId 用户Id
 * @param {string} config.secretInfo.secretKey 密钥
 * @param {string} config.secretInfo.envName 配置环境
 * @param {string} config.secretInfo.groupName 配置组
 * @returns {Promise<object>} 请求Promise
 *
 * @example
 * updateRainbowKVAndPublish({
 *   key: 'key',
 *   value: 'value',
 *   valueType: 2,
 *   secretInfo: {
 *     appId: 'xxx',
 *     userId: 'xxx',
 *     secretKey: 'xxx',
 *     envName: 'prod',
 *     groupName: 'xxx',
 *   }
 * }).then(() => {
 *
 * })
 */
export async function updateRainbowKVAndPublish({
  key,
  value,
  valueType,
  secretInfo,
  creator,
  approvers,
}: {
  key: string
  value: string
  valueType: ValueType
  secretInfo: SecretInfo
  creator: string
  approvers: string
}) {
  try {
    await addOrUpdateRainbowKV({
      keyValue: {
        key,
        value,
      },
      valueType,
      secretInfo,
    });
    const versionName =  getVersion();
    const taskRes: any = await createRainbowPublishJob({
      creator,
      approvers,
      versionName,
      secretInfo,
    });
    const taskId = taskRes.task_id;
    await ApprovalRainbowReleaseTask({
      secretInfo,
      taskId,
      versionName,
    });
    await publishRainbowTask({
      taskId,
      secretInfo,
    });
    await closeRainbowTask({
      taskId,
      secretInfo,
    });
    return taskRes;
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * 查询分组配置
 * @param {object} config 配置信息
 * @param {object} config.secretInfo 密钥信息
 * @param {string} config.secretInfo.appId 项目Id
 * @param {string} config.secretInfo.userId 用户Id
 * @param {string} config.secretInfo.secretKey 密钥
 * @param {string} config.secretInfo.envName 配置环境
 * @param {string} config.secretInfo.groupName 配置组
 * @returns {Promise<Array<object>>} 分组配置
 *
 * @example
 * queryGroupInfo({
 *   secretInfo: {
 *     appId: 'xxx',
 *     userId: 'xxx',
 *     secretKey: 'xxx',
 *     envName: 'prod',
 *     groupName: 'xxx',
 *   }
 * }).then(() => {
 *
 * })
 */
export function queryGroupInfo({ secretInfo }): Promise<Array<{key: string, value: string, value_type: number}>>  {
  return new Promise((resolve, reject) => {
    baseRequestRainbow({
      url: '/adminapi.Config/QueryGroupInfoReq',
      data: {},
      secretInfo,
    })
      .then((res: any) => {
        const keyValues = res.config_infos?.[0]?.key_values || [];
        resolve(keyValues);
      })
      .catch((err) => {
        reject(err);
      });
  });
}


export function OneClickReleaseRainbowTask({
  secretInfo,
  versionName,
  creator,
  updators,
  approvers,
  type = 0,
  description = '',
}) {
  return baseRequestRainbow({
    url: '/adminapi.Config/OneClickReleaseTaskReq',
    data: {
      version_name: versionName,
      creator,
      updators,
      approvers,
      type,
      description,
    },
    secretInfo,
  });
}


export function ApprovalRainbowReleaseTask({
  secretInfo,
  taskId,
  versionName,
  status = 3,
  rejectReason = '',
}) {
  return baseRequestRainbow({
    url: '/adminapi.Release/ApprovalReleaseTaskReq',
    data: {
      task_id: taskId,
      status,
      reject_reason: rejectReason,
      version_name: versionName,
    },
    secretInfo,
  });
}
