import { SecretInfoType, ScoreInfoType } from '../type';
import { getCredential } from './credential';
import { nodeGet } from '../../util/node-request';


/**
 * 根据项目id获取分数信息
 * @ignore
 * @param {object} options 参数
 * @param {Array<number>} options.projectIdList 项目Id列表
 * @param {string} options.date 日期，yyyyMMdd格式
 * @param {object} options.secretInfo 密钥信息
 * @param {string} options.secretInfo.apiKey apiKey
 * @param {string} options.secretInfo.loginName loginName
 * @param {Function} options.secretInfo.getPwdCode getPwdCode
 * @param {Function} options.secretInfo.encrypt encrypt
 * @returns {Promise<Array<object>>} 分数信息
 * @example
 * getScoreInfoByProjectId({
 *   projectId: 123123,
 *   date: 20210106
 *   secretInfo: {
 *     apiKey: '',
 *     loginName: '',
 *     getPwdCode() {},
 *     encrypt() {},
 *   }
 * }).then((data) => {
 *   console.log(data)
 * })
 *
 * [
 *   {
 *     ProjectName: '社区',
 *     PagePv: 99,
 *     PageError: 0,
 *     PageDuration: 1409.8333,
 *     StaticFail: 8,
 *     CreateTime: '',
 *     ProjectId: 123123,
 *     PageUv: 23,
 *     ApiNum: 521,
 *     ApiFail: 78,
 *     ApiDuration: 1813.3333,
 *     StaticNum: 1494,
 *     StaticDuration: 103.75,
 *     Score: 80.9167,
 *     CreateUser: 'lee',
 *     GroupName: 'aGroup',
 *   },
 * ]
 *
 */
async function getScoreInfoByProjectId({
  projectId,
  startDate,
  secretInfo,
}: {
  projectId: number
  startDate: string
  secretInfo: SecretInfoType
}) {
  const credential = await getCredential(secretInfo);

  const result = await nodeGet()({
    url: `http://tamapi.woa.com/api/interface/pro/scoreInfo?projectID=${projectId}&startDate=${startDate}`,
    headers: {
      ...credential,
    },
  });

  let res = [];
  try {
    res = JSON.parse(result.body).message || [];
  } catch (e) {}
  return res;
}

/**
 * 根据 groupId 获取项目列表
 * @ignore
 * @param {object} options 配置
 * @param {number} options.groupId 小组Id
 * @param {object} options.secretInfo 密钥信息
 * @param {string} options.secretInfo.apiKey apiKey
 * @param {string} options.secretInfo.loginName loginName
 * @param {Function} options.secretInfo.getPwdCode getPwdCode
 * @param {Function} options.secretInfo.encrypt encrypt
 * @returns {Promise<array<object>>} 项目列表
 * @example
 * getProjectByGroupId({
 *   groupId: 1,
 *   secretInfo: {
 *     apiKey: '',
 *     loginName: '',
 *     getPwdCode() {},
 *     encrypt() {},
 *   }
 * }).then(resp => {
 *   console.log(resp)
 * })
 * [
 *   {
 *     ID: 56564,
 *     ProjectName: 'name',
 *     ProjectDesc: 'desc',
 *     ProjectKey: 'xxx',
 *     ProjectType: 'web',
 *     GroupId: 123,
 *     GroupName: 'xxx',
 *     GroupKey: 'xxx',
 *     InstanceID: 'rum-xxx',
 *     Url: '*.qq.com',
 *     CodePath: '',
 *     Rate: '100',
 *     CreateUser: 'xxx',
 *     EnableUrlGroup: true,
 *     KafkaHost: '',
 *     KafkaTopic: '',
 *     KafkaVersion: '',
 *     SaslUserName: '',
 *     SaslPassword: '',
 *     SaslMechanism: '',
 *     IsFollow: false,
 *     CreateTime: '2021-10-01T11:34:32+08:00',
 *   },
 *   {
 *     ID: 12345,
 *     // ...
 *   },
 * ];
 *
 */
async function getProjectByGroupId({
  groupId,
  secretInfo,
}: {
  groupId: number
  secretInfo: SecretInfoType
}) {
  const credential = await getCredential(secretInfo);

  const result = await nodeGet()({
    url: ` http://tamapi.woa.com/api/interface/pro/list?groupID=${groupId}`,
    headers: {
      ...credential,
    },
  });
  let res = [];
  try {
    res = JSON.parse(result.body).result || [];
  } catch (e) {}
  return res;
}

/**
 * 根据 groupIdList 获取 projectList
 * @ignore
 * @param {object} options 配置
 * @param {Array<number>} options.groupIdList 小组Id列表
 * @param {object} options.secretInfo 密钥信息
 * @param {string} options.secretInfo.apiKey apiKey
 * @param {string} options.secretInfo.loginName loginName
 * @param {Function} options.secretInfo.getPwdCode getPwdCode
 * @param {Function} options.secretInfo.encrypt encrypt
 * @returns {Array<object>} 项目列表
 * @example
 * getAllProjectList({
 *   groupIdList: [1,2,3],
 *   secretInfo: {
 *     apiKey: '',
 *     loginName: '',
 *     getPwdCode() {},
 *     encrypt() {},
 *   }
 * }).then(resp => {
 *   console.log('resp)
 * })
 * [
 *   {
 *     ID: 56564,
 *     ProjectName: 'name',
 *     ProjectDesc: 'desc',
 *     ProjectKey: 'xxx',
 *     ProjectType: 'web',
 *     GroupId: 123,
 *     GroupName: 'xxx',
 *     GroupKey: 'xxx',
 *     InstanceID: 'rum-xxx',
 *     Url: '*.qq.com',
 *     CodePath: '',
 *     Rate: '100',
 *     CreateUser: 'xxx',
 *     EnableUrlGroup: true,
 *     KafkaHost: '',
 *     KafkaTopic: '',
 *     KafkaVersion: '',
 *     SaslUserName: '',
 *     SaslPassword: '',
 *     SaslMechanism: '',
 *     IsFollow: false,
 *     CreateTime: '2021-10-01T11:34:32+08:00',
 *   },
 *   {
 *     ID: 12345,
 *     // ...
 *   },
 * ];
 */
