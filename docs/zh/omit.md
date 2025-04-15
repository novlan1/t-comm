<h3 style="margin-bottom: -1rem;">目录</h3>

[[toc]]

<h3>引入</h3>

```ts
import { omit } from 't-comm';

// or
import { omit} from 't-comm/lib/omit/index';
```


### `omit(obj, fields)` 


**描述**：<p>去掉对象中的某些属性</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| obj | <code>any</code> | <p>对象</p> |
| fields | <code>Array&lt;string&gt;</code> | <p>要去除的属性列表</p> |

**返回**: <p>处理后的对象</p>

**示例**

```ts
omit({ a: 1, b: 2, c: 3 }, ['a'])
// { b: 2, c: 3 }
```
