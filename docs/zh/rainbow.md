
## `addOrUpdateRainbowKV(config)` 


**描述**：<p>添加或更新配置</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| config | <code>object</code> | <p>配置信息</p> |
| config.keyValue | <code>object</code> | <p>配置对象</p> |
| config.keyValue.key | <code>string</code> | <p>配置的key</p> |
| config.keyValue.value | <code>string</code> | <p>配置的value</p> |
| config.valueType | <code>number</code> | <p>配置类型，1: NUMBER, 2: STRING, 3: TEXT, 4: JSON, 5: XML, 18: 日期, 20: yaml</p> |
| config.secretInfo | <code>object</code> | <p>密钥信息</p> |
| config.secretInfo.appId | <code>string</code> | <p>项目Id</p> |
| config.secretInfo.userId | <code>string</code> | <p>用户Id</p> |
| config.secretInfo.secretKey | <code>string</code> | <p>密钥</p> |
| config.secretInfo.envName | <code>string</code> | <p>配置环境</p> |
| config.secretInfo.groupName | <code>string</code> | <p>配置组</p> |

**返回**: <code>Promise.&lt;object&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
addOrUpdateRainbowKV({
  keyValue: {
    key: 'theKey',
    value: 'theValue',
  },
  valueType: 2,
  secretInfo: {
    appId: 'xxx',
    userId: 'xxx',
    secretKey: 'xxx',
    envName: 'prod',
    groupName: 'xxx',
  }
}).then(() => {

})
```
<a name="addRainbowKV"></a>

## `addRainbowKV(config)` 


**描述**：<p>增加配置</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| config | <code>object</code> | <p>配置信息</p> |
| config.keyValue | <code>object</code> | <p>配置对象</p> |
| config.keyValue.key | <code>string</code> | <p>配置的key</p> |
| config.keyValue.value | <code>string</code> | <p>配置的value</p> |
| config.valueType | <code>number</code> | <p>配置类型，1: NUMBER, 2: STRING, 3: TEXT, 4: JSON, 5: XML, 18: 日期, 20: yaml</p> |
| config.secretInfo | <code>object</code> | <p>密钥信息</p> |
| config.secretInfo.appId | <code>string</code> | <p>项目Id</p> |
| config.secretInfo.userId | <code>string</code> | <p>用户Id</p> |
| config.secretInfo.secretKey | <code>string</code> | <p>密钥</p> |
| config.secretInfo.envName | <code>string</code> | <p>配置环境</p> |
| config.secretInfo.groupName | <code>string</code> | <p>配置组</p> |

**返回**: <code>Promise.&lt;object&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
addRainbowKV({
  keyValue: {
    key: 'theKey',
    value: 'theValue',
  },
  valueType: 2,
  secretInfo: {
    appId: 'xxx',
    userId: 'xxx',
    secretKey: 'xxx',
    envName: 'prod',
    groupName: 'xxx',
  }
}).then(() => {

})
```
<a name="updateRainbowKV"></a>

## `updateRainbowKV(config)` 


**描述**：<p>修改配置</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| config | <code>object</code> | <p>配置信息</p> |
| config.keyValue | <code>object</code> | <p>配置对象</p> |
| config.keyValue.key | <code>string</code> | <p>配置的key</p> |
| config.keyValue.value | <code>string</code> | <p>配置的value</p> |
| config.valueType | <code>number</code> | <p>配置类型，1: NUMBER, 2: STRING, 3: TEXT, 4: JSON, 5: XML, 18: 日期, 20: yaml</p> |
| config.secretInfo | <code>object</code> | <p>密钥信息</p> |
| config.secretInfo.appId | <code>string</code> | <p>项目Id</p> |
| config.secretInfo.userId | <code>string</code> | <p>用户Id</p> |
| config.secretInfo.secretKey | <code>string</code> | <p>密钥</p> |
| config.secretInfo.envName | <code>string</code> | <p>配置环境</p> |
| config.secretInfo.groupName | <code>string</code> | <p>配置组</p> |

**返回**: <code>Promise.&lt;object&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
updateRainbowKV({
  keyValue: {
    key: 'theKey',
    value: 'theValue',
  },
  valueType: 2,
  secretInfo: {
    appId: 'xxx',
    userId: 'xxx',
    secretKey: 'xxx',
    envName: 'prod',
    groupName: 'xxx',
  }
}).then(() => {

})
```
<a name="createRainbowPublishJob"></a>

## `createRainbowPublishJob(config)` 


**描述**：<p>创建发布任务</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| config | <code>object</code> | <p>配置信息</p> |
| config.versionName | <code>string</code> | <p>版本信息</p> |
| config.secretInfo | <code>object</code> | <p>密钥信息</p> |
| config.secretInfo.appId | <code>string</code> | <p>项目Id</p> |
| config.secretInfo.userId | <code>string</code> | <p>用户Id</p> |
| config.secretInfo.secretKey | <code>string</code> | <p>密钥</p> |
| config.secretInfo.envName | <code>string</code> | <p>配置环境</p> |
| config.secretInfo.groupName | <code>string</code> | <p>配置组</p> |

**返回**: <code>Promise.&lt;object&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
createRainbowPublishJob({
  versionName: 'version',
  secretInfo: {
    appId: 'xxx',
    userId: 'xxx',
    secretKey: 'xxx',
    envName: 'prod',
    groupName: 'xxx',
  }
}).then(() => {

})
```
<a name="publishRainbowTask"></a>

