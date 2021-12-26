# 贡献代码

我们欢迎任何合理的建议和代码提交。

## 项目结构

项目使用 [pnpm workspaces](https://pnpm.io/zh/workspaces) 管理多个子仓库（Monorepo）。

其中 `fetcher` 和 `transform` 是两个独立的模块，而 `adapter-gm` 依赖前两个模块。

项目使用 TypeScript 编写。
