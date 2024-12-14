[[toc]]

<h2>引入</h2>

```ts
import {
  savePersist,
  getPersist,
  clearPersist
} from 't-comm';

// or
import {
  savePersist,
  getPersist,
  clearPersist
} from 't-comm/lib/storage/index';
```


## `savePersist(key, value, expireMsec)` 


**描述**：<p>写入持久化存储localStorage。仅用于浏览器端，value里不能有循环引用</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| key | <code>string</code> | <p>键</p> |
| value | <code>string</code> | <p>值</p> |
| expireMsec | <code>number</code> | <p>过期时间，单位毫秒</p> |

**返回**: <code>boolean</code><br>

<p>是否存储成功</p>

**示例**

```typescript
const res = savePersist('name', 'mike', 30 * 86400 * 1000); // true
const name = getPersist('name'); // mike

clearPersist('name'); // true
const name2 = getPersist('name'); // undefined
```
<a name="getPersist"></a>

## `getPersist(key)` 


**描述**：<p>读取持久化存储</p>

**参数**：


| 参数名 | 类型 |
| --- | --- |
| key | <code>string</code> | 

**返回**: <code>string</code><br>

<p>key对应的值</p>

<a name="clearPersist"></a>

## `clearPersist([key])` 


**描述**：<p>持久化存储。清理。传 key 就删除。不传清理所有过期的。</p>

**参数**：


| 参数名 | 类型 |
| --- | --- |
| [key] | <code>string</code> | 

**返回**: <code>boolean</code><br>

<p>是否清楚成功</p>

