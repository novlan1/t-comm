[[toc]]

## 引入方式

```ts
import {
  getAreaDataAll,
  getAreaData,
  getAreaCode,
  getAreaName,
  getProvName,
  getCityName
} from 't-comm';

// or

import {
  getAreaDataAll,
  getAreaData,
  getAreaCode,
  getAreaName,
  getProvName,
  getCityName
} from 't-comm/lib/city/index';
```


## `getAreaDataAll()` 


**描述**：<p>获取如下格式的城市列表，包含<code>全国</code>、<code>全省</code>选项</p>

**参数**：

**返回**: <code>Array</code><br>

<p>城市列表</p>

**示例**

```typescript
const res = getAreaDataAll();
// [
//   {
//     text: '全国',
//     code: '0',
//     children: [{
//       text: '不限',
//       code: '0',
//     }],
//   },
//   {
//     text: '北京',
//     code: '11',
//     children: [{
//       text: '北京',
//       code: '0',
//     }],
//   },
//   {
//     text: '天津',
//     code: '12',
//     children: [{
//       text: '天津',
//       code: '0',
//     }],
//   },
//   {
//     text: '河北',
//     code: '13',
//     children: [{
//       text: '全省',
//       code: '0',
//     },
//     {
//       text: '石家庄',
//       code: '1',
//     },
//     {
//       text: '唐山',
//       code: '2',
//     },
//       // ...
//     ],
//   },
//   // ...
// ];
```
<a name="getAreaData"></a>

## `getAreaData([data], [areaArray], [allProvFlag])` 


**描述**：<p>获取城市列表，默认不包含<code>全省</code>选项</p>

**参数**：


| 参数名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| [data] | <code>object</code> |  | <p>原始数据</p> |
| [areaArray] | <code>array</code> | <code>[]</code> | <p>结果列表</p> |
| [allProvFlag] | <code>boolean</code> | <code>false</code> | <p>是否包含<code>全省</code>选项</p> |

**返回**: <code>Array</code><br>

<p>城市列表</p>

**示例**

```typescript
const res = getAreaData();
// [
//   {
//     text: '北京',
//     code: '11',
//     children: [{
//       text: '北京',
//       code: '0',
//     }],
//   },
//   {
//     text: '天津',
//     code: '12',
//     children: [{
//       text: '天津',
//       code: '0',
//     }],
//   },
//   {
//     text: '河北',
//     code: '13',
//     {
//       text: '石家庄',
//       code: '1',
//     },
//     {
//       text: '唐山',
//       code: '2',
//     },
//       // ...
//     ],
//   },
//   // ...
// ];
```
<a name="getAreaCode"></a>

## `getAreaCode(provinceStr, cityStr)` 


**描述**：<p>根据省份城市转化为<code>id</code>数组</p>

**参数**：


| 参数名 | 类型 |
| --- | --- |
| provinceStr | <code>string</code> | 
| cityStr | <code>string</code> | 

**返回**: <code>Array</code><br>

<p>包含省份、城市ID的数组</p>

**示例**

```typescript
const res =  getAreaCode('山东', '德州');
// ['37', '14']
```
<a name="getAreaName"></a>

## `getAreaName(provinceId, cityId)` 


**描述**：<p>根据<code>id</code>将省份城市转化为字符串数组</p>

**参数**：


| 参数名 | 类型 |
| --- | --- |
| provinceId | <code>string</code> \| <code>number</code> | 
| cityId | <code>string</code> \| <code>number</code> | 

**返回**: <code>Array</code><br>

<p>包含省份、城市名字的数组</p>

**示例**

```typescript
const res =  getProvName(37, 14)
// ['山东', '德州']

const res2 =  getCityName(11)
// ['北京', '北京']
```
<a name="getProvName"></a>

## `getProvName(provinceId)` 


**描述**：<p>根据<code>id</code>获取省份名字</p>

**参数**：


| 参数名 | 类型 |
| --- | --- |
| provinceId | <code>string</code> \| <code>number</code> | 

**返回**: <code>string</code><br>

<p>省份名字</p>

**示例**

```typescript
const res =  getProvName(37)
// 山东

const res2 =  getCityName(11)
// 北京
```
<a name="getCityName"></a>

## `getCityName(provinceId, cityId)` 


**描述**：<p>根据<code>id</code>获取城市名字</p>

**参数**：


| 参数名 | 类型 |
| --- | --- |
| provinceId | <code>string</code> \| <code>number</code> | 
| cityId | <code>string</code> \| <code>number</code> | 

**返回**: <code>string</code><br>

<p>城市名字</p>

**示例**

```typescript
const res =  getCityName(37, 14)
// 德州

const res2 =  getCityName(11)
// 北京
```