async function getAllProjectList({
  groupIdList,
  secretInfo,
}: {
  groupIdList: Array<number>
  secretInfo: SecretInfoType
}): Promise<Array<{ID: number}>> {
  const res: Array<{ID: number}> = [];
  for (const groupId of groupIdList) {
    const projectList = await getProjectByGroupId({
      groupId,
      secretInfo,
    });
    res.push(...(projectList || []));
  }
  return res;
}


/**
 * 根据 projectIdList 获取一天的汇总分数
 * @ignore
 * @param {object} options 参数
 * @param {Array<number>} options.projectIdList 项目Id列表
 * @param {string} options.date 日期，yyyyMMdd格式
 * @param {object} options.secretInfo 密钥信息
 * @param {string} options.secretInfo.apiKey apiKey
 * @param {string} options.secretInfo.loginName loginName
 * @param {Function} options.secretInfo.getPwdCode getPwdCode
 * @param {Function} options.secretInfo.encrypt encrypt
 * @returns {Promise<Array<object>>} 分数列表
 *
 * @example
 * getSummaryScoreByProjectIdList({
 *   projectIdList: [123123, 111],
 *   date: 20210106
 *   secretInfo: {
 *     apiKey: '',
 *     loginName: '',
 *     getPwdCode() {},
 *     encrypt() {},
 *   }
 * }).then((data) => {
 *   console.log(data)
 * })
 *
 * [
 *   {
 *     ProjectName: 'name',
 *     PagePv: 99,
 *     PageError: 0,
 *     PageDuration: 1409.8333,
 *     StaticFail: 8,
 *     CreateTime: '',
 *     ProjectId: 123123,
 *     PageUv: 23,
 *     ApiNum: 521,
 *     ApiFail: 78,
 *     ApiDuration: 1813.3333,
 *     StaticNum: 1494,
 *     StaticDuration: 103.75,
 *     Score: 80.9167,
 *     CreateUser: 'xxx',
 *     GroupName: 'xxx',
 *   },
 *   {
 *     // ...
 *   }
 * ]
 */
async function getSummaryScoreByProjectIdList({
  projectIdList,
  date,
  secretInfo,
}: {
  projectIdList: Array<number>
  date: string
  secretInfo: SecretInfoType
}) {
  const res = [];
  for (const projectId of projectIdList) {
    const temp = await getScoreInfoByProjectId({ projectId, startDate: date, secretInfo });
    res.push(...(temp || []));
  }
  return res;
}

/**
 * 根据 groupIdList 获取汇总数据
 * @param {object} options 配置
 * @param {string} options.date 日期，yyyyMMdd格式
 * @param {Array<number>} options.groupIdList groupId列表
 * @param {object} options.secretInfo 密钥信息
 * @param {string} options.secretInfo.apiKey apiKey
 * @param {string} options.secretInfo.loginName loginName
 * @param {Function} options.secretInfo.getPwdCode getPwdCode
 * @param {Function} options.secretInfo.encrypt encrypt
 * @returns {Promise<({ data: object, projectIdList: Array<number> })>} 汇总数据
 * @example
 * getSummaryScoreByGroupIdList({
 *   groupIdList: [1,2,3],
 *   date: '20210106',
 *   secretInfo: {
 *     apiKey: '',
 *     loginName: '',
 *     getPwdCode() {},
 *     encrypt() {},
 *   }
 * }).then(resp => {
 *   console.log(resp)
 * })
 *
 * {
 *   data:
 *   [
 *     {
 *       ProjectName: '社区',
 *       PagePv: 99,
 *       PageError: 0,
 *       PageDuration: 1409.8333,
 *       StaticFail: 8,
 *       CreateTime: '',
 *       ProjectId: 123123,
 *       PageUv: 23,
 *       ApiNum: 521,
 *       ApiFail: 78,
 *       ApiDuration: 1813.3333,
 *       StaticNum: 1494,
 *       StaticDuration: 103.75,
 *       Score: 80.9167,
 *       CreateUser: 'lee',
 *       GroupName: 'aGroup',
 *     },
 *     {
 *       ProjectId: 123,
 *       // ...
 *     },
 *   ],
 *   projectIdList: [
 *     123123,
 *     123,
 *   ],
 * };
 *
 */
export async function getSummaryScoreByGroupIdList({
  date,
  groupIdList,
  secretInfo,
}: {
  date: string
  groupIdList: Array<number>
  secretInfo: SecretInfoType
}): Promise<({ data: Array<ScoreInfoType>, projectIdList: Array<number> })> {
  const projectList = await getAllProjectList({
    groupIdList,
    secretInfo,
  });
  const projectIdList = projectList.map(item => item.ID);
  const res = await getSummaryScoreByProjectIdList({
    date,
    projectIdList,
    secretInfo,
  });

  return { data: res, projectIdList };
}
