/** 用于处理跨域问题的 Fetcher，由适配器提供 */
export type Fetcher = (options: FetcherOptions) => Promise<string>

/** Fetcher 的配置项 */
export interface FetcherOptions {
  url: string
  method: 'GET' | 'POST'
  referer?: string
  headers?: { [key: string]: string }
  form?: string
}
