
### 引入

```ts
import {
  saveBase64ImgToFile,
  turnLocalImg2Base64,
  saveRemoteImgToLocal,
  getImgMd5
} from 't-comm';

// 不支持 tree-shaking 的项目
import {
  saveBase64ImgToFile,
  turnLocalImg2Base64,
  saveRemoteImgToLocal,
  getImgMd5
} from 't-comm/lib/node-img/index';

// 只支持 ESM 的项目
import {
  saveBase64ImgToFile,
  turnLocalImg2Base64,
  saveRemoteImgToLocal,
  getImgMd5
} from 't-comm/es/node-img/index';
```


### `saveBase64ImgToFile(config)` 


**描述**：<p>node环境下，保存base64图片到文件</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| config | <code>object</code> | <p>输入配置</p> |
| config.imgUrl | <code>string</code> | <p>base64图片Url</p> |
| config.savePath | <code>string</code> | <p>保存路径，最好是绝对路径</p> |

**返回**: <code>Promise.&lt;string&gt;</code><br>

<p>去掉前缀的base64图片地址</p>

**示例**

```typescript
saveBase64ImgToFile({
  imgUrl: 'xx',
  savePath: '/test.png'
}).then((base64Data) => {
  console.log(base64Data)
})
```
<a name="turnLocalImg2Base64"></a>

### `turnLocalImg2Base64(savePath)` 


**描述**：<p>node环境下，本地图片转为base64</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| savePath | <code>string</code> | <p>本地图片保存路径</p> |

**返回**: <code>string</code><br>

<p>base64图片地址</p>

**示例**

```typescript
const base64str = turnLocalImg2Base64('/temp.png')
```
<a name="saveRemoteImgToLocal"></a>

### `saveRemoteImgToLocal(config)` 


**描述**：<p>node环境下，保存网络图片到本地</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| config | <code>object</code> | <p>输入配置</p> |
| config.imgUrl | <code>string</code> | <p>网络图片地址</p> |
| config.savePath | <code>string</code> | <p>本地图片保存路径，建议绝对路径</p> |

**返回**: <code>Promise.&lt;object&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
saveRemoteImgToLocal({
  imgUrl: 'xx',
  savePath: './test.png'
}).then(() => {

})
```
<a name="getImgMd5"></a>

### `getImgMd5(options)` 


**描述**：<p>获取图片md5</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | <p>配置信息</p> |
| options.savePath | <code>string</code> | <p>本地图片地址，建议绝对路径</p> |

**返回**: <code>Promise.&lt;string&gt;</code><br>

<p>图片md5值</p>

**示例**

getImgMd5({
 savePath: '/test.png'
}).then(md5 => {
  console.log(md5)
})
```
