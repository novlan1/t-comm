[[toc]]

## 引入方式

```ts
import { findRouteName } from 't-comm';

// or

import { findRouteName} from 't-comm/lib/router/index';
```


## `findRouteName(path, routes)` 


**描述**：<p>根据路由表，找到 path 对应的 路由名称</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| path | <code>string</code> | <p>路由路径</p> |
| routes | <code>array</code> | <p>路由表</p> |

**返回**: <code>object</code><br>

<p>匹配到的路由信息</p>

**示例**

```ts
const { name, params, meta, path } = findRouteName(rawPath, ALL_ROUTES) || {};

console.log('name', name);
```
