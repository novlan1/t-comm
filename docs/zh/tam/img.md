[[toc]]

## `genCustomEventImgAndSendRobot(options)` 


**描述**：<p>获取自定义事件图片并发送</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | <p>配置信息</p> |

**返回**: <code>string</code><br>

<p>图片url</p>

**示例**

```typescript
const requestMultiImgDate = Date.now() - 1 * 24 * 60 * 60 * 1000;

const tamGroupIdList = [1, 2, 3];

const eventProjectMap = {
  62659: {
    name: 'aaaaa',
  },
  57706: {
    name: 'bbbbb',
    extraProjectId: 66379,
  },
};

const eventMap = {
  WX_SUC: {
    // 总和
    type: 'SUMMARY',
    target: ['ENTER_GAME_WX_SUC', 'LAUNCH_GAME_SUC_WX'],
  },
  WX_FAIL: {
    // 总和
    type: 'SUMMARY',
    target: ['ENTER_GAME_WX_FAIL', 'LAUNCH_GAME_FAIL_WX'],
  },
};

const eventTableHeaderMap = {
  ProjectName: {
    name: '项目名称',
    tableWidth: 95,
  },
  ALL_SUMMARY: {
    name: '拉起总数',
    tableWidth: 65,
  },
};

genCustomEventImgAndSendRobot({
  date: requestLaunchGameDate,
  secretInfo: {
    getPwdCode,
    encrypt,
    apiKey: process.env.AEGIS_APP_KEY,
    loginName: 'lee',
  },
  projectIdMap: eventProjectMap,
  eventMap,
  tableHeaderMap: eventTableHeaderMap,
  webhookUrl: tamRobotWebhook,
  chatId: tamRobotChatId,
});
```
<a name="genMultiImgAndSendRobot"></a>

## `genMultiImgAndSendRobot(options)` 


**描述**：<p>生成多个图片并发送机器人</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | <p>配置</p> |



**示例**

```typescript
const requestMultiImgDate = Date.now() - 1 * 24 * 60 * 60 * 1000;

const tamGroupIdList = [1, 2, 3];

const summaryScoreTableHeaderMap = {
  ProjectName: {
    name: '项目名称',
    tableWidth: 95,
  },
  PagePv: {
    name: 'PV',
    tableWidth: 65,
  },
};

const eventProjectMap = {
  62659: {
    name: 'aaaaa',
  },
  57706: {
    name: 'bbbbb',
    extraProjectId: 66379,
  },
};

const eventMap = {
  WX_SUC: {
    // 总和
    type: 'SUMMARY',
    target: ['ENTER_GAME_WX_SUC', 'LAUNCH_GAME_SUC_WX'],
  },
  WX_FAIL: {
    // 总和
    type: 'SUMMARY',
    target: ['ENTER_GAME_WX_FAIL', 'LAUNCH_GAME_FAIL_WX'],
  },
};

const eventTableHeaderMap = {
  ProjectName: {
    name: '项目名称',
    tableWidth: 95,
  },
  ALL_SUMMARY: {
    name: '拉起总数',
    tableWidth: 65,
  },
};

await genMultiImgAndSendRobot({
  date: requestMultiImgDate,
  secretInfo: {
    getPwdCode,
    encrypt,
    apiKey: process.env.AEGIS_APP_KEY,
    loginName: 'lee',
  },
  webhookUrl: tamRobotWebhook,
  chatId: tamRobotChatId,

  groupIdList: tamGroupIdList,
  eventProjectIdMap: eventProjectMap,
  tableHeaderMap: summaryScoreTableHeaderMap,

  eventMap,
  eventTableHeaderMap,
});
```
<a name="parseResult"></a>

## `parseResult()` 


**描述**：<p>[
{
region: '巴西',
allCount: 100,
firstScreen: 1000,
[key]: value
},
'xx': {
// ...
}
]</p>

**参数**：



<a name="genSummaryDataAndSendRobot"></a>

## `genSummaryDataAndSendRobot(options)` 


**描述**：<p>生成TAM汇总数据并发送到机器人</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | <p>配置</p> |
| options.date | <code>string</code> | <p>日期，yyyyMMdd格式</p> |
| options.groupIdList | <code>Array&lt;number&gt;</code> | <p>groupId列表</p> |
| options.secretInfo | <code>object</code> | <p>密钥信息</p> |
| options.secretInfo.apiKey | <code>string</code> | <p>apiKey</p> |
| options.secretInfo.loginName | <code>string</code> | <p>loginName</p> |
| options.secretInfo.getPwdCode | <code>function</code> | <p>getPwdCode</p> |
| options.secretInfo.encrypt | <code>function</code> | <p>encrypt</p> |
| options.extraDataMap | <code>object</code> | <p>额外数据Map</p> |
| options.ignoreProjectIdList | <code>object</code> | <p>忽略的projectIdList</p> |
| options.tableHeaderMap | <code>object</code> | <p>表格头部Map</p> |
| options.webhookUrl | <code>object</code> | <p>机器人回调地址</p> |
| options.chatId | <code>object</code> | <p>会话Id</p> |



**示例**

```typescript
const requestSummaryScoreDate = Date.now() - 1 * 24 * 60 * 60 * 1000;

const tamGroupIdList = [1, 2, 3];

const summaryScoreTableHeaderMap = {
  ProjectName: {
    name: '项目名称',
    tableWidth: 95,
  },
  PagePv: {
    name: 'PV',
    tableWidth: 65,
  },
};

await genSummaryDataAndSendRobot({
  date: requestSummaryScoreDate,
  groupIdList: tamGroupIdList,
  secretInfo: {
    getPwdCode,
    encrypt,
    apiKey: process.env.AEGIS_APP_KEY,
    loginName: 'lee',
  },
  webhookUrl: tamRobotWebhook,
  chatId: tamRobotChatId,
  tableHeaderMap: summaryScoreTableHeaderMap,
});
```
