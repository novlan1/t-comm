[[toc]]

<h2>引入</h2>

```ts
import {
  isIdCard,
  isRegExp,
  isDate,
  isFunction,
  isExternal,
  validURL,
  validLowerCase,
  validUpperCase,
  validAlphabets,
  validEmail,
  isString,
  isArray,
  isQQNumber,
  isEmail,
  isMobile,
  isTel
} from 't-comm';

// or
import {
  isIdCard,
  isRegExp,
  isDate,
  isFunction,
  isExternal,
  validURL,
  validLowerCase,
  validUpperCase,
  validAlphabets,
  validEmail,
  isString,
  isArray,
  isQQNumber,
  isEmail,
  isMobile,
  isTel
} from 't-comm/lib/validate/index';
```


## `isIdCard(idCard)` 


**描述**：<p>判断是否合法的身份证号
除了基本的格式校验外，还检查了第18位是否合法，方法如下：</p>
<ul>
<li>逆序排列，放到数组 list 中</li>
<li>x/X 代表数字10</li>
<li>遍历 list，累加 <code>item * ((2 ** index) % 11)</code>，item 为list的每一位，index为下标值</li>
<li>将上一步的累加和余11，判断是否等于1</li>
</ul>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| idCard | <code>string</code> | <p>输入字符串</p> |



**示例**

```typescript
isIdCard('123')
// false

isIdCard('34052419800101001X')
// true
```
<a name="isRegExp"></a>

## `isRegExp(value)` 


**描述**：<p>判断数据是不是正则对象</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| value | <code>any</code> | <p>输入数据</p> |

**返回**: <code>boolean</code><br>

<p>是否是正则对象</p>

**示例**

```typescript
isRegExp(1)

// => false

isRegExp(/\d/)

// => true
```
<a name="isDate"></a>

## `isDate(value)` 


**描述**：<p>判断数据是不是时间对象</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| value | <code>any</code> | <p>输入数据</p> |

**返回**: <code>boolean</code><br>

<p>是否是时间对象</p>

**示例**

```typescript
isDate(1)

// => false

isDate(new Date())

// => true
```
<a name="isFunction"></a>

## `isFunction(value)` 


**描述**：<p>判断数据是不是函数</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| value | <code>any</code> | <p>输入数据</p> |

**返回**: <code>boolean</code><br>

<p>是否是函数</p>

**示例**

```typescript
isFunction(1)

// => false

isFunction(()=>{})

// => true
```
<a name="isExternal"></a>

## `isExternal(path)` 


**描述**：<p>判断是否外部资源</p>

**参数**：


| 参数名 | 类型 |
| --- | --- |
| path | <code>string</code> | 



<a name="validURL"></a>

## `validURL(url)` 


**描述**：<p>判断是否URL</p>

**参数**：


| 参数名 | 类型 |
| --- | --- |
| url | <code>string</code> | 



<a name="validLowerCase"></a>

## `validLowerCase(str)` 


**描述**：<p>判断是否小写</p>

**参数**：


| 参数名 | 类型 |
| --- | --- |
| str | <code>string</code> | 



<a name="validUpperCase"></a>

## `validUpperCase(str)` 


**描述**：<p>判断是否大写</p>

**参数**：


| 参数名 | 类型 |
| --- | --- |
| str | <code>string</code> | 



<a name="validAlphabets"></a>

## `validAlphabets(str)` 


**描述**：<p>判断是否字母字符串</p>

**参数**：


| 参数名 | 类型 |
| --- | --- |
| str | <code>string</code> | 



<a name="validEmail"></a>

## `validEmail(email)` 


**描述**：<p>判断是否合法邮箱地址</p>

**参数**：


| 参数名 | 类型 |
| --- | --- |
| email | <code>string</code> | 



<a name="isString"></a>

## `isString(str)` 


**描述**：<p>判断是否字符串</p>

**参数**：


| 参数名 | 类型 |
| --- | --- |
| str | <code>string</code> | 



<a name="isArray"></a>

## `isArray(arg)` 


**描述**：<p>判断是否数组</p>

**参数**：


| 参数名 | 类型 |
| --- | --- |
| arg | <code>Array</code> | 



<a name="isQQNumber"></a>

## `isQQNumber(qq)` 


**描述**：<p>判断是否合法的QQ号码</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| qq | <code>String</code> | <p>待检测的qq号</p> |



<a name="isEmail"></a>

## `isEmail(email)` 


**描述**：<p>判断是否合法的邮箱号码</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| email | <code>String</code> | <p>待检测的邮箱号码</p> |



<a name="isMobile"></a>

## `isMobile(phone)` 


**描述**：<p>判断是否合法的手机号</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| phone | <code>String</code> | <p>待检测的手机号</p> |



<a name="isTel"></a>

## `isTel(tel)` 


**描述**：<p>判断是否合法的电话号码</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| tel | <code>String</code> | <p>待检测的电话号码</p> |



