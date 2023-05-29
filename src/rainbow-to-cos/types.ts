import type { RainbowKeyValueType } from './helper/value-type';
export interface ISecretInfo {
  appID: string;
  userID: string;
  secretKey: string;
  groupName: string;
  envName: string;
}

export interface ICosInfo {
  secretId: string;
  secretKey: string;
  bucket: string;
  region: string;
  dir: string;
}

export type ILocalConfig = Array<{
  key: string;
  value: string;
}>;


export type IRemoteConfig = {
  key: string;
  value: string;
  valueType: RainbowKeyValueType
};
