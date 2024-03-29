[English](./README.md) | 简体中文

# eslint-config-zain

用来给 `React`、`Typescript` 添加 `Eslint` 规则

## 使用

安装

```bash
# 项目中只需引入这一个依赖包就可以了，不用加 eslint 和 prettier 或者其它配置包
npm i -D eslint-config-zain
```

添加配置文件 `.eslintrc.js`，在 `.eslintignore` 中添加过滤文件和文件夹

```js
module.exports = {
  extends: 'eslint-config-zain',
  rules: {},
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        // 这行根据自己的配置可加可不加
        config: require.resolve('./configs/webpack.config.eslint.ts'),
      },
      typescript: {},
    },
  },
}
```

`package.json` 文件增加脚本和配置

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
  }
}
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

# 将本地包添加到其它联调项目中（这条命令在其它项目中执行）
yalc add eslint-config-zain --dev

# 安装本地包 eslint-config-zain 中的依赖（当前项目更新依赖包后，其它项目中都需要再执行一次）
npm i
```

3. 调试完成后，移除 `~/.yalc` 中的本地包，还原 `package.json` 文件和 `node_modules` 依赖包

```bash
# 移除本地包，还原 package.json 文件
yalc remove eslint-config-zain

# 还原依赖包 `node_modules` 依赖包
npm i
```

4. 本地包热更原理说明

- 使用 `nodemon` 监听指定文件修改，修改后触发 `yalc push` 发布更新本地包

```bash
# nodemon 监视文件更改并执行对应的命令常用参数（可以通过 nodemon -h 查看更多命令）
nodemon
 --ignore node_modules/ # 忽略目录
 --watch ./ # 观察目录
 -C # 只在变更后执行，首次启动不执行命令(当前项目设置为首次启动执行)
 -e js,ts,json,md # 监控指定后缀名的文件
 --debug # 调试
 -x "npm run push" # 自定义命令
```

## 发布依赖包

1. 更新 `package.json` 中的版本号

```json
{
  "version": "1.0.4",
}
```

2. 添加 `npm` 用户（已经添加过就不用添加了）

```bash
# （mac）添加好后会在这个目录记录当前用户的 _authToken： /Users/[当前用户目录]/.npmrc
npm adduser
```

3. 发布

```bash
npm publish
```
