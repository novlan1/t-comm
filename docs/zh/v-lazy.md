
### 引入

```ts
import { getVLazyOptions } from 't-comm';

// 不支持 tree-shaking 的项目
import { getVLazyOptions} from 't-comm/lib/v-lazy/index';

// 只支持 ESM 的项目
import { getVLazyOptions} from 't-comm/es/v-lazy/index';
```


### `getVLazyOptions(options)` 


**描述**：<p>获取 vue-lazyload 插件参数</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| options | <p>选项</p> |

**返回**: <p>插件参数</p>

