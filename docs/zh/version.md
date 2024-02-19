[[toc]]

## 引入

```ts
import { compareVersion } from 't-comm';

// or

import { compareVersion} from 't-comm/lib/version/index';
```


## `compareVersion(v1, v2)` 


**描述**：<p>版本比较</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| v1 | <code>string</code> | <p>第一个版本</p> |
| v2 | <code>string</code> | <p>第二个版本</p> |

**返回**: <p>比较结果，1 前者大，-1 后者大，0 二者相同</p>

**示例**

```ts
compareVersion('1.1.1', '1.2.1')
// -1
```
