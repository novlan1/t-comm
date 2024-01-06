[[toc]]

## 引入

```ts
import { initGlobalVue3EBus, initDiffVue3EBus } from 't-comm';

// or

import { initGlobalVue3EBus, initDiffVue3EBus} from 't-comm/lib/e-bus/index';
```


## `initGlobalVue3EBus` 


**描述**：<p>挂载统一的eBus，所有实例共用一个</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| app | <p>Vue3 应用实例</p> |



<a name="initDiffVue3EBus"></a>

## `initDiffVue3EBus` 


**描述**：<p>挂载唯一的eBus，不同实例用不同的</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| app | <p>Vue3 应用实例</p> |



