
## `getBranchLifeCycle(options)` 


**描述**：<p>获取tGit上某分支生命周期</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | <p>输入配置</p> |
| options.projectName | <code>string</code> | <p>项目名称</p> |
| options.branchName | <code>string</code> | <p>分支名称</p> |
| options.privateToken | <code>string</code> | <p>密钥</p> |

**返回**: <code>Promise.&lt;object&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
getBranchLifeCycle({
  projectName: 't-comm',
  branchName: 'master',
  privateToken: 'xxxxx',
}).then((resp) => {

})
```
<a name="getProjectDefaultBranch"></a>

## `getProjectDefaultBranch(options)` 


**描述**：<p>获取默认分支</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | <p>输入配置</p> |
| options.projectName | <code>string</code> | <p>项目名称</p> |
| options.privateToken | <code>string</code> | <p>密钥</p> |

**返回**: <code>Promise.&lt;string&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
getProjectDefaultBranch({
  projectName: 't-comm',
  privateToken: 'xxxxx',
}).then((branch) => {
 console.log('branch: ', branch)
})
```
<a name="getBranchesByProjectName"></a>

## `getBranchesByProjectName(options)` 


**描述**：<p>获取仓库的分支列表</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | <p>输入配置</p> |
| options.projectName | <code>string</code> | <p>项目名称</p> |
| options.privateToken | <code>string</code> | <p>密钥</p> |

**返回**: <code>Promise.&lt;Array.&lt;object&gt;&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
getBranchesByProjectName({
  projectName: 't-comm',
  privateToken: 'xxxxx',
}).then((resp) => {

})
```
<a name="getOneBranchDetail"></a>

## `getOneBranchDetail(options)` 


**描述**：<p>获取分支详情</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | <p>输入配置</p> |
| options.projectName | <code>string</code> | <p>项目名称</p> |
| options.branchName | <code>string</code> | <p>分支名称</p> |
| options.privateToken | <code>string</code> | <p>密钥</p> |

**返回**: <code>Promise.&lt;object&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
getOneBranchDetail({
  projectName: 't-comm',
  branchName: 'master',
  privateToken: 'xxxxx',
}).then((resp) => {

})
```
<a name="getOneCommitDetail"></a>

## `getOneCommitDetail(options)` 


**描述**：<p>获取commit详情</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | <p>输入配置</p> |
| options.projectName | <code>string</code> | <p>项目名称</p> |
| options.commitId | <code>string</code> | <p>提交hash</p> |
| options.privateToken | <code>string</code> | <p>密钥</p> |

**返回**: <code>Promise.&lt;object&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
getOneCommitDetail({
  projectName: 't-comm',
  commitId: 'aaaa',
  privateToken: 'xxxxx',
}).then((resp) => {

})
```
<a name="createMR"></a>

## `createMR(options)` 


**描述**：<p>创建MR</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | <p>输入配置</p> |
| options.projectName | <code>string</code> | <p>项目名称</p> |
| options.privateToken | <code>string</code> | <p>密钥</p> |
| options.sourceBranch | <code>string</code> | <p>源分支</p> |
| options.targetBranch | <code>string</code> | <p>目标分支</p> |

**返回**: <code>Promise.&lt;object&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
createMR({
  projectName: 't-comm',
  privateToken: 'xxxxx',
  sourceBranch: 'master',
  targetBranch: 'release',
}).then((resp) => {

})
```
<a name="getMrList"></a>

## `getMrList(options)` 


**描述**：<p>获取MR列表</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | <p>输入配置</p> |
| options.projectName | <code>string</code> | <p>项目名称</p> |
| options.privateToken | <code>string</code> | <p>密钥</p> |

**返回**: <code>Promise.&lt;object&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
getMrList({
  projectName: 't-comm',
  privateToken: 'xxxxx',
}).then((resp) => {

})
```
<a name="getOneMrComments"></a>

## `getOneMrComments(options)` 


**描述**：<p>获取MR的一条评论</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | <p>输入配置</p> |
| options.projectName | <code>string</code> | <p>项目名称</p> |
| options.privateToken | <code>string</code> | <p>密钥</p> |
| options.mrId | <code>string</code> | <p>某次MR的Id</p> |

**返回**: <code>Promise.&lt;object&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
getOneMrComments({
  projectName: 't-comm',
  privateToken: 'xxxxx',
  mrId: '1'
}).then((resp) => {

})
```
<a name="getOneProjectDetail"></a>

## `getOneProjectDetail(options)` 


**描述**：<p>获取仓库详情</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | <p>输入配置</p> |
| options.projectName | <code>string</code> | <p>项目名称</p> |
| options.privateToken | <code>string</code> | <p>密钥</p> |

**返回**: <code>Promise.&lt;object&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
getOneProjectDetail({
  projectName: 't-comm',
  privateToken: 'xxxxx',
}).then((resp) => {

})
```
<a name="getOneProjectBySearch"></a>

## `getOneProjectBySearch(options)` 


**描述**：<p>通过搜索获取一个项目信息</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | <p>输入配置</p> |
| options.search | <code>string</code> | <p>搜索内容</p> |
| options.page | <code>string</code> | <p>起始页码</p> |
| options.privateToken | <code>string</code> | <p>密钥</p> |

**返回**: <code>Promise.&lt;Array.&lt;object&gt;&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
getOneProjectBySearch({
  search: 't-comm',
  page: 1,
  privateToken: 'xxxxx',
}).then((resp) => {

})
```
<a name="getAllProjects"></a>

## `getAllProjects(privateToken, search)` 


**描述**：<p>获取某个token名下所有项目</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| privateToken | <code>string</code> | <p>密钥</p> |
| search | <code>string</code> | <p>搜索内容</p> |

**返回**: <code>Array.&lt;object&gt;</code><br>

<p>项目列表</p>

**示例**

```typescript
const projects = await getAllProjects('xxxxx');

console.log(projects)
```
<a name="deleteTGitProject"></a>

## `deleteTGitProject(options)` 


**描述**：<p>删除一个项目</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | <p>输入配置</p> |
| options.id | <code>string</code> | <p>项目id</p> |
| options.privateToken | <code>string</code> | <p>密钥</p> |

**返回**: <code>Promise.&lt;Array.&lt;object&gt;&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
deleteTGitProject({
  id: '123'
  privateToken: 'xxxxx',
}).then((resp) => {

})
```
