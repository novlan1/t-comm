[[toc]]

<h2>引入</h2>

```ts
import { formatBite } from 't-comm';

// or
import { formatBite} from 't-comm/lib/bite/index';
```


## `formatBite(number)` 


**描述**：<p>格式化 bite 单位，最多保留2位小数，最大单位为BB</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| number | <p>size bite 单位</p> |

**返回**: <p>格式化的字符</p>

**示例**

```typescript
formatBite(1)
// 1B

formatBite(100)
// 100B

formatBite(1000)
// 1000B

formatBite(10000)
// 9.77KB

formatBite(100000)
// 97.66KB

formatBite(1000000)
// 976.56KB

formatBite(10000000)
// 9.54MB
```
