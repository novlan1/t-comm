
### 引入

```ts
import { loadDotenv } from 't-comm';

// 不支持 tree-shaking 的项目
import { loadDotenv} from 't-comm/lib/dotenv/index';

// 只支持 ESM 的项目
import { loadDotenv} from 't-comm/es/dotenv/index';
```


### `loadDotenv(file, param)` 


**描述**：<p>用 dotenv-expand 加载环境变量</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| file | <p>文件路径，默认 .env.local</p> |
| param | <p>参数</p> |



**示例**

```ts
loadEnv();

loadEnv('.env');

loadEnv('.env.local', {
  debug: false, // 是否打印日志，默认 true
});
```
