[[toc]]

## 引入方式

```ts
import {
  handleImgUnit,
  getHttpsUrl,
  getCdnUrl,
  getCompressImgUrl,
  tinyImage,
  isSupportedWebp
} from 't-comm';

// or

import {
  handleImgUnit,
  getHttpsUrl,
  getCdnUrl,
  getCompressImgUrl,
  tinyImage,
  isSupportedWebp
} from 't-comm/lib/image/index';
```


## `handleImgUnit` 


**描述**：<p>处理图片尺寸，即去掉单位 px/rem，将 string 类型转为 number 类型
rem 单位的话，会将数值乘以根元素的 fontSize，以获取对应的 px 值</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| size | <code>Number</code> \| <code>String</code> | <p>输入单位</p> |

**返回**: <code>Number</code><br>

<p>处理后的数值</p>

**示例**

```typescript
handleImgUnit(3)
// 3

handleImgUnit('10')
// 10

handleImgUnit('30px')
// 30

handleImgUnit('5rem')
// 250

document.documentElement.style.fontSize = '10px';
handleImgUnit('5rem')
// 50
```
<a name="getHttpsUrl"></a>

## `getHttpsUrl` 


**描述**：<p>将图片地址由 http 替换为 https 协议</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| url | <p>图片地址</p> |

**返回**: <p>新的地址</p>

<a name="getCdnUrl"></a>

## `getCdnUrl` 


**描述**：<p>获取 cdn 链接</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| url | <code>string</code> | <p>图片地址</p> |

**返回**: <p>新的地址</p>

<a name="getCompressImgUrl"></a>

## `getCompressImgUrl` 


**描述**：<p>获取压缩后的图片</p>

**参数**：


| 参数名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| url | <code>string</code> |  | <p>图片地址</p> |
| [imageWidth] | <code>number</code> | <code>0</code> | <p>宽度</p> |
| [imageHeight] | <code>number</code> | <code>0</code> | <p>高度</p> |

**返回**: <p>新的 url 地址</p>

<a name="tinyImage"></a>

## `tinyImage` 


**描述**：<p>压缩图片，会依次执行 getHttpsUrl, getCdnUrl, getCompressImgUrl</p>

**参数**：


| 参数名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| url | <code>string</code> |  | <p>图片地址</p> |
| [imageWidth] | <code>number</code> | <code>0</code> | <p>宽度</p> |
| [imageHeight] | <code>number</code> | <code>0</code> | <p>高度</p> |

**返回**: <p>新的 url 地址</p>

<a name="isSupportedWebp"></a>

## `isSupportedWebp` 


**描述**：<p>判断当前浏览器是否支持 webp</p>

**参数**：

**返回**: <code>Promise.&lt;boolean&gt;</code><br>

<p>是否支持</p>

