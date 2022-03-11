import { MonkeyXhrResponse } from '../types'

unsafeWindow.Fetcher = async (url: string, options?: FetcherOptions) => {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: options?.method || 'GET',
      url: url,
      responseType: 'text',
      headers: options?.headers || {},
      data: options?.form || '',
      onload: (res: MonkeyXhrResponse) => {
        resolve(res.responseText)
      },
      onerror: (res: MonkeyXhrResponse) => {
        reject({ status: res.status, message: res.statusText })
      },
    })
  })
}
