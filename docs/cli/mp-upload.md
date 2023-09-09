## mp-upload

小程序CI上传、预览。

### 使用

`mp-upload`命令：

```bash
t-comm mp-upload -b release \
-e test \
-a rainbowAppId \
-k rainbowConfigKey \
--envName rainbowEnvName \
-g rainbowGroupName \
--rdHost rdHost \
--bkStartType bkStartType \
--bkBuildUrl  bkBuildUrl \
--bkStartUserName bkStartUserName \
--bkPipelineId bkPipelineId \
--commitAuthor commitAuthor \
--commitMessage commitMessage \
--commitHash commitHash \
--mpVersion 1.0.0
```


### 参数

| 简称 | 参数              | 说明                | 默认值          |
| ---- | ----------------- | ------------------- | --------------- |
| -b   | --branch          | 分支                | -               |
| -e   | --env             | 发布环境            | `test`          |
| -r   | --root            | 项目根路径          | `process.cwd()` |
| -a   | --appid           | 配置中心`AppId`     | -               |
| -k   | --configKey       | 配置中心`Key`       | -               |
| -    | --envName         | 配置中心`EnvName`   | `Default`       |
| -g   | --groupName       | 配置中心`GroupName` | -               |
| -    | --rdHost          | 研发平台`Host`      | -               |
| -    | --bkStartType     | 构建启动方式        | -               |
| -    | --bkBuildUrl      | 构建地址            | -               |
| -    | --bkStartUserName | 构建启动人          | -               |
| -    | --bkPipelineId    | 构建流水线`Id`      | -               |
| -    | --commitAuthor    | 最后提交作者        | -               |
| -    | --commitMessage   | 最后提交描述        | -               |
| -    | --commitHash      | 最后提交`Hash`      | -               |
| -    | --mpVersion       | 小程序版本          | -               |



