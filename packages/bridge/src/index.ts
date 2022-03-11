import { 学生个人页面, 当前课表, 所有成绩, 登录请求, 获取验证码 } from './const'

/**
 * 获取指定 Input 的值
 * @param {string} name - Input 的 name 属性
 * @param {Document} dom - 哪个文档
 */
const value = (name: string, dom: Document) =>
  dom.querySelector(`input[name="${name}"]`)?.getAttribute('value') || ''

/**
 * 检查是否跳转到了登录页面（也就是是否需要重新登录）
 * @param {string} html - 页面文件
 */
const check = (html: string) =>
  html.includes('<title>哈尔滨工程大学统一身份认证</title>')

/**
 * 将对象转为 FormData 字符串
 * @param {object} data - 待转换的对象
 */
const payload = (data: { [key: string]: string }) =>
  Object.entries(data).reduce(
    (pre, [key, value]) => pre + `${key}=${encodeURIComponent(value)}&`,
    ''
  )

/** 桥接模块，用于获取和解析学校数据 */
export class Bridge {
  private fetcher: Fetcher

  /**
   * 创建实例，传入 fetcher
   * @param fetcher {@link Fetcher}
   */
  constructor(fetcher: Fetcher) {
    this.fetcher = fetcher
  }

  async check() {
    const html = await this.fetcher(学生个人页面.url, {
      method: 学生个人页面.method,
      headers: 学生个人页面.headers,
    })
    if (check(html)) return html
    return '已登录过'
  }

  /**
   * 登录学校网站，需要先获取验证码
   * @param user {@link User} - 用户名和密码
   * @param captcha {@link Captcha} - 验证码结果和 Token
   * @returns 登录结果
   */
  async login(user: User, captcha: Captcha) {
    const html = await this.fetcher(学生个人页面.url, {
      method: 学生个人页面.method,
      headers: 学生个人页面.headers,
    })
    if (!check(html)) return '已登录过'

    const dom = new DOMParser().parseFromString(html, 'text/html')

    const lt = value('lt', dom)
    const execution = value('execution', dom)
    const source = value('source', dom)

    await this.fetcher(登录请求.url, {
      method: 登录请求.method,
      headers: 登录请求.headers,
      form: payload({
        ...登录请求.payload,
        lt,
        execution,
        source,
        ...captcha,
        ...user,
      }),
    }).catch(error => {
      console.error(error)
      throw new Error('登录失败')
    })

    return '登录成功'
  }

  /**
   * 获取验证码
   * @returns 验证码图片和 Token - {@link CaptchaResponse}
   */
  async captcha() {
    return await this.fetcher(获取验证码.url, {
      method: 获取验证码.method,
      headers: { ...获取验证码.headers },
    })
  }

  /**
   * 获取所有成绩，需要登录
   * @returns 所有成绩页面
   */
  async score() {
    const html = await this.fetcher(所有成绩.url, {
      method: 所有成绩.method,
      headers: { ...所有成绩.headers },
      form: payload({ ...所有成绩.payload }),
    }).catch(error => {
      console.error(error)
      throw new Error('获取成绩失败')
    })

    if (check(html)) return '请重新登录'

    // return score(html)
    return html
  }

  /**
   * 获取当前课表，需要登录
   * @returns 当前课表页面
   */
  async timetable() {
    const html = await this.fetcher(当前课表.url, {
      method: 当前课表.method,
      headers: { ...当前课表.headers },
    }).catch(error => {
      console.error(error)
      throw new Error('当前课表失败')
    })

    // return timetable(html)
    return html
  }
}
