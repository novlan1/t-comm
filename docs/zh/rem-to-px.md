
### 引入

```ts
import { remToPxInFile } from 't-comm';

// 不支持 tree-shaking 的项目
import { remToPxInFile} from 't-comm/lib/rem-to-px/index';

// 只支持 ESM 的项目
import { remToPxInFile} from 't-comm/es/rem-to-px/index';
```


### `remToPxInFile(filePath)` 


**描述**：<p>替换文件的 rem 单位，转为 px</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| filePath | <code>string</code> | <p>文件路径</p> |



**示例**

```ts
remToPxInFile('xxx.vue');
```
