import type { IGitCommitInfo } from '../git/types';


export type OptionsType = {
  ci?: any;
  appId: string
  appName?: string
  robotNumber: number,

  projectPath?: string,
  privateKeyPath?: string,
  ignores?: Array<string>
  type?: string,
  root?: string,
  env?: string,

  buildSetting?: object,
  buildDesc?: string;
  version?: string;
  commitInfo?: Partial<IGitCommitInfo>;

  webhookUrl?: string,
  chatId?: string,
  cosInfo?: object,

  errorLink?: string

  pagePath?: string;
  searchQuery?: string;
};


export interface IUploadResult {
  subPackageInfo: Array<{
    name: string;
    size: number;
  }>
}
