[[toc]]

<h2>引入</h2>

```ts
import {
  flat,
  flatten,
  shuffle,
  getAccCellWidth,
  isListAllEqual,
  getKeyValuesMap,
  getPreviousRatio,
  getMaxAndMinIdx,
  flattenPreData,
  compareTwoList
} from 't-comm';

// or
import {
  flat,
  flatten,
  shuffle,
  getAccCellWidth,
  isListAllEqual,
  getKeyValuesMap,
  getPreviousRatio,
  getMaxAndMinIdx,
  flattenPreData,
  compareTwoList
} from 't-comm/lib/base/list/index';
```


## `flat(list)` 


**描述**：<p>递归拉平数组</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| list | <p>数组</p> |

**返回**: <p>数组</p>

**示例**

```typescript
flat([[[1, 2, 3], 4], 5])

// [1, 2, 3, 4, 5]
```
<a name="flatten"></a>

## `flatten(list, key)` 


**描述**：<p>拉平数组，不会递归处理</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| list | <code>Array&lt;Object&gt;</code> | <p>对象数组</p> |
| key | <code>string</code> | <p>对象的key</p> |

**返回**: <code>object</code><br>

<p>拉平后的对象</p>

**示例**

```typescript
const list = [{id: 1, name: 'a'}, {id: 2, name: 'b'}]

flatten(list, 'id')

// {1: {id: 1, name: 'a'}, 2: {id: 2, name: 'b'}}
```
<a name="shuffle"></a>

## `shuffle(array)` 


**描述**：<p>打乱数组顺序</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| array | <code>Array&lt;any&gt;</code> | <p>数组</p> |

**返回**: <code>Array&lt;any&gt;</code><br>

<p>乱序后的数组</p>

**示例**

```typescript
shuffle([1, 2, 3, 4, 5])

// [3, 2, 1, 4, 5]
```
<a name="getAccCellWidth"></a>

## `getAccCellWidth(cellWidthList, idx)` 


**描述**：<p>获取累积宽度</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| cellWidthList | <code>Array&lt;number&gt;</code> | <p>宽度列表</p> |
| idx | <code>number</code> | <p>当前idx</p> |

**返回**: <code>number</code><br>

<p>累计宽度</p>

**示例**

```typescript
getAccCellWidth([20, 10, 20, 10], 1)

// 30
```
<a name="isListAllEqual"></a>

## `isListAllEqual(list)` 


**描述**：<p>判断数组是否全部相等</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| list | <code>Array&lt;(number\|string)&gt;</code> | <p>数组</p> |

**返回**: <code>Boolean</code><br>

<p>是否全部相等</p>

**示例**

```typescript
isListAllEqual([0, 0, 0])

// true

isListAllEqual([0, 0, 2])

// false
```
<a name="getKeyValuesMap"></a>

## `getKeyValuesMap(data)` 


**描述**：<p>获取对象的value列表，并输出大对象形式</p>

**参数**：


| 参数名 | 类型 |
| --- | --- |
| data | <code>Array&lt;any&gt;</code> | 

**返回**: <code>Object</code><br>

<p>处理后的对象</p>

**示例**

```typescript
const data = [
{
  Project: 'x',
  Request: 1,
  Score: 'a'
},
{
  Project: 'y',
  Request: 2,
  Score: 'b'
}]

getKeyValuesMap(data)

// 结果为:
{
  Project: ['x', 'y'],
  Request: [1, 2],
  Score: ['a', 'b'],
}

// 也支持参数为带value属性的对象数组，如：

const data = [
{
  Project: {
    value: 'x'
  }
},{
  Project: {
    value: 'y'
  }
}]

// 结果为：
{
  Project: ['x', 'y']
}
```
<a name="getPreviousRatio"></a>

## `getPreviousRatio(data, preDataMap, uniqKey)` 


**描述**：<p>获取相对上次的比例，会给输入的对象数组的每一项增加 ratio、previousValue 属性</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| data | <code>Array&lt;Object&gt;</code> | <p>输入数据</p> |
| preDataMap | <code>Object</code> | <p>上次数据的map</p> |
| uniqKey | <code>string</code> | <p>唯一键</p> |



**示例**

