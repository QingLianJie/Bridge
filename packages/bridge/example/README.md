# 借助油猴插件的简单演示

需要先安装油猴插件，且在脚本文件头添加下面这一句。

```js
// ==UserScript==
// ...
// @match http://localhost:3000/*
```

在这个包的根目录下运行 `npm run demo`，打开 http://localhost:3000 即可查看演示。

记得装开发依赖，用于启动演示服务器，命令也是根目录下 `pnpm i`。

## 调试

如果想要查看网络请求，可以去 [chrome://extensions/](chrome://extensions/) 找到 Tampermonkey，

点击「查看视图」后面的链接，在打开的 DevTools 里即可查看。
