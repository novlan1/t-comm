[[toc]]

## 引入方式

```ts
import { getMatchListFromReg } from 't-comm';

// or

import { getMatchListFromReg} from 't-comm/lib/base/regexp/index';
```


## `getMatchListFromReg(content, reg)` 


**描述**：<p>匹配正则，获取匹配到的列表</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| content | <code>string</code> | <p>输入内容</p> |
| reg | <code>RegExp</code> | <p>正则</p> |

**返回**: <p>匹配列表</p>

**示例**

```ts
getMatchListFromReg(content, /emit\('([^',]+)'/g);

// ['start', 'end']
```
