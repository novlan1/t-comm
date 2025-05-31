<h3 style="margin-bottom: -1rem;">目录</h3>

[[toc]]

<h3>引入</h3>

```ts
import { genSignature, getWxCfg } from 't-comm';

// or
import { genSignature, getWxCfg} from 't-comm/lib/wx/index';
```


### `genSignature(ticket, url)` 


**描述**：<p>获取jsAPI签名</p>
<p>校验地址：https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign</p>
<p>文档地址：https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| ticket | <code>string</code> | <p>票据</p> |
| url | <code>string</code> | <p>当前url，不包括#之后的部分</p> |

**返回**: <p>signature</p>

<a name="getWxCfg"></a>

### `getWxCfg(apiList, openTagList)` 


**描述**：<p>请求微信鉴权接口</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| apiList | <code>\*</code> | <p>api列表</p> |
| openTagList | <code>\*</code> | <p>openTag列表</p> |

**返回**: <code>Promise</code><br>

<p>微信鉴权结果</p>

