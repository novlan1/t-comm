[[toc]]

## 引入方式

```ts
import { transFormRem } from 't-comm';

// or

import { transFormRem} from 't-comm/lib/rem/index';
```


## `transFormRem(content, factor, unit)` 


**描述**：<p>转化 rem 单位</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| content | <code>string</code> | <p>输入内容</p> |
| factor | <code>number</code> | <p>转化比例，默认 100</p> |
| unit | <code>string</code> | <p>转化单位，默认 rpx</p> |

**返回**: <code>string</code><br>

<p>转化后的结果</p>

**示例**

```ts
transFormRem('1.22rem')
// 122rpx

transFormRem('1.22rem', 50, 'px')
// 61px

transFormRem('.21rem', 50, 'px')
// 10.50px
```
