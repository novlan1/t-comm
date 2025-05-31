
<div align="center">
<img
  src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fown_mike_5489135b5a3b9258d8.gif" 
  width="120"
  style="margin-bottom: 20px;margin-top: 20px;"
/>
</div>
<!-- 复制到 docs 时，去掉 ”详细文档“ 那一节 -->

<p align="center">
  <img src="https://img.shields.io/travis/com/novlan1/t-comm">
  <img src="https://img.shields.io/npm/dw/t-comm">
  <img src="https://img.shields.io/npm/unpacked-size/t-comm">
  <img src="https://img.shields.io/npm/v/t-comm">
  <img src="https://img.shields.io/npm/l/t-comm">
  <img src="https://img.shields.io/codecov/c/github/novlan1/t-comm">
  <img src="https://img.shields.io/github/last-commit/novlan1/t-comm">
  <img src="https://img.shields.io/github/created-at/novlan1/t-comm">
</p>

---

### 介绍

`t-comm` 是一个专业、稳定、纯粹的工具库。

### 如何使用

1. 安装依赖

```bash
npm install t-comm -S
```

2. 引入并使用

```ts
import { getMonthDay } from 't-comm';

getMonthDay(2022, 2)  // 28
```


### 单文件引入

对于一些不支持 `tree-shaking` 的项目，`t-comm` 提供了单文件引入的方式。

```ts
import { timeStampFormat } from 't-comm/lib/time/time';

const stamp = new Date('2020-11-27 8:23:24').getTime();

timeStampFormat(stamp, 'yyyy-MM-dd hh:mm:ss');
// 2020-11-27 08:23:24
```

还可以从 `es` 目录中导入，适合一些不支持 [CommonJS](https://nodejs.org/api/modules.html) 的项目。

```ts
import { timeStampFormat } from 't-comm/es/time/time';
```
