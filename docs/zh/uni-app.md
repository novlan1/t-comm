[[toc]]

<h2>引入</h2>

```ts
import { getRouteLeaveCache, startUniProject } from 't-comm';

// or
import { getRouteLeaveCache, startUniProject} from 't-comm/lib/uni-app/index';
```


## `getRouteLeaveCache()` 


**描述**：<p>路由离开前记住缓存，返回后不刷新页面</p>
<p>比如创建赛事页面，如果前往查看规则，返回后，希望保留之前的表单</p>
<p>注意，用了这个 mixin，就不要用 onShow 了，而是用 mounted，
否则可能会重复触发刷新</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| config.refresh | <code>string</code> | <p>刷新方法</p> |

**返回**: <p>返回对象，包含 beforeRouteLeave 和 activated 方法</p>

<a name="startUniProject"></a>

## `startUniProject(options)` 


**描述**：<p>启动 uni-app 项目</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| options | <p>参数</p> |



**示例**

```ts
startUniProject();

startUniProject({
  debug: false, // 默认为 true，会打印参数
})
```
