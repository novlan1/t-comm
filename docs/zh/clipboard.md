
### 引入

```ts
import { clipboardMp, clipboardWeb } from 't-comm';

// 不支持 tree-shaking 的项目
import { clipboardMp, clipboardWeb} from 't-comm/lib/clipboard/index';

// 只支持 ESM 的项目
import { clipboardMp, clipboardWeb} from 't-comm/es/clipboard/index';
```


### `clipboardMp(text)` 


**描述**：<p>小程序粘贴</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| text | <code>string</code> | <p>待复制的文本</p> |



**示例**

```ts
clipboardMp('stupid').then(() => {});
```
<a name="clipboardWeb"></a>

### `clipboardWeb(text)` 


**描述**：<p>复制到剪切板</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| text | <code>string</code> | <p>待复制的文本</p> |



**示例**

```ts
clipboardMp('stupid').then(() => {});
```
