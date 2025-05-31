
### 引入

```ts
import { getDeps } from 't-comm';

// 不支持 tree-shaking 的项目
import { getDeps} from 't-comm/lib/rollup/index';

// 只支持 ESM 的项目
import { getDeps} from 't-comm/es/rollup/index';
```


### `getDeps(dir)` 


**描述**：<p>获取依赖列表</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| dir | <p>目录</p> |

**返回**: <p>dependenciesList</p>

