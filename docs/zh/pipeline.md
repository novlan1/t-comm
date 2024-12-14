[[toc]]

<h2>引入</h2>

```ts
import { startPipeline } from 't-comm';

// or
import { startPipeline} from 't-comm/lib/pipeline/index';
```


## `startPipeline(config)` 


**描述**：<p>启动流水线</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| config | <code>object</code> | <p>配置信息</p> |
| config.buildId | <code>string</code> | <p>流水线构建Id</p> |
| config.data | <code>object</code> | <p>携带的数据</p> |

**返回**: <p>Promise</p>

**示例**

```ts
startPipeline({
  buildId,
  data: {}
}).then(() => {

})
```
