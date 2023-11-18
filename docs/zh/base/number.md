[[toc]]

## 引入方式

```ts
import {
  NUMBER_CHI_MAP,
  getUnitPreviousRatio,
  getPartRatio,
  getThousandSeparator,
  getThousandSeparator2,
  random
} from 't-comm';

// or

import {
  NUMBER_CHI_MAP,
  getUnitPreviousRatio,
  getPartRatio,
  getThousandSeparator,
  getThousandSeparator2,
  random
} from 't-comm/lib/base/number/index';
```


## `NUMBER_CHI_MAP` 


**描述**：<p>阿拉伯数字和中文数字映射表，0 - 32</p>

**参数**：



**示例**

```typescript
console.log(NUMBER_CHI_MAP[1]);
// '一'

console.log(NUMBER_CHI_MAP[2]);
// '二'
```
<a name="getUnitPreviousRatio"></a>

## `getUnitPreviousRatio(value, preValue)` 


**描述**：<p>获取相对于过去数据的比例</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| value | <code>number</code> | <p>当前数据</p> |
| preValue | <code>number</code> | <p>之前数据</p> |

**返回**: <code>string</code><br>

<p>比例</p>

**示例**

```typescript
getUnitPreviousRatio(1, 0)
// +999+%
```
<a name="getPartRatio"></a>

## `getPartRatio(summary, part)` 


**描述**：<p>获取占比</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| summary | <code>number</code> | <p>总数据</p> |
| part | <code>number</code> | <p>部分数据</p> |

**返回**: <code>number</code><br>

<p>比例</p>

**示例**

```typescript
getRatio(0, 1)
// 0

getRatio(1, 0)
// 0

getRatio(1, 1)
// 100

getRatio(1, .5)
// 50
```
<a name="getThousandSeparator"></a>

## `getThousandSeparator(value)` 


**描述**：<p>获取千分位分隔符</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| value | <code>string</code> \| <code>number</code> | <p>输入数字</p> |

**返回**: <code>string</code><br>

<p>处理后的数字</p>

**示例**

```typescript
getThousandSeparator('123123123')

// => 123,123,123

getThousandSeparator('12312312')

// => 12,312,312
```
<a name="getThousandSeparator2"></a>

## `getThousandSeparator2(value)` 


**描述**：<p>获取千分位分隔符，处理数字之间有空格的情况</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| value | <code>string</code> \| <code>number</code> | <p>输入数字</p> |

**返回**: <code>string</code><br>

<p>处理后的数字</p>

**示例**

```typescript
getThousandSeparator2('12345678 123456789')

// => 12,345,678 123,456,789
```
<a name="random"></a>

## `random(min, max)` 


**描述**：<p>在区间内获取随机整数</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| min | <code>number</code> | <p>最小值</p> |
| max | <code>number</code> | <p>最大值</p> |

**返回**: <p>随机数</p>

**示例**

```ts
random(0, 19) // 1
```
