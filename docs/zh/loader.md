[[toc]]

## 引入方式

```ts
import {
  loader,
  loaderUnity,
  loadJS,
  loadCSS
} from 't-comm';

// or

import {
  loader,
  loaderUnity,
  loadJS,
  loadCSS
} from 't-comm/lib/loader/index';
```


## `loader` 


**描述**：<p>以 Callback 的方式加载 js 文件</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| src | <code>String</code> | <p>js文件路径</p> |
| callback | <code>function</code> \| <code>Object</code> | <p>加载回调</p> |
| charset | <code>String</code> | <p>指定js的字符集</p> |
| context | <code>Object</code> | <p>Callback context</p> |




* [`loader`](#loader)
    * [`~privateFinish()`](#loader..privateFinish) ⇒ <code>void</code>
    * [`~privateError()`](#loader..privateError) ⇒ <code>void</code>

<a name="loader..privateFinish"></a>

### `loader~privateFinish()` ⇒ <code>void</code>
<p>Final handler for error or completion.</p>
<p><strong>Note</strong>: Will only be called <em>once</em>.</p>

**Kind**: inner method of [<code>loader</code>](#loader)  
<a name="loader..privateError"></a>

### `loader~privateError()` ⇒ <code>void</code>
<p>Error handler</p>

**Kind**: inner method of [<code>loader</code>](#loader)  
<a name="loaderUnity"></a>

## `loaderUnity` 


**描述**：<p>以 Promise 或者 Callback 的方式加载 js 文件，取决于是否传递 Callback</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| url | <code>string</code> | <p>js文件路径</p> |
| [cb] | <code>function</code> | <p>回调</p> |

**返回**: <code>Promise.&lt;number&gt;</code><br>

<p>promise</p>

<a name="loadJS"></a>

## `loadJS(url)` 


**描述**：<p>以 Promise 的方式加载 js 文件</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| url | <code>string</code> | <p>js文件路径</p> |

**返回**: <code>Promise.&lt;number&gt;</code><br>

<p>promise</p>

<a name="loadCSS"></a>

## `loadCSS(url)` 


**描述**：<p>动态加载CSS</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| url | <code>string</code> | <p>CSS链接</p> |



**示例**

```typescript
loadCSS('xxx.css')
```
