// ==UserScript==
// @name         清廉街 Bridge - UserScript
// @namespace    https://github.com/QingLianJie/Bridge
// @description  用于从学校网站上获取数据的一个插件。
// @version      0.1.0
// @author       QingLianJie
// @copyright    2022 © QingLianJie
// @homepage     https://github.com/QingLianJie/Bridge
// @license      MIT
// @match        https://qinglianjie.cn/*
// @match        https://qing-dev.dist.run/*
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @connect      localhost
// @connect      hrbeu.edu.cn
// @icon         https://qinglianjie.cn/favicon.ico
// ==/UserScript==

// src/index.ts
unsafeWindow.Fetcher = async (options) => {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: options.method || "GET",
      url: options.url,
      responseType: "text",
      headers: options.headers || {},
      data: options.form || void 0,
      onload: (res) => {
        resolve(res.responseText);
      },
      onerror: (res) => {
        reject({ status: res.status, message: res.statusText });
      }
    });
  });
};
