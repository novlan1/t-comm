
### 引入

```ts
import { initMiniProgramShare, openShareUI } from 't-comm';

// 不支持 tree-shaking 的项目
import { initMiniProgramShare, openShareUI} from 't-comm/lib/share/env/index';

// 只支持 ESM 的项目
import { initMiniProgramShare, openShareUI} from 't-comm/es/share/env/index';
```


### `initMiniProgramShare()` 


**描述**：<p>设置小程序分享信息，用户需要手动点击右上角转发功能进行分享</p>

**参数**：



<a name="openShareUI"></a>

### `openShareUI()` 


**描述**：<p>打开自定义的分享UI组件</p>

**参数**：



