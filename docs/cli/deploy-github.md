## deploy-github

部署文件到 Github Page，参数可从命令中传递，也可以从环境变量文件`.env.local`中传递。

### 使用

`deploy:github`命令：

```bash
t-comm deploy:github  --repo press-ui \
--user lee \
--email xx@qq.com \
--dir dist/h5 \
--token xxx \
--branch docs \
--message "docs: build docs"
```


### 参数

| 参数            | 环境变量名                          | 说明                    | 默认值             |
| --------------- | ----------------------------------- | ----------------------- | ------------------ |
| --repo          | DEPLOY_GITHUB_PAGE_REPO_NAME        | 仓库名称                | -                  |
| --user          | DEPLOY_GITHUB_PAGE_USER_NAME        | 用户名                  | -                  |
| --email         | DEPLOY_GITHUB_PAGE_EMAIL            | 用户邮箱                | -                  |
| --dir           | DEPLOY_GITHUB_PAGE_TARGET_DIR       | 要发布的文件夹          | -                  |
| --token         | DEPLOY_GITHUB_PAGE_TOKEN            | 发布密钥                | -                  |
| --branch        | DEPLOY_GITHUB_PAGE_BRANCH           | 发布分支                | `docs`             |
| --message       | DEPLOY_GITHUB_PAGE_COMMIT_MESSAGE   | 提交信息                | `docs: build docs` |
| --increment     | DEPLOY_GITHUB_PAGE_COMMIT_INCREMENT | 是否增量提交，`1`为增量 | -                  |
| --playgroundDir | DEPLOY_GITHUB_PAGE_PLAYGROUND_DIR   | 增量提交时总目录        | -                  |
| --targetDirName | DEPLOY_GITHUB_PAGE_TARGE_DIR_NAME   | 增加提交目标目录        | -                  |
