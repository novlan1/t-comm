[[toc]]

<h2>引入</h2>

```ts
import { sleep } from 't-comm';

// or
import { sleep} from 't-comm/lib/sleep/index';
```


## `sleep(ms)` 


**描述**：<p>等待一段时间</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| ms | <code>number</code> | <p>毫秒</p> |

**返回**: <p>Promise</p>

**示例**

```typescript
async function main() {
  await sleep(2000)

  // 等待2秒后才会打印
  console.log('hello')
}

main()
```
