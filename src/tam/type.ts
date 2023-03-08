export type SecretInfoType = {
  apiKey: string
  loginName: string
  getPwdCode: Function
  encrypt: Function
};

export type ScoreInfoType = {
  ProjectId: number
  ProjectName: string
  PagePv: string | number
  PageUv: string | number
  PageDuration: string | number
  PageError: string | number
  ApiNum: string | number
  ApiFail: string | number
  ApiDuration: string | number
  StaticNum: string | number
  StaticFail: string | number
  StaticDuration: string | number
  Score: string | number
  GroupName: string
  CreateUser: string
  CreateTime: string
  [k: string]: string | number
};
