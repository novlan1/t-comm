<h3 style="margin-bottom: -1rem;">目录</h3>

[[toc]]

<h3>引入</h3>

```ts
import { setWithString, merge } from 't-comm';

// or
import { setWithString, merge} from 't-comm/lib/lodash-mini/index';
```


### `setWithString(obj, path, value)` 


**描述**：<p>设置对象深层属性的值（类似 Lodash 的 _.set）</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| obj | <p>目标对象</p> |
| path | <p>属性路径（字符串或数组，如 'a.b.c' 或 ['a', 'b', 'c']）</p> |
| value | <p>要设置的值</p> |

**返回**: <p>修改后的对象</p>

<a name="merge"></a>

### `merge()` 


**描述**：<p>Merge objects which will create</p>

**参数**：



