[[toc]]

## 引入

```ts
import { uploadFile } from 't-comm';

// or

import { uploadFile} from 't-comm/lib/uploader/index';
```


## `uploadFile(file)` 


**描述**：<p>上传文件</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| file | <code>File</code> | <p>文件</p> |

**返回**: <code>Promise.&lt;{url: string}&gt;</code><br>

<p>上传结果</p>

**示例**

```ts
import { uploadFile, UploadManager } from 't-comm/lib/uploader'

uploadFile(file).then(() => {})

// 可以通过 UploadManager 设置上传参数
UploadManager.setConfig({
  requestHashUrl: `https://${location.hostname}/pvp/share/getsharecfg.php`,
  uploadFileKey: 'upload_pic_input',
  uploadUrlPrefix: 'https://igame.qq.com/external/uploadpic.php?_hash=',
})

// 可以通过 UploadManager.getInstance().updateHashCode 主动更新 hashCode
UploadManager.getInstance().updateHashCode();
```
