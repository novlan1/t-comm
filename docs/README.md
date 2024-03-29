
<div align="center">
<img
  src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_5489135b5a3b9258d8.png" 
  width="120"
  style="margin-bottom: 20px;margin-top: 20px;"
/>
</div>

<p align="center">
  <img src="https://img.shields.io/travis/com/novlan1/t-comm">
  <img src="https://img.shields.io/npm/dw/t-comm">
  <img src="https://img.shields.io/npm/v/t-comm">
  <img src="https://img.shields.io/npm/l/t-comm">
  <img src="https://img.shields.io/codecov/c/github/novlan1/t-comm">
</p>

---

### 介绍

`t-comm` 是一个丰富、易用的工具库。

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


