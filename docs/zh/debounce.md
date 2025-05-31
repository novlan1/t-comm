
### 引入

```ts
import { debounceRun, debounce } from 't-comm';

// 不支持 tree-shaking 的项目
import { debounceRun, debounce} from 't-comm/lib/debounce/index';

// 只支持 ESM 的项目
import { debounceRun, debounce} from 't-comm/es/debounce/index';
```


### `debounceRun` 


**描述**：<p>不用生成中间函数的防抖</p>

**参数**：



**示例**

```ts
debounceRun(func, args, {
  funcKey: 'funcKey',
  wait: 500, // 默认 500
  throttle: false, // 是否是节流，默认 false
  immediate: true, // 是否立即执行，默认 true
})
``
<a name="debounce"></a>

### `debounce(fn, time, immediate)` 


**描述**：<p>防抖，场景：搜索</p>
<p>触发事件后在 n 秒内函数只能执行一次，如果
在 n 秒内又触发了事件，则会重新计算函数执行时间</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| fn | <code>function</code> | <p>主函数</p> |
| time | <code>number</code> | <p>间隔时间，单位 <code>ms</code></p> |
| immediate | <code>boolean</code> | <p>是否立即执行，默认 <code>false</code></p> |

**返回**: <p>闭包函数</p>

**示例**

```ts
function count() {
 console.log('xxxxx')
}
window.onscroll = debounce(count, 500)

window.onscroll = debounce(count, 500, true)
```
