import { MonkeyXhrResponse } from '../types'

unsafeWindow.Fetcher = async (options: FetcherOptions) => {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: options.method || 'GET',
      url: options.url,
      responseType: 'text',
      headers: options.headers || {},
      // FormData 字符串形式，例如 username=123456&password=abc&captcha=0000
      data: options.form || '',
      onload: (res: MonkeyXhrResponse) => {
        resolve(res.responseText)
      },
      onerror: (res: MonkeyXhrResponse) => {
        reject({ status: res.status, message: res.statusText })
      },
    })
  })
}
