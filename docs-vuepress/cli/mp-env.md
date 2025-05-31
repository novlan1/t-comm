## mp-env

小程序CI前置操作，保存环境变量、密钥信息到本地。

### 使用

`mp-env`命令：

```bash
t-comm mp-env -b release \
-e test \
-a rainbowAppId \
-k rainbowConfigKey \
--envName rainbowEnvName \
-g rainbowGroupName
```


### 参数

| 简称 | 参数        | 说明                | 默认值          |
| ---- | ----------- | ------------------- | --------------- |
| -b   | --branch    | 分支                | -               |
| -e   | --env       | 发布环境            | `test`          |
| -r   | --root      | 项目根路径          | `process.cwd()` |
| -a   | --appid     | 配置中心`AppId`     | -               |
| -k   | --configKey | 配置中心`Key`       | -               |
| -    | --envName   | 配置中心`EnvName`   | `Default`       |
| -g   | --groupName | 配置中心`GroupName` | -               |



