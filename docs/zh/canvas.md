
## `addTextForImg()` 


**描述**：<p>为图片增加文字</p>

**参数**：



<a name="mergeMultiCanvasPic"></a>

## `mergeMultiCanvasPic(config)` 


**描述**：<p>绘制多张图</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| config | <code>object</code> | <p>输入参数</p> |
| config.imgs | <code>Array&lt;string&gt;</code> | <p>base64图片列表</p> |

**返回**: <code>string</code><br>

<p>图片url</p>

**示例**

```typescript
mergeMultiCanvasPic({
  imgs: [img, img2, img3],
})
```
<a name="createCanvasTable"></a>

## `createCanvasTable(config)` 


**描述**：<p>创建canvas的table</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| config | <code>object</code> | <p>输入配置</p> |
| config.data | <code>Array&lt;object&gt;</code> | <p>输入数据</p> |
| config.headers | <code>Array&lt;string&gt;</code> | <p>表头列表</p> |
| config.cellWidthList | <code>Array&lt;number&gt;</code> | <p>每一格的宽度列表</p> |
| config.title | <code>string</code> | <p>标题</p> |

**返回**: <code>string</code><br>

<p>图片url</p>

**示例**

```typescript
const tableData = [
  {
    ProjectName: { name: 'ProjectName', value: 'ProjectA' },
    ALL_SUMMARY: {
      name: 'ALL_SUMMARY',
      value: 4987,
      ratio: '+26.2%',
      previousValue: 3953,
      idx: 0,
      lastIdx: 0,
      isMax: true,
      isMin: false,
      isSecondMax: false,
      isSecondMin: false,
    },
    ALL_FAIL: {
      // ...
    },
  },
  {
    ProjectName: { name: 'ProjectName', value: 'ProjectB' },
    // ...
  },
];

createCanvasTable({
  data: tableData,
  headers: getHeaders(tableData),
  title: `007日报 ${date}`,
  cellWidthList: [
    95,
    65,
    65,
    65,
  ],
});
```
