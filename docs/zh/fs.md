[[toc]]

## 引入

```ts
import { writeFileSync, readFileSync } from 't-comm';

// or

import { writeFileSync, readFileSync} from 't-comm/lib/fs/index';
```


## `writeFileSync(file, data, [isJson])` 


**描述**：<p>写入文件</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| file | <code>string</code> | <p>文件地址</p> |
| data | <code>any</code> | <p>文件数据</p> |
| [isJson] | <code>boolean</code> | <p>是否需要 json 序列化</p> |



**示例**

```ts
writeFileSync('a', 'b.txt', false);

writeFileSync({ a: 1 }, 'b.json', true);
```
<a name="readFileSync"></a>

## `readFileSync(file, [isJson])` 


**描述**：<p>读取文件</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| file | <code>string</code> | <p>文件地址</p> |
| [isJson] | <code>boolean</code> | <p>是否需要 json 反序列化</p> |

**返回**: <code>any</code><br>

<p>文件内容</p>

**示例**

```ts
readFileSync('b.txt', false);

readFileSync('b.json', true);
```
