[[toc]]

<h2>引入</h2>

```ts
import {
  launchDDZGameRoom,
  launchGNGameRoom,
  launchGPGameRoom,
  launchMJGameRoom
} from 't-comm';

// or
import {
  launchDDZGameRoom,
  launchGNGameRoom,
  launchGPGameRoom,
  launchMJGameRoom
} from 't-comm/lib/launch-game/index';
```


## `launchDDZGameRoom` 


**描述**：<p>拉起 DDZ</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| params | <code>object</code> | <p>拉起参数</p> |
| params.seriesId | <code>string</code> | <p>series id</p> |
| params.gameId | <code>string</code> | <p>game id</p> |
| params.uin | <code>string</code> | <p>uin</p> |
| [params.context] | <code>object</code> | <p>上下文，可传入组件实例 this</p> |
| [params.qrCodeLib] | <code>object</code> | <p>qrcode</p> |
| [params.dialogHandler] | <code>object</code> | <p>弹窗 handler</p> |
| [params.otherDialogParams] | <code>object</code> | <p>弹窗的其他参数</p> |
| [params.wxJSLink] | <code>string</code> | <p>wx js link</p> |
| [params.env] | <code>object</code> | <p>环境对象</p> |

**返回**: <p>Promise&lt;boolean | number&gt;</p>

**示例**

```ts
launchDDZGameRoom({
  seriesId: '12',
  gameId: '123',
  uin: '222',
})
```
<a name="launchGNGameRoom"></a>

## `launchGNGameRoom(params)` 


**描述**：<p>拉起 GN</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| params | <code>object</code> | <p>拉起参数</p> |
| params.roomId | <code>string</code> | <p>房间 Id</p> |
| params.roomPwd | <code>string</code> | <p>房间 Pwd</p> |
| [params.context] | <code>object</code> | <p>上下文，可传入组件实例 this</p> |
| [params.qrCodeLib] | <code>object</code> | <p>qrcode</p> |
| [params.dialogHandler] | <code>object</code> | <p>弹窗 handler</p> |
| [params.otherDialogParams] | <code>object</code> | <p>弹窗的其他参数</p> |
| [params.wxJSLink] | <code>string</code> | <p>wx js link</p> |
| [params.env] | <code>object</code> | <p>环境对象</p> |

**返回**: <p>Promise&lt;boolean | number&gt;</p>

**示例**

```ts
launchGNGameRoom({
  roomId: '12',
  roomPwd: '123'
})
```
<a name="launchGPGameRoom"></a>

## `launchGPGameRoom(params)` 


**描述**：<p>拉起 GP</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| params | <code>object</code> | <p>拉起参数</p> |
| params.roomId | <code>string</code> | <p>房间 Id</p> |
| params.roomPwd | <code>string</code> | <p>房间 Pwd</p> |
| [params.wxJSLink] | <code>string</code> | <p>wx js link</p> |
| [params.env] | <code>object</code> | <p>环境对象</p> |

**返回**: <p>Promise&lt;boolean | number&gt;</p>

**示例**

```ts
launchGPGameRoom({
  roomId: '12',
  roomPwd: '123'
})
```
<a name="launchMJGameRoom"></a>

## `launchMJGameRoom(params)` 


**描述**：<p>拉起 MJ</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| params | <code>object</code> | <p>拉起参数</p> |
| params.seriesId | <code>string</code> | <p>series id</p> |
| params.gameId | <code>string</code> | <p>game id</p> |
| params.uin | <code>string</code> | <p>uin</p> |
| [params.context] | <code>object</code> | <p>上下文，可传入组件实例 this</p> |
| [params.qrCodeLib] | <code>object</code> | <p>qrcode</p> |
| [params.dialogHandler] | <code>object</code> | <p>弹窗 handler</p> |
| [params.otherDialogParams] | <code>object</code> | <p>弹窗的其他参数</p> |
| [params.wxJSLink] | <code>string</code> | <p>wx js link</p> |
| [params.env] | <code>object</code> | <p>环境对象</p> |

**返回**: <p>Promise&lt;boolean | number&gt;</p>

**示例**

```ts
launchMJGameRoom({
  seriesId: '12',
  gameId: '123',
  uin: '222',
})
```
