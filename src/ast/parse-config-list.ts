import { IImportItem, IImportType, IReplaceConfig } from './types';


function parseOneReplaceConfig(config: IImportItem): {
  sourceName: string;
  sourceType: IImportType;
  targetName: string;
  targetType: IImportType;
} {
  if (typeof config === 'string') {
    return {
      sourceName: config,
      sourceType: IImportType.ImportSpecifier,
      targetName: config,
      targetType: IImportType.ImportSpecifier,
    };
  }
  if (Array.isArray(config)) {
    return {
      sourceName: config[0],
      sourceType: IImportType.ImportSpecifier,
      targetName: config[1] || config[0],
      targetType: IImportType.ImportSpecifier,
    };
  }

  return {
    sourceName: config.sourceName || '',
    sourceType: config.sourceType || IImportType.ImportSpecifier,
    targetName: config.targetName || config.sourceName || '',
    targetType: config.targetType || config.sourceType || IImportType.ImportSpecifier,
  };
}


/**
 * 解析替换配置
 *
 * @param {Array<IReplaceConfig>} configList 配置列表
 * @returns {array} 处理后的配置列表
 *
 * @example
 * ```ts
 * parseReplaceConfig([{
 *   source: '',
 *   target: '',
 * }])
 * ```
 */
export function parseReplaceConfig(configList: Array<IReplaceConfig>) {
  const result = configList.reduce((acc: Array<{
    source: Array<string>;
    target: string;
    sourceName: string;
    sourceType: IImportType;
    targetName: string;
    targetType: IImportType;
  }>, item) => {
    const { importedList, source, target } = item;
    const newSource = Array.isArray(source) ? source : [source];

    const list = importedList.map(item => ({
      source: newSource,
      target,
      ...parseOneReplaceConfig(item),
    }));

    if (!importedList.length) {
      acc.push({
        ...item,
        source: newSource,
        sourceName: 'FAKE',
        targetName: 'FAKE',
        sourceType: IImportType.FAKE,
        targetType: IImportType.FAKE,
      });
    } else {
      acc.push(...list);
    }

    return acc;
  }, []);

  const newResult = result.reduce((acc: Array<{
    source: string;
    target: string;
    sourceName: string;
    sourceType: IImportType;
    targetName: string;
    targetType: IImportType;
  }>, item) => {
    const { source } = item;
    const list = source.map(sourceItem => ({
      ...item,
      source: sourceItem,
    }));

    acc.push(...list);
    return acc;
  }, []);

  return newResult;
}
