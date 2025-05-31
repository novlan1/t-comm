<h3 style="margin-bottom: -1rem;">目录</h3>

[[toc]]

<h3>引入</h3>

```ts
import { statisticsPages, statisticsComponent } from 't-comm';

// or
import { statisticsPages, statisticsComponent} from 't-comm/lib/pages-statistics/index';
```


### `statisticsPages()` 


**描述**：<p>统计页面个数</p>

**参数**：



**示例**

```typescript
statisticsPages('dist/build/mp-weixin/app.json')
```
<a name="statisticsComponent"></a>

### `statisticsComponent()` 


**描述**：<p>统计组件个数</p>

**参数**：



**示例**

```typescript
statisticsComponent('dist/build/mp-weixin');
```
