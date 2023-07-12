export interface ISecretInfo {
  appCode: string;
  appSecret: string;
  devopsUid: string;
}


export type IRemoteInstances = Array<{
  templateId: string;
  versionName: string;
  version: number;
  pipelineId: string;
  pipelineName: string;
  updateTime: number;
  hasPermission: boolean;
  status: string;
}>;
