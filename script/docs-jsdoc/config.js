// 生成文档的配置文件
module.exports =  [
  {
    root: './src',
    output: './docs/zh',
    ignoreList: [ // 忽略不生成md文档
      '__mocks__',
      '.DS_Store',
    ],
  },
];

