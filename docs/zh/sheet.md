
### 引入

```ts
import { excelToJson, jsonToExcel } from 't-comm';

// 不支持 tree-shaking 的项目
import { excelToJson, jsonToExcel} from 't-comm/lib/sheet/index';

// 只支持 ESM 的项目
import { excelToJson, jsonToExcel} from 't-comm/es/sheet/index';
```


### `excelToJson(params)` 


**描述**：<p>excel 转 json</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| params | <code>object</code> | <p>参数</p> |

**返回**: <p>jsonData</p>

**示例**

```typescript
const options = {
  header: ['id', 'name', 'age'], // 可选：自定义表头
  range: 1,                      // 可选：跳过第一行（标题行）
  defval: null,                  // 可选：空单元格的默认值
  raw: false,                    // 可选：是否保留原始数据格式
};

excelToJson({
  filePath: CONFIG.xlsxPath,
  sheetIndex: 1,
  options,
});

// [
//   { id: 1, name: '2', age: '3' },
//   { id: 1, name: '2', age: '3' }
// ];
```
<a name="jsonToExcel"></a>

### `jsonToExcel(params)` 


**描述**：<p>json 转 excel</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| params | <code>object</code> | <p>参数</p> |



**示例**

```typescript
{ workbook, worksheet }

const jsonData = [
  { id: 1, name: '2', age: '3' },
  { id: 1, name: '2', age: '3' },
];

jsonToExcel({
  jsonData,
  outputPath: CONFIG.outputFilePath,
  options: {
    header: ['id', 'name', 'age'],  // 可选：自定义表头顺序
    skipHeader: false,              // 可选：是否跳过表头行
  },
  sheetName: 'addedData',
});
```
