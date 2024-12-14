[[toc]]

<h2>引入</h2>

```ts
import {
  convertDomToImage,
  urlToBase64,
  convertImageToCanvas
} from 't-comm';

// or
import {
  convertDomToImage,
  urlToBase64,
  convertImageToCanvas
} from 't-comm/lib/dom-to-image/index';
```


## `convertDomToImage(trigger, imageElId)` 


**描述**：<p>Dom转化为图片</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| trigger | <code>string</code> | <p>Dom的id</p> |
| imageElId | <code>string</code> | <p>需要展示的图片的id</p> |



**示例**

```typescript
Dom2Image.convertDomToImage("app", "appImage");
```
<a name="urlToBase64"></a>

## `urlToBase64(src)` 


**描述**：<p>解决图片跨域问题，将网络图片URL转为base64 URL。</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| src | <code>string</code> | <p>网络图片URL</p> |

**返回**: <code>Promise</code><br>

<p>Promise对象返回base64 URL</p>

**示例**

```typescript
Dom2Image.urlToBase64("http://test.com/image.png").then(url=>{});
```
<a name="convertImageToCanvas"></a>

## `convertImageToCanvas(image)` 


**描述**：<p>image url转canvas</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| image | <code>Image</code> | <p>图片src</p> |

**返回**: <p>canvas</p>

