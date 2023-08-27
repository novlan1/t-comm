# t-comm

<p align="center">
  <img src="https://img.shields.io/travis/com/novlan1/t-comm">
  <img src="https://img.shields.io/npm/dw/t-comm">
  <img src="https://img.shields.io/npm/v/t-comm">
  <img src="https://img.shields.io/npm/l/t-comm">
  <img src="https://img.shields.io/codecov/c/github/novlan1/t-comm">
</p>

丰富易用的工具库。

## 如何使用

1. 安装依赖


```bash
npm install t-comm -S
```

2. 引入并使用

```ts
import { getMonthDay } from 't-comm';

getMonthDay(2022, 2)  // 28
```

## 文档地址

点击[这里](https://novlan1.github.io/t-comm/)查看。

## 单文件引入

对于一些不支持`tree-shaking`的项目，`t-comm`提供了单文件引入的方式。

```ts
import { timeStampFormat } from 't-comm/lib/time/time';

const stamp = new Date('2020-11-27 8:23:24').getTime();

timeStampFormat(stamp, 'yyyy-MM-dd hh:mm:ss');
// 2020-11-27 08:23:24
```

> 注意，只有非`node.js`环境下使用的模块，才进行了单独打包。

