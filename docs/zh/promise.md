
### 引入

```ts
import { toPromise } from 't-comm';

// 不支持 tree-shaking 的项目
import { toPromise} from 't-comm/lib/promise/index';

// 只支持 ESM 的项目
import { toPromise} from 't-comm/es/promise/index';
```


### `toPromise(promiseLike)` 


**描述**：<p>将函数转成 Promise</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| promiseLike | <code>function</code> | <p>任意函数，可以为 Promise</p> |

**返回**: <p>Promise 函数</p>

**示例**

```
const bar = () => 1;
toPromise(bar()).then(res => console.log(res)); // 1
function foo() {
  return new Promise(resolve => setTimeout(() => resolve(2), 1000));
}
toPromise(foo()).then(res => console.log(res)); // 2

```
