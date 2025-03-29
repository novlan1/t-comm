[[toc]]

<h2>引入</h2>

```ts
import { safeJsonParse } from 't-comm';

// or
import { safeJsonParse} from 't-comm/lib/json/index';
```


## `safeJsonParse(data, defaultValue)` 


**描述**：<p>加了 try-catch 的 JSON.parse</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| data | <p>传入数据</p> |
| defaultValue | <p>默认值，不传则为 空对象</p> |

**返回**: <p>解析后的数据</p>

**示例**

```ts
safeJsonParse(data)

safeJsonParse(data, {})

safeJsonParse(data, [])
```
