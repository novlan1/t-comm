export type SecretInfoType = {
  apiKey: string
  loginName: string
  rumSecretId: string;
  rumSecretKey: string;
  getPwdCode: Function
  encrypt: Function
};

export type ScoreInfoType = {
  ProjectId: number
  ProjectName: string
  PagePv: number
  PageUv: number
  PageDuration: number
  PageError: number
  ApiNum: number
  ApiFail: number
  ApiDuration: number
  StaticNum: number
  StaticFail: number
  StaticDuration: number
  Score: number
  GroupName: string
  CreateUser: string
  CreateTime: string
  [k: string]: string | number
};
