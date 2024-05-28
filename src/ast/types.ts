export enum IImportType {
  ImportSpecifier = 'ImportSpecifier',
  ImportDefaultSpecifier= 'ImportDefaultSpecifier',
  importNamespaceSpecifier=  'ImportNamespaceSpecifier',

  FAKE = 'FAKE',
}

export type IImportItem = string | Array<string> | {
  sourceName?: string;
  sourceType?: IImportType;
  targetName?: string;
  targetType?: IImportType;
};

export type IReplaceConfig = {
  importedList: Array<IImportItem>;
  // 源位置
  source: string | Array<string>;
  // 目标位置
  target: string;
};

export type IParsedConfigItem = {
  source: string;
  target: string;

  sourceName: string;
  sourceType: IImportType;
  targetName: string;
  targetType: IImportType;
};
