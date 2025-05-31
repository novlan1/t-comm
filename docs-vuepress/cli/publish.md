## 发布

发布本地文件或文件夹到远程机器。

### 使用

`publish`命令：

```bash
t-comm publish  -s README.md \
-t /root/ft_local \
-n xx.xx.xx.xx \
-p password \
-o 36000
```


### 参数

| 简称 | 参数       | 说明                   | 默认值 |
| ---- | ---------- | ---------------------- | ------ |
| -s   | --source   | 要发布的源文件或文件夹 | -      |
| -t   | --target   | 服务器目标位置         | -      |
| -n   | --name     | 服务器IP地址，或别名   | -      |
| -p   | --password | 服务器密码             | -      |
| -o   | --port     | 服务器端口             | 36000  |
