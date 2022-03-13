/** 用于处理跨域问题的 fetcher，由适配器提供 */
type Fetcher = (options: FetcherOptions) => Promise<string>

/** fetcher 的配置项 */
interface FetcherOptions {
  url: string
  method: 'GET' | 'POST'
  referer?: string
  headers?: { [key: string]: string }
  form?: string
}