## `publishRainbowTask(config)` 


**描述**：<p>发布任务</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| config | <code>object</code> | <p>配置信息</p> |
| config.taskId | <code>string</code> | <p>任务Id</p> |
| config.secretInfo | <code>object</code> | <p>密钥信息</p> |
| config.secretInfo.appId | <code>string</code> | <p>项目Id</p> |
| config.secretInfo.userId | <code>string</code> | <p>用户Id</p> |
| config.secretInfo.secretKey | <code>string</code> | <p>密钥</p> |
| config.secretInfo.envName | <code>string</code> | <p>配置环境</p> |
| config.secretInfo.groupName | <code>string</code> | <p>配置组</p> |

**返回**: <code>Promise.&lt;object&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
publishRainbowTask({
  taskId: 'taskId',
  secretInfo: {
    appId: 'xxx',
    userId: 'xxx',
    secretKey: 'xxx',
    envName: 'prod',
    groupName: 'xxx',
  }
}).then(() => {

})
```
<a name="closeRainbowTask"></a>

## `closeRainbowTask(config)` 


**描述**：<p>关闭任务</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| config | <code>object</code> | <p>配置信息</p> |
| config.taskId | <code>string</code> | <p>任务Id</p> |
| config.secretInfo | <code>object</code> | <p>密钥信息</p> |
| config.secretInfo.appId | <code>string</code> | <p>项目Id</p> |
| config.secretInfo.userId | <code>string</code> | <p>用户Id</p> |
| config.secretInfo.secretKey | <code>string</code> | <p>密钥</p> |
| config.secretInfo.envName | <code>string</code> | <p>配置环境</p> |
| config.secretInfo.groupName | <code>string</code> | <p>配置组</p> |

**返回**: <code>Promise.&lt;object&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
closeRainbowTask({
  taskId: 'taskId',
  secretInfo: {
    appId: 'xxx',
    userId: 'xxx',
    secretKey: 'xxx',
    envName: 'prod',
    groupName: 'xxx',
  }
}).then(() => {

})
```
<a name="updateRainbowKVAndPublish"></a>

## `updateRainbowKVAndPublish(config)` 


**描述**：<p>更新或新增值并发布</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| config | <code>object</code> | <p>配置信息</p> |
| config.key | <code>string</code> | <p>配置key</p> |
| config.value | <code>string</code> | <p>配置value</p> |
| config.valueType | <code>number</code> | <p>配置类型，1: NUMBER, 2: STRING, 3: TEXT, 4: JSON, 5: XML, 18: 日期, 20: yaml</p> |
| config.secretInfo | <code>object</code> | <p>密钥信息</p> |
| config.secretInfo.appId | <code>string</code> | <p>项目Id</p> |
| config.secretInfo.userId | <code>string</code> | <p>用户Id</p> |
| config.secretInfo.secretKey | <code>string</code> | <p>密钥</p> |
| config.secretInfo.envName | <code>string</code> | <p>配置环境</p> |
| config.secretInfo.groupName | <code>string</code> | <p>配置组</p> |

**返回**: <code>Promise.&lt;object&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
updateRainbowKVAndPublish({
  key: 'key',
  value: 'value',
  valueType: 2,
  secretInfo: {
    appId: 'xxx',
    userId: 'xxx',
    secretKey: 'xxx',
    envName: 'prod',
    groupName: 'xxx',
  }
}).then(() => {

})
```
<a name="queryGroupInfo"></a>

## `queryGroupInfo(config)` 


**描述**：<p>查询分组配置</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| config | <code>object</code> | <p>配置信息</p> |
| config.secretInfo | <code>object</code> | <p>密钥信息</p> |
| config.secretInfo.appId | <code>string</code> | <p>项目Id</p> |
| config.secretInfo.userId | <code>string</code> | <p>用户Id</p> |
| config.secretInfo.secretKey | <code>string</code> | <p>密钥</p> |
| config.secretInfo.envName | <code>string</code> | <p>配置环境</p> |
| config.secretInfo.groupName | <code>string</code> | <p>配置组</p> |

**返回**: <code>Promise.&lt;Array&lt;object&gt;&gt;</code><br>

<p>分组配置</p>

**示例**

```typescript
queryGroupInfo({
  secretInfo: {
    appId: 'xxx',
    userId: 'xxx',
    secretKey: 'xxx',
    envName: 'prod',
    groupName: 'xxx',
  }
}).then(() => {

})
```
<a name="fetchRainbowConfig"></a>

## `fetchRainbowConfig(key, secretInfo)` 


**描述**：<p>拉取七彩石配置</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| key | <code>String</code> | <p>七彩石的key</p> |
| secretInfo | <code>object</code> | <p>密钥信息</p> |
| secretInfo.appId | <code>string</code> | <p>项目Id</p> |
| secretInfo.envName | <code>string</code> | <p>环境</p> |
| secretInfo.groupName | <code>string</code> | <p>组名称</p> |

**返回**: <code>Promise.&lt;object&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
fetchRainbowConfig('test', {
  appId: 'xx',
  envName: 'prod',
  groupName: 'robot',
}).then((resp) => {
  console.log(resp)
});
```
