# 贡献指南

## 发布

打包：

```bash
npm run build
```

发布：

```diff
- npm run release-patch && npm publish
+ 流水线发布
```

## 文档

根据`jsdoc`生成文档：

```bash
npm run docs:gen
```

文档开发：

```bash
npm run docs:dev
```

文档打包：

```bash
npm run docs:build
```

文档部署：

```bash
npm run docs:deploy
```

## 单元测试

执行单元测试：

```bash
npm run test
```

打开测试报告：

```bash
open test/unit/coverage/lcov-report/index.html
```
