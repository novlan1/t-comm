export type OptionsType = {
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

  webhookUrl?: string,
  chatId?: string,
  cosInfo?: object,
};