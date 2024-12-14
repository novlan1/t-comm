[[toc]]

<h2>引入</h2>

```ts
import { getMorsePwdMixin, getMsdkFullScreen } from 't-comm';

// or
import { getMorsePwdMixin, getMsdkFullScreen} from 't-comm/lib/mixin/index';
```


## `getMorsePwdMixin` 


**描述**：<p>摩斯密码的 Vue mixin，方便实用</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| pwd | <code>array</code> | <p>密钥</p> |
| cb | <code>function</code> | <p>回到函数</p> |

**返回**: <p>换入内容</p>

**示例**

```ts
getMorsePwdMixin([1, 1, 1, 1, 1], function () {
  if (isInIFrame()) return;
  this.onShowLaunchApp();
}),
```
<a name="getMsdkFullScreen"></a>

## `getMsdkFullScreen()` 


**描述**：<p>msdk 浏览器全屏方法，点击外链时可全屏，返回时退出全屏</p>

**参数**：



**示例**

```ts
mixins: [getMsdkFullScreen()],
```
