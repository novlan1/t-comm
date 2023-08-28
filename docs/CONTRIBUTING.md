# 贡献指南

## 发布

打包：

```bash
npm run build
```

发布：

```bash
npx np --no-cleanup --yolo --any-branch && npm publish
```

## 文档

根据`jsdoc`生成文档：

```bash
npm run docs:gen:new
```

文档开发：

```bash
npm run docs:dev
```

文档打包：

```bash
npm run docs:build:new
```

文档部署：

```bash
npm run docs:deploy
```
