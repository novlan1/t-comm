
### 引入

```ts
import { getTencentDocUserInfo } from 't-comm';

// 不支持 tree-shaking 的项目
import { getTencentDocUserInfo} from 't-comm/lib/tencent-doc/index';

// 只支持 ESM 的项目
import { getTencentDocUserInfo} from 't-comm/es/tencent-doc/index';
```


### `getTencentDocUserInfo()` 


**描述**：<p>用于获取用户信息，同时也可以用来校验 AccessToken 的有效性。</p>

**参数**：



