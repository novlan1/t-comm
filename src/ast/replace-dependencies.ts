/* eslint-disable @typescript-eslint/no-require-imports */
import { IParsedConfigItem, IImportType } from './types';


export function replaceDependencies(content: string, parsedConfigList: Array<IParsedConfigItem>, keyword: string) {
  const parser = require('@babel/parser');
  const traverse = require('@babel/traverse').default;
  const generator = require('@babel/generator');

  let replaced = false;

  const ast = parser.parse(content, {
    // 不加这个配置，报错：SyntaxError: 'import' and 'export' may appear only with 'sourceType: "module"'
    sourceType: 'module',
    plugins: ['typescript'],
  });

  traverse(ast, {
    ImportDeclaration(path: any) {
      const sourceValue = path.node.source.value;

      const importedList = path.node.specifiers.map((item: any) => {
        const { type } = item;

        return {
          type,
          local: item.local.name,
          imported: item.imported?.name || '',
        };
      });

      if (sourceValue.includes(keyword)) return;
      const target = getTarget(sourceValue, importedList, parsedConfigList);

      target.forEach((item) => {
        path.insertAfter(item);
      });

      if (target.length) {
        path.remove();
        replaced = true;
      }
    },
  });

  const output = generator.default(ast, {});

  if (replaced) {
    return output.code;
  }

  return content;
}

function localFlatten(list: Array<{
  target: string;
  [key: string]: any;
}>) {
  return list.reduce((acc: Record<string, any>, current) => {
    const { target } = current!;

    if (acc[target]) {
      acc[target].push(current!);
    } else {
      acc[target] = [current!];
    }
    return acc;
  }, {});
}


function getTarget(originSource: string, originImportedList: Array<{
  type: IImportType;
  local: string;
  imported: string;
}>, parsedConfigList: Array<IParsedConfigItem>) {
  if (!originImportedList.length) {
    const foundItem = parsedConfigList.find(item => item.source === originSource);
    if (!foundItem?.target) {
      return [];
    }
    return [
      genNewImport(foundItem?.target, []),
    ];
  }
  const parsedImportList = originImportedList.map((curOrigin) => {
    const current = parsedConfigList.find((item) => {
      const { source, sourceType, sourceName } = item;

      if (originSource !== source || curOrigin.type !== sourceType) {
        return false;
      }

      if (sourceType === IImportType.ImportSpecifier) {
        return curOrigin.imported === sourceName;
      }

      // ImportDefaultSpecifier 和 ImportNamespaceSpecifier 直接返回 true
      return true;
    });

    if (!current) {
      return {
        ...curOrigin,
        _type: 'OLD',
        target: originSource,
        targetName: curOrigin.imported,
        targetType: curOrigin.type,
      };
    }

    return {
      ...current,
      ...curOrigin,
      _type: 'NEW',
    };
  });

  const newImportList = parsedImportList.filter(item => item._type === 'NEW') as Array<{
    type: IImportType;
    local: string;
    imported: string;

    source: string;
    target: string;

    sourceName: string;
    sourceType: IImportType;
    targetName: string;
    targetType: IImportType;
  }>;
  const oldImportList = parsedImportList.filter(item => item._type === 'OLD') as Array<{
    type: IImportType;
    target: string;
    local: string;
    imported: string;
    targetName: string;
  }>;

  const obj = localFlatten(newImportList) ;
  const oldObj = localFlatten(oldImportList);
  // newImportList.reduce((acc: Record<string, Array<{
  //   type: IImportType;
  //   local: string;
  //   imported: string;
  //   source: string;
  //   target: string;
  //   sourceName: string;
  //   sourceType: IImportType;
  //   targetName: string;
  //   targetType: IImportType;
  // }>>, current) => {
  //   const { target } = current!;

  //   if (acc[target]) {
  //     acc[target].push(current!);
  //   } else {
  //     acc[target] = [current!];
  //   }
  //   return acc;
  // }, {});


  const nodeList = Object.keys(obj).map((source) => {
    const node = genNewImport(source, obj[source]);
    return node;
  });

  const oldNodeList = Object.keys(oldObj).map((source) => {
    const node = genNewImport(source, oldObj[source]);
    return node;
  });

  if (nodeList.length) {
    return [
      ...nodeList,
      oldNodeList,
    ];
  }

  return [];
}


function genNewImport(source: string, importedList: Array<{
  type: IImportType;
  local: string;
  imported: string;
  source: string;
  target: string;
  sourceName: string;
  sourceType: IImportType;
  targetName: string;
  targetType: IImportType;
}>) {
  const t = require('@babel/types');


  const list = importedList.map((current) => {
    const { local, targetType, targetName } = current;

    if (targetType === IImportType.ImportSpecifier) {
      return t.ImportSpecifier(
        t.identifier(local),
        t.identifier(targetName),
      );
    }

    if (targetType === IImportType.ImportDefaultSpecifier) {
      return t.ImportDefaultSpecifier(t.identifier(local));
    }

    if (targetType === IImportType.importNamespaceSpecifier) {
      return t.ImportNamespaceSpecifier(t.identifier(local));
    }
  });

  return t.ImportDeclaration(
    list,
    t.StringLiteral(source),
  );
}
