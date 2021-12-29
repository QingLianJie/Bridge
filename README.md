# 清廉街 Bridge

![GitHub](https://img.shields.io/github/license/QingLianJie/Bridge)

用于从学校网站上获取并转换数据。

## 项目组件

### 通用

| 组件                                          | 描述                                                | 链接                                                                                                                                                                         |
| --------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`captcha-hacker`](./packages/captcha-hacker) | 用于浏览器或 Node.js 识别验证码，借助 TensorFlow.js | [![npm (scoped)](https://img.shields.io/npm/v/@lifeni/qing-captcha-hacker?label=%40lifeni%2Fqing-captcha-hacker)](https://www.npmjs.com/package/@lifeni/qing-captcha-hacker) |
| [`fetcher`](./packages/fetcher)               | 用于向学校网站发送请求和获取数据                    | [![npm (scoped)](https://img.shields.io/npm/v/@lifeni/qing-fetcher?label=%40lifeni%2Fqing-fetcher)](https://www.npmjs.com/package/@lifeni/qing-fetcher)                      |
| [`transformer`](./packages/transformer)       | 用于解析和转换学校网站返回的 HTML 中的数据          | [![npm (scoped)](https://img.shields.io/npm/v/@lifeni/qing-transformer?label=%40lifeni%2Fqing-transformer)](https://www.npmjs.com/package/@lifeni/qing-transformer)          |

### 平台

| 组件                                  | 描述                                 | 链接                                                                                                                                                                                      |
| ------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`adapter-gm`](./packages/adapter-gm) | 借助 Greasemonkey 实现数据请求与获取 | ![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/QingLianJie/Bridge?filename=packages%2Fadapter-gm%2Fpackage.json&label=Greasy%20Fork) |

## 协议相关

[MIT License](./LICENSE) © 2021 清廉街
