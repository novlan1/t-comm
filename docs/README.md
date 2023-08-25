# t-comm

丰富易用的工具库。

## 如何使用

1. 安装依赖


```bash
npm install t-comm -S
```

2. 引用并使用

```ts
import { getMonthDay } from 't-comm';

getMonthDay(2022, 2)  // 28
```


## 单文件引入

对于一些不支持`tree-shaking`的项目，`t-comm`提供了单文件引入的方式。

```ts
import { timeStampFormat } from 't-comm/lib/time/time';

const stamp = new Date('2020-11-27 8:23:24').getTime();
timeStampFormat(stamp, 'yyyy-MM-dd hh:mm:ss');

// 2020-11-27 08:23:24
```