```typescript
const data = [{
  Project: { value: 'mj-match', name: 'Project' },
  Request: {
    value: 854,
    name: 'Request',
    idx: 19,
    lastIdx: 19,
    isMax: false,
    isMin: false,
    isSecondMax: false,
    isSecondMin: true,
  },
}];

const preDataMap = {
  'mj-match': {
    Project: 'mj-match',
    Request: 4,
    Score: 91.81,
    FirstLoadTime: 178,
    WholePageTime: 1035,
    ParseDomTime: 484,
    DNSLinkTime: 0,
    DOMTime: 414,
    TCP: 0,
    HTTP: 275,
    BackEnd: 60,
    CGIFailNum: 0,
    ErrorLogNum: 0,
    CGIRequestNum: 83,
  },
};

getPreviousRatio(data, preDataMap);

// data会变成：
[{
  Project: { value: 'mj-match', name: 'Project' },
  Request: {
    value: 854,
    name: 'Request',
    idx: 19,
    lastIdx: 19,
    isMax: false,
    isMin: false,
    isSecondMax: false,
    isSecondMin: true,

    previousValue: 4, // 新增属性
    ratio: "+999+%" // 新增属性
  },
}];
```
<a name="getMaxAndMinIdx"></a>

## `getMaxAndMinIdx(data, reverseScoreKeys)` 


**描述**：<p>给对象数组的每一项，添加isMax、isMin、、isSecondMax、isSecondMin、idx、lastIdx等属性</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| data | <code>Array&lt;object&gt;</code> | <p>原始数据</p> |
| reverseScoreKeys | <code>Array&lt;string&gt;</code> | <p>逆序的key列表</p> |

**返回**: <code>Object</code><br>

<p>处理后的数据</p>

**示例**

```typescript
const data = [{
  ProjectName: { name: 'ProjectName', value: '麻将赛事' },
  PagePv: { name: 'PagePv', value: 2877 },
}, {
  ProjectName: { name: 'ProjectName', value: '斗地主赛事' },
  PagePv: { name: 'PagePv', value: 7 },
},
// ...
];

getMaxAndMinIdx(data, [])

// =>
  [{
    ProjectName: { name: 'ProjectName', value: '麻将赛事' },
    PagePv: {
      name: 'PagePv',
      value: 2877,
      idx: 6,
      lastIdx: 6,
      isMax: false,
      isMin: false,
      isSecondMax: false,
      isSecondMin: false,
    },
  }];
```
<a name="flattenPreData"></a>

## `flattenPreData(preDataList, key)` 


**描述**：<p>拉平之前数据</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| preDataList | <code>Array&lt;Object&gt;</code> | <p>之前的数据，作为对照</p> |
| key | <code>string</code> | <p>主键</p> |

**返回**: <code>Object</code><br>

<p>preDataMap</p>

**示例**

```typescript
const data = [{
  ProjectName: { name: 'ProjectName', value: '研发平台' },
  PagePv: { name: 'PagePv', value: 152 },
  PageUv: { name: 'PageUv', value: 7 },
  Score: { name: 'Score', value: 93.92 },
  PageDuration: { name: 'PageDuration', value: 1281.58 },
  PageError: { name: 'PageError', value: 2 },
}];

flattenPreData(data, 'ProjectName');

// 输出
{
  研发平台: {
    ProjectName: '研发平台',
    PagePv: 152,
    PageUv: 7,
    Score: 93.92,
    PageDuration: 1281.58,
    PageError: 2,
  },
};
```
<a name="compareTwoList"></a>

## `compareTwoList(list, preList, key)` 


**描述**：<p>对比两个对象列表</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| list | <code>Array&lt;object&gt;</code> | <p>现在数据</p> |
| preList | <code>Array&lt;object&gt;</code> | <p>参照数据</p> |
| key | <code>string</code> | <p>唯一key名称</p> |

**返回**: <code>Array&lt;object&gt;</code><br>

<p>对比结果，增加为list的每一项增加previousValue和ratio属性</p>

**示例**

```typescript
const list = [
  {
    ProjectName: { name: 'ProjectName', value: '脚手架' },
    PagePv: { name: 'PagePv', value: 544343 },
    PageUv: { name: 'PageUv', value: 225275 },
  }
]

const preList = [
  {
    ProjectName: { name: 'ProjectName', value: '脚手架' },
    PagePv: { name: 'PagePv', value: 123123 },
    PageUv: { name: 'PageUv', value: 33333 },
  }
]

compareTwoList(list, preList, 'ProjectName')

console.log(list)

[
  {
    ProjectName: { name: 'ProjectName', value: '脚手架' },
    PagePv: {
      name: 'PagePv',
      value: 544343,
      ratio: '+342.1%',
      previousValue: 123123
    },
    PageUv: {
      name: 'PageUv',
      value: 225275,
      ratio: '+575.8%',
      previousValue: 33333
    }
  }
]
```
