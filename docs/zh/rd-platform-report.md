[[toc]]

## 引入方式

```ts
import { reportToRdPlatform } from 't-comm';

// or

import { reportToRdPlatform} from 't-comm/lib/rd-platform-report/index';
```


## `reportToRdPlatform(param)` 


**描述**：<p>上报数据到研发平台</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| param | <code>object</code> | <p>参数</p> |
| param.data | <code>object</code> | <p>上报数据</p> |
| param.host | <code>string</code> | <p>请求域名</p> |
| param.type | <code>ReportType</code> | <p>上报类型</p> |
| param.platform | <code>ReportPlatform</code> | <p>上报平台</p> |

**返回**: <p>上报结果</p>

