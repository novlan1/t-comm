[[toc]]

## 引入方式

```ts
import { loadVConsole } from 't-comm';

// or

import { loadVConsole} from 't-comm/lib/v-console/index';
```


## `loadVConsole([options], [plugins])` 


**描述**：<p>加载 vConsole</p>

**参数**：


| 参数名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | <p>vConsole 选项</p> |
| [plugins] | <code>Array&lt;string&gt;</code> | <code>[]</code> | <p>插件列表</p> |

**返回**: <code>Promise.&lt;Object&gt;</code><br>

<p>vConsole 实例</p>

**示例**

```ts
loadVConsole()
```
