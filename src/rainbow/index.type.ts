export interface SecretInfo {
  // 密钥相关
  appID: string
  userID: string
  secretKey: string
  // 方便管理
  envName: string
  groupName: string
}

export enum ValueType {
  NUMBER = 1,
  STRING = 2,
  TEXT = 3,
  JSON = 4,
  XML = 5,
  DATE = 18,
  YAML = 20,
}

export interface ModifyConfigParam {
  keyValue: {
    key: string
    value: string
  }
  valueType: ValueType
  secretInfo: SecretInfo
  crypto: any
}
