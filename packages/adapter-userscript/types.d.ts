// 类型修改自 https://github.com/the1812/Bilibili-Evolved/blob/master/src/global.d.ts

declare global {
  const unsafeWindow: Window &
    typeof globalThis & {
      Fetcher: Fetcher
      FetcherInfo: {
        name: string
        version: string
      }
    }

  function GM_xmlhttpRequest(details: MonkeyXhrDetails): {
    abort: () => void
  }
}

export {}

export interface MonkeyXhrResponse {
  finalUrl: string
  readyState: number
  status: number
  statusText: string
  responseHeaders: any
  response: any
  responseXML: Document
  responseText: string
}

export interface MonkeyXhrDetails {
  url: string
  method?: 'GET' | 'POST' | 'HEAD'
  headers?: { [name: string]: string }
  data?: string
  binary?: boolean
  timeout?: number
  context?: any
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text'
  overrideMimeType?: string
  anonymous?: boolean
  fetch?: boolean
  username?: string
  password?: string
  onabort?: (response: MonkeyXhrResponse) => void
  onerror?: (response: MonkeyXhrResponse) => void
  onloadstart?: (response: MonkeyXhrResponse) => void
  onprogress?: (response: MonkeyXhrResponse) => void
  onreadystatechange?: (response: MonkeyXhrResponse) => void
  ontimeout?: (response: MonkeyXhrResponse) => void
  onload?: (response: MonkeyXhrResponse) => void
}
