<h3 style="margin-bottom: -1rem;">目录</h3>

[[toc]]

<h3>引入</h3>

```ts
import { readEnvVariable, writeEnvTokenToNpmRC } from 't-comm';

// or
import { readEnvVariable, writeEnvTokenToNpmRC} from 't-comm/lib/env-variable/index';
```


### `readEnvVariable(key, filepath)` 


**描述**：<p>读取文件中环境变量的值，支持：</p>
<ul>
<li>NPM_TOKEN=xxx</li>
<li>NPM_TOKEN = xxx</li>
</ul>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| key | <code>string</code> | <p>环境变量的key</p> |
| filepath | <code>string</code> | <p>保存环境变量的文件路径</p> |

**返回**: <code>string</code><br>

<p>环境变量的值</p>

<a name="writeEnvTokenToNpmRC"></a>

### `writeEnvTokenToNpmRC()` 


**描述**：<p>将 .env.local 中 NPM_TOKEN 的值写入到 .npmrc 中</p>

**参数**：



