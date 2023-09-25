export type IPostFileOptions = {
  host: string;
  port: string;
  path: string;
  method?: string;
};

export type IPublishOptions = IPostFileOptions & {
  publishEnv?: string;
  publishTargetDir?: string;
  fileTar?: string;
  fileDir?: string;
};
