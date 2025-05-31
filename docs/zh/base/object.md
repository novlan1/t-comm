
### 引入

```ts
import {
  deepSet,
  toHumpObj,
  extend
} from 't-comm';

// 不支持 tree-shaking 的项目
import {
  deepSet,
  toHumpObj,
  extend
} from 't-comm/lib/base/object/index';

// 只支持 ESM 的项目
import {
  deepSet,
  toHumpObj,
  extend
} from 't-comm/es/base/object/index';
```


### `deepSet(keyStr, target, value)` 


**描述**：<p>深度赋值</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| keyStr | <p>以点拼接的 key，比如 foo.bar</p> |
| target | <p>目标对象</p> |
| value | <p>目标值</p> |



**示例**

```ts
const obj = { a: { b: 1 } };
deepSet('a.c', obj, 2);

console.log(obj);
// { a: { b: 1, c: 2 } }
```
<a name="toHumpObj"></a>

### `toHumpObj(obj)` 


**描述**：<p>将对象中的key由下划线专为驼峰</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| obj | <code>object</code> | <p>对象</p> |

**返回**: <code>object</code><br>

<p>转化后的对象</p>

**示例**

```typescript
const obj = {
  a_a: 'a',
  b_b: [
    {
      bb_b: 'b',
    },
  ],
  c: {
    dd_d: 'd',
    e: {
      ee_e: 'e',
    },
  },
};

toHumpObj(obj);
// { aA: 'a', bB: [ { bbB: 'b' } ], c: { ddD: 'd', e: { eeE: 'e' } } }
```
<a name="extend"></a>

### `extend(to, from)` 


**描述**：<p>将属性混合到目标对象中</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| to | <code>object</code> | <p>目标对象</p> |
| from | <code>object</code> | <p>原始对象</p> |

**返回**: <p>处理后的对象</p>

**示例**

```typescript
const a = { name: 'lee' }
const b = { age: 3 }
extend(a, b)

console.log(a)

// => { name: 'lee', age: 3 }
```
