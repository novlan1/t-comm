[[toc]]

## 引入方式

```ts
import { PollingRequest  } from 't-comm';

// or

import { PollingRequest } from 't-comm/lib/polling/index';
```


## PollingRequest 


**参数**：




* [PollingRequest](#PollingRequest)
    * [`new PollingRequest([maxPollingTime], [timeInterval])`](#new_PollingRequest_new)
    * [`.reset()`](#PollingRequest+reset)
    * [`.polling(func)`](#PollingRequest+polling)

<a name="new_PollingRequest_new"></a>

### `new PollingRequest([maxPollingTime], [timeInterval])`
<p>轮询</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [maxPollingTime] | <code>number</code> | <code>10</code> | <p>最大轮询次数</p> |
| [timeInterval] | <code>number</code> | <code>2000</code> | <p>轮询间隔</p> |

**Example**  
```ts
const polling = new PollingRequest(10);
const cb = () => {
  this.onGetTeamList(true);
};
polling.polling(cb);
```
<a name="PollingRequest+reset"></a>

### `pollingRequest.reset()`
<p>重置，即取消轮询</p>

**Kind**: instance method of [<code>PollingRequest</code>](#PollingRequest)  
<a name="PollingRequest+polling"></a>

### `pollingRequest.polling(func)`
<p>开始轮询</p>

**Kind**: instance method of [<code>PollingRequest</code>](#PollingRequest)  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | <p>轮询方法</p> |

