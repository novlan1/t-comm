
### 引入

```ts
import {
  getRandomString,
  checkStringLength,
  randomString,
  replaceAllPolyfill,
  camelize,
  hyphenate,
  capitalize,
  titleize,
  lowerInitial,
  pascalCase,
  toUnicodeAt,
  toUnicode
} from 't-comm';

// 不支持 tree-shaking 的项目
import {
  getRandomString,
  checkStringLength,
  randomString,
  replaceAllPolyfill,
  camelize,
  hyphenate,
  capitalize,
  titleize,
  lowerInitial,
  pascalCase,
  toUnicodeAt,
  toUnicode
} from 't-comm/lib/base/string/index';

// 只支持 ESM 的项目
import {
  getRandomString,
  checkStringLength,
  randomString,
  replaceAllPolyfill,
  camelize,
  hyphenate,
  capitalize,
  titleize,
  lowerInitial,
  pascalCase,
  toUnicodeAt,
  toUnicode
} from 't-comm/es/base/string/index';
```


### `getRandomString` 


**描述**：<p>获取随机字符串</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| length | <code>number</code> | <p>字符串长度，默认 32</p> |

**返回**: <code>string</code><br>

<p>字符串</p>

**示例**

```ts
randomString()

randomString(16)
```
<a name="checkStringLength"></a>

### `checkStringLength(str, [num])` 


**描述**：<p>检查字符串长度</p>

**参数**：


| 参数名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| str | <code>string</code> |  | <p>字符串</p> |
| [num] | <code>number</code> | <code>30</code> | <p>长度</p> |



**示例**

```typescript
checkStringLength('123', 2) // true
checkStringLength('123', 3) // true
checkStringLength('123', 4) // false
```
<a name="randomString"></a>

### `randomString(length)` 


**描述**：<p>获取随机字符串</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| length | <code>number</code> | <p>字符串长度，默认 32</p> |

**返回**: <code>string</code><br>

<p>字符串</p>

**示例**

```ts
randomString()

randomString(16)
```
<a name="replaceAllPolyfill"></a>

### `replaceAllPolyfill()` 


**描述**：<p>polyfill for replaceAll</p>

**参数**：



**示例**

```typescript
replaceAllPolyfill()
```
<a name="camelize"></a>

### `camelize(str, handleSnake)` 


**描述**：<p>横线转驼峰命名，如果第一个字符是字母，则不处理。</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| str | <code>string</code> | <p>输入字符串</p> |
| handleSnake | <code>boolean</code> | <p>是否处理下划线，默认不处理</p> |

**返回**: <code>string</code><br>

<p>处理后的字符串</p>

**示例**

```typescript
camelize('ab-cd-ef')

// => abCdEf
```
<a name="hyphenate"></a>

### `hyphenate(str)` 


**描述**：<p>驼峰命名转横线命名：拆分字符串，使用 - 相连，并且转换为小写</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| str | <code>string</code> | <p>输入字符串</p> |

**返回**: <code>string</code><br>

<p>处理后的字符串</p>

**示例**

```typescript
hyphenate('abCd')

// => ab-cd
```
<a name="capitalize"></a>

### `capitalize(str)` 


**描述**：<p>字符串首位大写</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| str | <code>string</code> | <p>输入字符串</p> |

**返回**: <code>string</code><br>

<p>处理后的字符串</p>

**示例**

```typescript
capitalize('abc')

// => Abc
```
<a name="titleize"></a>

### `titleize(str)` 


**描述**：<p>将每个单词的首字母转换为大写</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| str | <code>string</code> | <p>输入字符串</p> |

**返回**: <code>string</code><br>

<p>处理后的字符串</p>

**示例**

```typescript
titleize('my name is yang')

// My Name Is Yang

titleize('foo-bar')

// Foo-Bar
```
<a name="lowerInitial"></a>

### `lowerInitial(str)` 


**描述**：<p>首字母小写</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| str | <code>string</code> | <p>输入字符串</p> |

**返回**: <code>string</code><br>

<p>输出字符串</p>

**示例**

```typescript
lowerInitial('GroupId')

// groupId
```
<a name="pascalCase"></a>

### `pascalCase(str)` 


**描述**：<p>用大驼峰，即 PascalCase 格式，来格式化字符串</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| str | <p>字符串</p> |

**返回**: <p>PascalCase 的字符串</p>

**示例**

```ts
pascalCase('ab-cd')
// AbCd

pascalCase('ab_cd')
// AbCd
```
<a name="toUnicodeAt"></a>

### `toUnicodeAt(str, index)` 


**描述**：<p>获取字符串指定下标的 unicode</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| str | <code>string</code> | <p>字符串</p> |
| index | <code>number</code> | <p>unicode 的下标</p> |

**返回**: <code>string</code><br>

<p>data</p>

**示例**

```typescript
unicodeAt('ABC', 1)

// -> '\\u0042'
```
<a name="toUnicode"></a>

### `toUnicode(str)` 


**描述**：<p>获取字符串的 unicode</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| str | <code>string</code> | <p>字符串</p> |

**返回**: <code>string</code><br>

<p>data</p>

**示例**

```typescript
toUnicode('ABC')

// -> '\\u0041\\u0042\\u0043'
```
