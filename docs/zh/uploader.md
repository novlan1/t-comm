<h3 style="margin-bottom: -1rem;">目录</h3>

[[toc]]

<h3>引入</h3>

```ts
import { uploadFile } from 't-comm';

// or
import { uploadFile} from 't-comm/lib/uploader/index';
```


### `uploadFile(file)` 


**描述**：<p>上传文件</p>
<p>上传的本质：</p>
<ol>
<li>
<p>小程序上传文件是先用 chooseFile 获取一个文件，可以得到
一个临时路径，然后用 uploadFile 上传该临时路径</p>
</li>
<li>
<p>H5 是 input 获取文件，然后用 FormData 上传 File 对象</p>
</li>
</ol>

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
