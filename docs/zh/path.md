[[toc]]

## 引入方式

```ts
import { normalizePath } from 't-comm';

// or

import { normalizePath} from 't-comm/lib/path/index';
```


## `normalizePath` 


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
