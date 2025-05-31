
### 引入

```ts
import { normalizePath, getRelativePath } from 't-comm';

// 不支持 tree-shaking 的项目
import { normalizePath, getRelativePath} from 't-comm/lib/path/index';

// 只支持 ESM 的项目
import { normalizePath, getRelativePath} from 't-comm/es/path/index';
```


### `normalizePath` 


**描述**：<p>格式化路径</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| path | <p>文件路径，或目录路径</p> |

**返回**: <p>格式化后的路径</p>

**示例**

```ts
normalizePath('xxx/xxx/xxx');

normalizePath('xxx\\xxx\\xxx');
```
<a name="getRelativePath"></a>

### `getRelativePath(pathA, pathB)` 


**描述**：<p>A引用B时，拿引用路径</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| pathA | <p>路径A</p> |
| pathB | <p>路径B</p> |

**返回**: <p>相对路径</p>

**示例**

```ts
getRelativePath('a', 'b');

// './b'
```
