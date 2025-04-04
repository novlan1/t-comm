<h3 style="margin-bottom: -1rem;">目录</h3>

[[toc]]

<h3>引入</h3>

```ts
import {
  getPageTotal,
  getComponentInfo,
  saveMpImage
} from 't-comm';

// or
import {
  getPageTotal,
  getComponentInfo,
  saveMpImage
} from 't-comm/lib/mp/index';
```


### `getPageTotal(dist)` 


**描述**：<p>统计页面总数、分包数目等</p>

**参数**：


| 参数名 |
| --- |
| dist | 

**返回**: <p>result</p>

**示例**

```ts
getPageTotal('./dist/dev/mp-weixin')
```
<a name="getComponentInfo"></a>

### `getComponentInfo(dist)` 


**描述**：<p>统计组件数目、wxml大小、wxss大小、js大小等</p>

**参数**：


| 参数名 |
| --- |
| dist | 

**返回**: <p>result</p>

**示例**

```ts
getComponentInfo('./dist/dev/mp-weixin')
```
<a name="saveMpImage"></a>

### `saveMpImage(url, options)` 


**描述**：<p>小程序下保存图片</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| url | <code>string</code> | <p>图片地址</p> |
| options | <code>object</code> | <p>提示选项</p> |



**示例**

```ts
saveMpImage('https://xxx.png');
```
