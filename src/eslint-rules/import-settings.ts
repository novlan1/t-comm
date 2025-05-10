export function getESLintImportSettings(options?: {
  aliasMap: Array<[string, string]>;
}) {
  return {
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.ts', '.tsx', '.js', '.jsx', '.json', '.vue'],
      },
      alias: {
        map: [
          ['src', './src'],
          ...(options?.aliasMap || []),
        ],
        // 告诉 resolver-alias 有哪些后缀的文件要解析
        extensions: ['.mjs', '.ts', '.tsx', '.js', '.jsx', '.json', '.vue'],
      },
    },
    'import/ignore': ['node_modules'],
  };
}
