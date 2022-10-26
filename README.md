# eslint-config-zain

## 使用

```bash
# 项目中只需引入这一个依赖包就可以了，不用加 eslint 和 prettier 或者其它配置包
npm i -D eslint-config-zain
```

## 开发调试

1. 将包发布到  `~/.yalc` 中并监听文件修改

```
npm run start
```

2. 其它项目中使用 `~/.yalc` 中的本地包调试

```bash
# 全局安装 yalc
npm i yalc -g

# 将本地包添加到其它联调项目中
yalc add eslint-config-zain --dev

# 安装本地包 eslint-config-zain 中的依赖（当前项目更新依赖包后，其它项目中都需要再执行一次）
npm i
```

3. 本地包热更原理说明

- 使用 `nodemon` 监听指定文件修改，修改后触发 `yalc push` 发布更新本地包

```bash
# nodemon 监视文件更改并执行对应的命令常用参数（可以通过 nodemon -h 查看更多命令）
nodemon
 --ignore node_modules/ # 忽略目录
 --watch ./ # 观察目录
 -C # 只在变更后执行，首次启动不执行命令(当前项目设置为首次启动执行)
 -e js,json,md # 监控指定后缀名的文件
 --debug # 调试
 -x "npm run push" # 自定义命令
```