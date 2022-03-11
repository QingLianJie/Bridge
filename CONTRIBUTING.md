# 贡献代码

我们欢迎任何合理的建议和代码提交，贡献代码之前可以先看看这个。

## 项目结构

项目分为两个部分，桥接模块和适配器。

其中桥接模块负责获取并解析学校网站上的数据，将其转换成 JSON 及其他机器友好格式；

适配器用于处理不同平台上的跨域请求，并提供统一的 Fetcher 供桥接模块调用。

| 包名                                                 | 作用                                                                     |
| ---------------------------------------------------- | ------------------------------------------------------------------------ |
| [`adapter-userscript`](packages/adapter-userscript/) | [Tampermonkey](https://www.tampermonkey.net/) 平台的适配器，俗称油猴脚本 |
| [`bridge`](packages/bridge/)                         | 桥接模块，获取数据并解析，需要通过模块的方式进行调用                     |

## 技术相关

项目使用 [pnpm](https://pnpm.io/zh) 作为包管理器，用 [pnpm workspaces](https://pnpm.io/zh/workspaces) 管理多个子仓库（Monorepo）。

```shell
# 安装 pnpm
npm i -g pnpm

# 在项目根目录安装依赖
pnpm i
```

项目主要使用 TypeScript 编写，使用 [tsup](https://github.com/egoist/tsup) 作为打包工具。
