[[toc]]

## `uploadCOSFile(config)` 


**描述**：<p>COS上传</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| config | <code>object</code> | <p>配置信息</p> |
| config.files | <code>Array&lt;object&gt;</code> | <p>文件列表</p> |
| config.files.key | <code>string</code> | <p>文件key</p> |
| config.files.path | <code>string</code> | <p>文件路径</p> |
| config.secretId | <code>string</code> | <p>COS secretId</p> |
| config.secretKey | <code>string</code> | <p>COS secretKey</p> |
| config.bucket | <code>string</code> | <p>COS bucket</p> |
| config.region | <code>string</code> | <p>COS region</p> |

**返回**: <code>Promise.&lt;object&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
uploadCOSFile({
  files: [{
    key: 'key1',
    path: 'path1',
  }, {
    key: 'key2',
    path: 'path2',
  }],
  secretId: 'xxx',
  secretKey: 'xxx',
  bucket: 'xxx',
  region: 'xxx',
})
```
