
### 引入

```ts
import { setWithString, merge } from 't-comm';

// 不支持 tree-shaking 的项目
import { setWithString, merge} from 't-comm/lib/lodash-mini/index';

// 只支持 ESM 的项目
import { setWithString, merge} from 't-comm/es/lodash-mini/index';
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



