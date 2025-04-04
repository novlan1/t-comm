<h3 style="margin-bottom: -1rem;">目录</h3>

[[toc]]

<h3>引入</h3>

```ts
import { analyzeIndexBundle } from 't-comm';

// or
import { analyzeIndexBundle} from 't-comm/lib/bundle-analyze/index';
```


### `analyzeIndexBundle(config)` 


**描述**：<p>分析首页Bundle信息</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| config |  | <p>配置</p> |
| config.domain | <code>string</code> | <p>域名</p> |
| config.buildPath | <code>string</code> | <p>打包路径</p> |



**示例**

```ts
analyzeIndexBundle({
  domain: '',
  buildPath: '',
})
```
