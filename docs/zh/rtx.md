
### 引入

```ts
import { getMentionRtx } from 't-comm';

// 不支持 tree-shaking 的项目
import { getMentionRtx} from 't-comm/lib/rtx/index';

// 只支持 ESM 的项目
import { getMentionRtx} from 't-comm/es/rtx/index';
```


### `getMentionRtx(rawStr)` 


**描述**：<p>获取 rtx 拼接的提及字符串</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| rawStr | <p>原始字符串，比如 <code>foo,bar</code></p> |

**返回**: <p>处理后的字符串，比如 &lt;@foo&gt;&lt;@bar&gt;</p>

