<h3 style="margin-bottom: -1rem;">目录</h3>

[[toc]]

<h3>引入</h3>

```ts
import { throttle } from 't-comm';

// or
import { throttle} from 't-comm/lib/throttle/index';
```


### `throttle(fn, time)` 


**描述**：<p>节流</p>
<p>连续触发事件但是在 n 秒中只执行一次函数</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| fn | <code>function</code> | <p>主函数</p> |
| time | <code>number</code> | <p>间隔时间，单位 <code>ms</code></p> |

**返回**: <p>闭包函数</p>

**示例**

```ts
function count() {
 console.log('xxxxx')
}
window.onscroll = throttle(count, 500)
```
