
### 引入

```ts
import { buildAndUpload } from 't-comm';

// 不支持 tree-shaking 的项目
import { buildAndUpload} from 't-comm/lib/build-upload/index';

// 只支持 ESM 的项目
import { buildAndUpload} from 't-comm/es/build-upload/index';
```


### `buildAndUpload(options)` 


**描述**：<p>打包并上传到服务器</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | <p>配置</p> |
| options.hostName | <code>string</code> | <p>服务器名称</p> |
| options.hostPwd | <code>string</code> | <p>服务器密码</p> |
| [options.root] | <code>string</code> | <p>项目根目录</p> |
| [options.bundleName] | <code>string</code> | <p>打包文件名称</p> |



**示例**

```typescript
await buildAndUpload({
  hostName: '9.9.9.9',
  hostPwd: 'xxxx',
  bundleName: 'cron-job-svr',
});
```
