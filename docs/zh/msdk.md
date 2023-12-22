[[toc]]

## 引入方式

```ts
import {
  callJsReSetFullScreen,
  callJsSetFullScreen,
  sendToMsdkNative,
  closeMsdkWebview,
  closeWebView,
  callJsBrowserAdapter
} from 't-comm';

// or

import {
  callJsReSetFullScreen,
  callJsSetFullScreen,
  sendToMsdkNative,
  closeMsdkWebview,
  closeWebView,
  callJsBrowserAdapter
} from 't-comm/lib/msdk/index';
```


## `callJsReSetFullScreen` 


**描述**：<p>设置 MSDK 浏览器退出全屏，需提前加载 sdk</p>

**参数**：



**示例**

```ts
callJsReSetFullScreen();
```
<a name="callJsSetFullScreen"></a>

## `callJsSetFullScreen` 


**描述**：<p>设置 MSDK 浏览器全屏，需提前加载 sdk</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| isFullScreen | <p>是否全屏</p> |



**示例**

```ts
callJsSetFullScreen();
callJsSetFullScreen(false);
```
<a name="sendToMsdkNative"></a>

## `sendToMsdkNative(data)` 


**描述**：<p>MSDK 浏览器中，向原生发送数据</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| data | <code>string</code> | <p>发送的数据</p> <pre class="prettyprint source lang-ts"><code>sendToMsdkNative('123') </code></pre> |



<a name="closeMsdkWebview"></a>

## `closeMsdkWebview()` 


**描述**：<p>MSDK 浏览器中，关闭 webView</p>

**参数**：



**示例**

```ts
closeMsdkWebview()
```
<a name="closeWebView"></a>

## `closeWebView()` 


**描述**：<p>关闭 webView，包含 msdk 浏览器和其他浏览器</p>

**参数**：



**示例**

```ts
closeWebView()
```
<a name="callJsBrowserAdapter"></a>

## `callJsBrowserAdapter()` 


**描述**：<p>添加游戏内浏览器jssdk</p>

**参数**：



**示例**

```ts
callJsBrowserAdapter();
```
