[[toc]]

## 引入方式

```ts
import { Scheduler  } from 't-comm';

// or

import { Scheduler } from 't-comm/lib/scheduler/index';
```


## Scheduler 


**参数**：



<a name="new_Scheduler_new"></a>

### `new Scheduler([maxConcurrency])`
<p>异步任务调度器，同一时间只能执行 n 个任务</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [maxConcurrency] | <code>number</code> | <code>2</code> | <p>最多同时执行的任务数目，默认为 2</p> |

**Example**  
```ts
let scheduler;

export async function login({
  userId,
  userSig,
  tim,
}: {
  userId: string;
  userSig: string;
  tim: IChatSDK;
}) {
  if (!scheduler) {
    scheduler = new Scheduler(1);
  }

  return await scheduler.add(innerLogin.bind(null, {
    userId,
    userSig,
    tim,
  }));
}
```
