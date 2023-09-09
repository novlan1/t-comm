[[toc]]

## `parseFunction(func)` 


**描述**：<p>将字符串转为函数</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| func | <code>string</code> | <p>字符串</p> |

**返回**: <code>function</code><br>

<p>字符串对应的函数</p>

**示例**

```typescript
parseFunction('()=>console.log(1)')

// ()=>console.log(1)
```
<a name="cached"></a>

## `cached(fn)` 


**描述**：<p>记忆函数：缓存函数的运算结果</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| fn | <code>function</code> | <p>输入函数</p> |

**返回**: <code>any</code><br>

<p>函数计算结果</p>

**示例**

```typescript
function test(a) {
  return a + 2
}

const cachedTest = cached(test)

cachedTest(1)

// => 3

cachedTest(1)

// => 3
```
