<h3 style="margin-bottom: -1rem;">目录</h3>

[[toc]]

<h3>引入</h3>

```ts
import { getBase64FromUrl } from 't-comm';

// or
import { getBase64FromUrl} from 't-comm/lib/console/index';
```


### `getBase64FromUrl(url)` 


**描述**：<p>获取图片，并转 base64</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| url | <p>图片链接</p> |

**返回**: <p>获取结果</p>

**示例**

```ts
getBase64FromUrl(imgUrl).then(consoleImage);
```
