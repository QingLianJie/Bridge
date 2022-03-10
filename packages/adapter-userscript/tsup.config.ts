import { defineConfig } from 'tsup'

export const banner = `// ==UserScript==
// @name         清廉街 Bridge - UserScript
// @description  用于从学校网站上获取并转换数据的一个插件。
// @version      0.1.0
// @author       QingLianJie
// @copyright    2022 © QingLianJie
// @homepage     https://github.com/QingLianJie/Bridge
// @license      MIT
// @match        https://qinglianjie.cn/*
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @connect      localhost
// @connect      hrbeu.edu.cn
// @icon         https://qinglianjie.cn/favicon.ico
// ==/UserScript==
`

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  clean: true,
  banner: { js: banner },
})
