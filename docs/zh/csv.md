[[toc]]

<h2>引入</h2>

```ts
import { generateCSV } from 't-comm';

// or
import { generateCSV} from 't-comm/lib/csv/index';
```


## `generateCSV(dataList)` 


**描述**：<p>生成 CSV 文件内容，可以用于 fs.writeFileSync 输出</p>
<p>第一行为表头</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| dataList | <code>Array&lt;Array&lt;string&gt;&gt;</code> | <p>二维数据列表</p> |

**返回**: <p>生成的字符串</p>

**示例**

```ts
generateCSV([['a','b'], ['1', '2']]);
```
