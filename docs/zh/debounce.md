[[toc]]

<h2>引入</h2>

```ts
import { debounce } from 't-comm';

// or
import { debounce} from 't-comm/lib/debounce/index';
```


## `debounce(fn, time)` 


**描述**：<p>防抖，场景：搜索</p>
<p>触发事件后在 n 秒内函数只能执行一次，如果
在 n 秒内又触发了事件，则会重新计算函数执行时间</p>

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
window.onscroll = debounce(count, 500)
```
