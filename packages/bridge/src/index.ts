import type { Fetcher } from '../../../types'
import type { User, Captcha, CaptchaResponse } from '../types'
import {
  学生个人中心,
  当前课表,
  所有成绩,
  查询课表,
  登录,
  登录页面,
  获取验证码,
  退出登录,
} from './const'
import { score } from './parser/score'
import { timetable } from './parser/timetable'

/**
 * 获取指定 Input 的值
 * @param {string} name - Input 的 name 属性
 * @param {Document} dom - 哪个文档
 */
const getInputValue = (name: string, dom: Document) =>
  (dom.querySelector(`input[name="${name}"]`) as HTMLInputElement)?.value || ''

/**
 * 将对象转为 FormData 字符串
 * @param {object} data - 待转换的对象
 */
const convertPayload = (data: { [key: string]: string }) =>
  Object.entries(data)
    .reduce(
      (pre, [key, value]) => pre + `${key}=${encodeURIComponent(value)}&`,
      ''
    )
    .slice(0, -1) // 移除最后多的一个 &

/**
 * 桥接模块，用于获取和解析学校数据
 * @see {@link https://github.com/QingLianJie/Bridge QingLianJie/Bridge}
 */
export class Bridge {
  private fetcher: Fetcher

  /** 登录页面上的一些参数，意义不明 */
  private loginPayload = {}

  /**
   * 创建实例，传入 fetcher
   * @param fetcher {@link Fetcher}
   */
  constructor(fetcher: Fetcher) {
    this.fetcher = fetcher
    console.debug(`已获取 Fetcher`)
    console.debug(fetcher)
  }

  /**
   * 检查是否跳转到登录页面
   * @param {string} html - 要检查的 HTML
   * @param {string} text - 判断依据，需要包含的文本（标题）
   * @returns 无返回值
   */
  private async checkLogin(html: string, text: string) {
    if (!html.includes(`<title>${text}</title>`)) {
      // 登录失效后，会跳转到两种不同的登录页面
      // 只有登录页面标题为「哈尔滨工程大学统一身份认证」时
      // 才是正确的登录页面，否则要重新进入这个登录页面
      console.debug(`不符合条件，需要重新登录`, text)
      if (html.includes(`<title>哈尔滨工程大学统一身份认证</title>`)) {
        await this.setLoginPayload(html)
        console.debug(`检测到登录页面，已设置 Payload`)
      }
      throw new Error(`需要重新登录`)
    }
    console.debug(`符合条件，无需重新登录`, text)
  }

  /**
   * 从登录页面上获取登录需要的参数
   * @param {string} html 传入登录页面的 HTML
   * @returns 无返回值
   */
  private async setLoginPayload(html: string) {
    const dom = new DOMParser().parseFromString(html, 'text/html')
    console.debug(`设置登录 Payload`)
    this.loginPayload = {
      lt: getInputValue('lt', dom),
      execution: getInputValue('execution', dom),
      source: getInputValue('source', dom),
    }
  }

  /**
   * 登录学校网站
   * @param user {@link User} - 用户名和密码
   * @param captcha {@link Captcha} - 验证码结果和 Token
   * @returns 无返回值
   */
  async login(user: User, captcha: Captcha) {
    // 如果没有获取登录所需的参数
    // 就先加载一次登录页面来获取参数
    if (Object.keys(this.loginPayload).length === 0) {
      console.debug(`没有检测到登录 Payload，需要加载登录页面`)
      const html = await this.fetcher({ ...登录页面 })
      await this.setLoginPayload(html)
    }

    await this.fetcher({
      ...登录,
      form: convertPayload({
        ...登录.payload,
        ...captcha,
        ...user,
        ...this.loginPayload,
      }),
    }).catch(error => {
      console.error(error)
      throw new Error(`登录失败`)
    })

    console.debug(`登录完成，清除无用 Payload`)
    this.loginPayload = {}
  }

  /**
   * 退出登录学校网站
   * @returns 无返回值
   */
  async logout() {
    await this.fetcher({
      ...退出登录,
    }).catch(error => {
      console.error(error)
      throw new Error(`退出登录失败`)
    })
    console.debug(`退出登录完成`)
  }

  /**
   * 获取验证码
   * @returns 验证码图片和 Token - {@link CaptchaResponse}
   */
  async captcha(): Promise<CaptchaResponse> {
    const captcha = await this.fetcher({ ...获取验证码 })
      .then(res => JSON.parse(res))
      .catch(error => {
        console.error(error)
        throw new Error(`获取验证码失败`)
      })
    console.debug(`获取验证码完成`, captcha)
    return captcha
  }

  /**
   * 获取学生个人页面，需要登录
   * @returns 学生个人页面
   */
  async home() {
    const html = await this.fetcher({
      ...学生个人中心,
    }).catch(error => {
      console.error(error)
      throw new Error(`获取学生个人中心失败`)
    })

    console.debug(`获取学生个人中心完成`)
    await this.checkLogin(html, `学生个人中心`)
    return html
  }

  /**
   * 获取所有成绩，需要登录
   * @returns 所有成绩页面
   */
  async score() {
    const html = await this.fetcher({
      ...所有成绩,
      form: convertPayload({ ...所有成绩.payload }),
    }).catch(error => {
      console.error(error)
      throw new Error(`获取所有成绩失败`)
    })

    console.debug(`获取所有成绩完成`)
    await this.checkLogin(html, `学生个人考试成绩`)
    return score(html)
  }

  /**
   * 获取课表，需要登录
   * @param {string} term 课表学期，默认为最新
   * @returns 当前课表页面
   */
  async timetable(term?: string) {
    if (term) {
      const html = await this.fetcher({
        ...查询课表,
        form: convertPayload({
          ...查询课表.payload,
          xnxq01id: term,
        }),
      }).catch(error => {
        console.error(error)
        throw new Error(`获取 ${term} 课表失败`)
      })

      console.debug(`获取 ${term} 课表完成`)
      await this.checkLogin(html, `学期理论课表`)
      return timetable(html)
    }

    const html = await this.fetcher({
      ...当前课表,
    }).catch(error => {
      console.error(error)
      throw new Error(`获取当前课表失败`)
    })

    console.debug(`获取当前课表完成`)
    await this.checkLogin(html, `学期理论课表`)
    return timetable(html)
  }
}
