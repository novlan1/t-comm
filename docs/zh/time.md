[[toc]]

## 引入方式

```ts
import { timeStampFormat, dateFormat } from 't-comm';

// or

import { timeStampFormat, dateFormat} from 't-comm/lib/time/index';
```


## `timeStampFormat(timestamp, fmt, [defaultVal])` 


**描述**：<p>将时间戳格式化</p>

**参数**：


| 参数名 | 类型 |
| --- | --- |
| timestamp | <code>number</code> | 
| fmt | <code>string</code> | 
| [defaultVal] | <code>string</code> | 

**返回**: <code>string</code><br>

<p>格式化后的日期字符串</p>

**示例**

```typescript
const stamp = new Date('2020-11-27 8:23:24').getTime();

const res = timeStampFormat(stamp, 'yyyy-MM-dd hh:mm:ss')

// 2020-11-27 08:23:24
```
<a name="dateFormat"></a>

## `dateFormat(date, format)` 


**描述**：<p>将日期格式化</p>

**参数**：


| 参数名 | 类型 |
| --- | --- |
| date | <code>Date</code> | 
| format | <code>string</code> | 

**返回**: <code>string</code><br>

<p>格式化后的日期字符串</p>

**示例**

```typescript
const date = new Date('2020-11-27 8:23:24');

const res = dateFormat(date, 'yyyy-MM-dd hh:mm:ss')

// 2020-11-27 08:23:24
```
