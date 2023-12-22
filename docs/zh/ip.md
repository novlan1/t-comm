[[toc]]

## 引入

```ts
import { getIPAddress, getIPAddressStr } from 't-comm';

// or

import { getIPAddress, getIPAddressStr} from 't-comm/lib/ip/index';
```


## `getIPAddress()` 


**描述**：<p>获取ip地址</p>

**参数**：

**返回**: <p>字符串，形如 x.x.x.x</p>

**示例**

```ts
getIPAddress() // 10.10.10.10
```
<a name="getIPAddressStr"></a>

## `getIPAddressStr()` 


**描述**：<p>获取ip的字符串</p>

**参数**：

**返回**: <p>字符串，形如 x_x_x_x</p>

**示例**

```ts
getIPAddressStr() // 10_10_10_10
```
