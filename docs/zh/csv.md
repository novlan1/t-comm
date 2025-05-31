
### 引入

```ts
import { generateCSV, generateCSVData } from 't-comm';

// 不支持 tree-shaking 的项目
import { generateCSV, generateCSVData} from 't-comm/lib/csv/index';

// 只支持 ESM 的项目
import { generateCSV, generateCSVData} from 't-comm/es/csv/index';
```


### `generateCSV(dataList)` 


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
<a name="generateCSVData"></a>

### `generateCSVData(list, headMap)` 


**描述**：<p>生成 CSV 所需数据，可用于传递给 generateCSV 方法</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| list | <code>Array&lt;Record.&lt;string, (string\|number\|boolean)&gt;&gt;</code> | <p>数据列表</p> |
| headMap | <code>Record.&lt;string, string&gt;</code> | <p>数据项的 key 和表头标题的映射关系</p> |

**返回**: <p>二维数组，第一行是表头</p>

**示例**

```ts
generateCSVData([
  {
    file: 'a.js',
    size: 88,
  },
 {
    file: 'b.js',
    size: 66,
  }
], { file: '文件名称', size: '文件大小' })


// [['文件名称', '文件大小'], ['a.js', 88], ['b.js', 66]]
```
