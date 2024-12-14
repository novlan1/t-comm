[[toc]]

<h2>引入</h2>

```ts
import {
  getMonthDay,
  getMonthDay2,
  isSameWeek,
  isSameDay,
  parseTime,
  getTimeAgo,
  getTimeAgoOrDate,
  getCountDownObj,
  getDayStartTimestamp,
  getDayEndTimeStamp
} from 't-comm';

// or
import {
  getMonthDay,
  getMonthDay2,
  isSameWeek,
  isSameDay,
  parseTime,
  getTimeAgo,
  getTimeAgoOrDate,
  getCountDownObj,
  getDayStartTimestamp,
  getDayEndTimeStamp
} from 't-comm/lib/date/index';
```


## `getMonthDay(year, month)` 


**描述**：<p>获取一个月有多少天
原理：new Date()第2个参数默认为1，就是每个月的1号，把它设置为0时，
new Date()会返回上一个月的最后一天，然后通过getDate()方法得到天数</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| year | <code>string</code> | <p>年份</p> |
| month | <code>string</code> | <p>月份</p> |

**返回**: <code>number</code><br>

<p>天数</p>

**示例**

```typescript
getMonthDay(2022, 2) // 28

getMonthDay(2022, 3) // 31

getMonthDay(2022, 4) // 30
```
<a name="getMonthDay2"></a>

## `getMonthDay2(year, month)` 


**描述**：<p>获取一个月有多少天</p>
<p>原理：把每月的天数写在数组中，再判断时闰年还是平年确定2月分的天数</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| year | <code>string</code> | <p>年份</p> |
| month | <code>string</code> | <p>月份</p> |

**返回**: <code>number</code><br>

<p>天数</p>

**示例**

```typescript
getMonthDay2(2022, 2)
// 28

getMonthDay2(2022, 3)
// 31

getMonthDay2(2022, 4)
// 30
```
<a name="isSameWeek"></a>

## `isSameWeek(date1, date2)` 


**描述**：<p>判断两个日期是否属于同一周</p>
<p>原理：把两个日期均转换到周一，比较转换后的两日期是否相同。</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| date1 | <code>number</code> | <p>第1个时间戳</p> |
| date2 | <code>number</code> | <p>第2个时间戳</p> |

**返回**: <code>boolean</code><br>

<p>是否是同一周</p>

**示例**

```typescript
isSameWeek(1601308800000, 1601395200000)

// true

isSameWeek(1601308800000, 1601913600000)

// false
```
<a name="isSameDay"></a>

## `isSameDay(date1, date2)` 


**描述**：<p>判断是否是同一天</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| date1 | <code>number</code> | <p>时间戳</p> |
| date2 | <code>number</code> | <p>时间戳</p> |

**返回**: <p>是否相同</p>

**示例**

```ts
isSameDay(1702613769418, 1702613769419) // true
```
<a name="parseTime"></a>

## `parseTime(time, cFormat)` 


**描述**：<p>功能和上面的dateFormat/timeStampFormat类型，只是参数time可以接收多种类型，且参数cFormat用的是{y}形式</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| time | <code>Object</code> \| <code>string</code> \| <code>number</code> | <p>输入日期</p> |
| cFormat | <code>string</code> | <p>时间格式</p> |

**返回**: <code>string</code> \| <code>null</code><br>

<p>格式化后的日期字符串</p>

**示例**

```typescript
const date = new Date('2020-11-27 8:23:24');

const res = parseTime(date, 'yyyy-MM-dd hh:mm:ss')

// 2020-11-27 08:23:24
```
<a name="getTimeAgo"></a>

## `getTimeAgo(timestamp)` 


**描述**：<p>获取某个时间戳距离今天的时间</p>

**参数**：


| 参数名 | 类型 |
| --- | --- |
| timestamp | <code>number</code> | 

**返回**: <code>string</code><br>

<p>距离今天的时间描述</p>

**示例**

```typescript
const date = new Date('2020-11-27 8:23:24').getTime();
getTimeAgo(date);
// 1个月前

const date2 = new Date('2021-11-27 8:23:24').getTime();
getTimeAgo(date2);
// 10个月后
```
<a name="getTimeAgoOrDate"></a>

## `getTimeAgoOrDate(timestamp, format)` 


**描述**：<p>功能：获取多久之前，若间隔超过一天，返回时刻描述</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| timestamp | <code>number</code> | <p>时间戳</p> |
| format | <code>string</code> | <p>时间格式</p> |

**返回**: <code>string</code><br>

<p>距离今天的时间描述或者时刻描述</p>

**示例**

```typescript
getTimeAgoOrDate(Date.now() - 60 * 60 * 24 * 1 * 1000);
// 1天前

const date = new Date('2018-07-13 17:54:01').getTime();
getTimeAgoOrDate(date);
// 7月13日17时54分
```
<a name="getCountDownObj"></a>

## `getCountDownObj(time, [maxUnit])` 


**描述**：<p>倒计时（eg:距开赛1天）</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| time | <code>string</code> | <p>剩余时间</p> |
| [maxUnit] | <code>SECOND</code> \| <code>MINUTE</code> \| <code>HOUR</code> \| <code>DAY</code> | <p>最大单位</p> |

**返回**: <code>object</code><br>

<p>剩余时间的描述对象</p>

**示例**

```typescript
getCountDownObj(100)
// { day: 0, hour: 0, minute: 1, second: 40 }

getCountDownObj(1*24*60*60+200)
// { day: 1, hour: 0, minute: 3, second: 20 }

getCountDownObj(1 * 24 * 60 * 60 + 2 * 60 * 60 + 1 * 60 + 11, 'HOUR')
// 结果 =>
{
  fHour: '26',
  fMinute: '01',
  fSecond: '11',
  hour: 26,
  minute: 1,
  second: 11,
}
```
<a name="getDayStartTimestamp"></a>

## `getDayStartTimestamp(n)` 


**描述**：<p>获取几天前的起始时间戳</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| n | <code>boolean</code> | <p>几天前</p> |

**返回**: <code>number</code><br>

<p>时间戳</p>

<a name="getDayEndTimeStamp"></a>

## `getDayEndTimeStamp(n, unit, endFlag)` 


**描述**：<p>获取几天前的终止时间戳</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| n | <code>boolean</code> | <p>几天前</p> |
| unit | <code>string</code> | <p>返回时间戳的单位，默认是s(秒)</p> |
| endFlag | <code>string</code> | <p>以什么单位作为结束时间，默认分钟，即23时59分0秒0毫秒</p> |

**返回**: <code>number</code><br>

<p>时间戳</p>

