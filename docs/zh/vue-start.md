
### 引入

```ts
import { startApp } from 't-comm';

// 不支持 tree-shaking 的项目
import { startApp} from 't-comm/lib/vue-start/index';

// 只支持 ESM 的项目
import { startApp} from 't-comm/es/vue-start/index';
```


### `startApp(options)` 


**描述**：<p>Vue项目初始化</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | <p>业务自定义配置</p> |
| options.App | <code>object</code> | <p>业务App.vue对象</p> |
| [options.routerMap] | <code>Array&lt;object&gt;</code> | <p>业务路由配置表</p> |
| [options.beforeStart] | <code>function</code> | <p>钩子函数，业务自定义</p> |
| [options.i18n] | <code>boolean</code> | <p>支持国际化</p> |

**返回**: <code>object</code><br>

<p>返回 { router, store }</p>

