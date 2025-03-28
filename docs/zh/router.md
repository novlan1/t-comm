[[toc]]

<h2>引入</h2>

```ts
import {
  findRouteName,
  getRouterFuncPath,
  getH5CurrentUrl,
  uniHookRouter
} from 't-comm';

// or
import {
  findRouteName,
  getRouterFuncPath,
  getH5CurrentUrl,
  uniHookRouter
} from 't-comm/lib/router/index';
```


## `findRouteName(path, routes)` 


**描述**：<p>根据路由表，找到 path 对应的 路由名称</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| path | <code>string</code> | <p>路由路径</p> |
| routes | <code>array</code> | <p>路由表</p> |

**返回**: <code>object</code><br>

<p>匹配到的路由信息</p>

**示例**

```ts
const { name, params, meta, path } = findRouteName(rawPath, ALL_ROUTES) || {};

console.log('name', name);
```
<a name="getRouterFuncPath"></a>

## `getRouterFuncPath(route)` 


**描述**：<p>根据路由跳转时的参数，提取 path 和其他参数</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| route | <p>$router.push 或者 $router.replace 的参数</p> |

**返回**: <p>解析结果</p>

<a name="getH5CurrentUrl"></a>

## `getH5CurrentUrl(route)` 


**描述**：<p>小程序下，获取对应的 H5 路由信息</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| route | <code>Object</code> | <p>路由信息</p> |

**返回**: <p>H5 Url</p>

**示例**

```ts
getH5CurrentUrl(this.$route);
```
<a name="uniHookRouter"></a>

## `uniHookRouter()` 


**描述**：<p>拦截路由</p>

**参数**：



**示例**

```ts
uniHookRouter({
  navigateToHooks: [
    () => console.log('1')
  ],
   navigateBackHooks: [
     () => console.log('2')
   ],
   redirectToHooks: [
     () => console.log('3')
   ],
   debug: true,
})
```
