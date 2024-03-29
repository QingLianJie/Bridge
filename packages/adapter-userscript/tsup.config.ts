import { defineConfig } from 'tsup'
import { version } from './package.json'

export const banner = `// ==UserScript==
// @name         清廉街 Bridge - UserScript
// @namespace    https://github.com/QingLianJie/Bridge
// @description  用于从学校网站上获取数据的一个插件。
// @version      ${version}
// @author       QingLianJie
// @copyright    2022 © QingLianJie
// @homepage     https://github.com/QingLianJie/Bridge
// @license      MIT
// @match        https://qinglianjie.cn/*
// @match        https://dev.qinglianjie.cn/*
// @match        https://internal.qinglianjie.cn/*
// @match        https://qing-dev.dist.run/*
// @match        http://localhost:20080/*
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
  esbuildOptions(options) {
    options.outdir = ''
    options.outfile = './dist/qing-bridge-adapter.user.js'
  },
})
