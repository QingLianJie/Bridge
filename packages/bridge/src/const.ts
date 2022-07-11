export enum FetchMethod {
  GET = 'GET',
  POST = 'POST',
}

export const 学生个人中心 = {
  url: 'https://edusys.wvpn.hrbeu.edu.cn/jsxsd/framework/xsMain.jsp',
  method: FetchMethod.GET,
  headers: {
    // 参考 https://web.dev/i18n/zh/fetch-metadata/
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  },
}

export const 登录 = {
  url: 'https://cas-443.wvpn.hrbeu.edu.cn/cas/login',
  method: FetchMethod.POST,
  headers: {
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-User': '?1',
    origin: '',
    referer:
      'https://cas-443.wvpn.hrbeu.edu.cn/cas/login?service=http://edusys.hrbeu.edu.cn/jsxsd/caslogin.jsp',
    // referer:
    //   'https://cas-443.wvpn.hrbeu.edu.cn/cas/login?service=https://edusys.wvpn.hrbeu.edu.cn/jsxsd/framework/xsMain.jsp',
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Upgrade-Insecure-Requests': '1',
    'Cache-Control': 'max-age=0',
  },
  payload: {
    username: '',
    password: '',
    captcha: '',
    token: '', // 来自验证码
    _eventId: 'submit',
    lt: '', // 来自 `input[name="lt"]`
    source: '', // 来自 `input[name="source"]`
    execution: '', // 来自 `input[name="execution"]`
  },
}

export const 登录页面 = {
  url: 'https://cas-443.wvpn.hrbeu.edu.cn/cas/login?service=http://edusys.hrbeu.edu.cn/jsxsd/caslogin.jsp',
  method: FetchMethod.GET,
  headers: {
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-site',
    'Sec-Fetch-User': '?1',
    Referer: 'https://edusys.wvpn.hrbeu.edu.cn/',
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Upgrade-Insecure-Requests': '1',
    'Cache-Control': 'max-age=0',
  },
}

export const 退出登录 = {
  url: 'https://cas-443.wvpn.hrbeu.edu.cn/cas/logout?service=https://edusys.wvpn.hrbeu.edu.cn/jsxsd/caslogin.jsp',
  method: FetchMethod.GET,
  headers: {
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    referer: 'https://edusys.wvpn.hrbeu.edu.cn/',
    accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  },
}

export const 获取验证码 = {
  url: 'https://cas-443.wvpn.hrbeu.edu.cn/sso/apis/v2/open/captcha?captchaSize=4',
  method: FetchMethod.GET,
  headers: {
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    referer:
      'https://cas-443.wvpn.hrbeu.edu.cn/cas/login?service=https://edusys.wvpn.hrbeu.edu.cn/jsxsd/framework/xsMain.jsp',
    accept: 'application/json, text/plain, */*',
  },
}

export const 当前课表 = {
  url: 'https://edusys.wvpn.hrbeu.edu.cn/jsxsd/xskb/xskb_list.do',
  method: FetchMethod.GET,
  headers: {
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    origin: 'https://edusys.wvpn.hrbeu.edu.cn',
    referer: 'https://edusys.wvpn.hrbeu.edu.cn/jsxsd/framework/main.jsp',
    accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  },
}

export const 查询课表 = {
  url: 'https://edusys.wvpn.hrbeu.edu.cn/jsxsd/xskb/xskb_list.do',
  method: FetchMethod.POST,
  headers: {
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    origin: 'https://edusys.wvpn.hrbeu.edu.cn',
    referer: 'https://edusys.wvpn.hrbeu.edu.cn/jsxsd/xskb/xskb_list.do',
    'content-type': 'application/x-www-form-urlencoded',
    accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  },
  payload: {
    xnxq01id: '', // 学年学期，例如 2022-2023-1，来自 `select[name="xnxq01id"]`
    zc: '', // 周次，留空为全部，或者是数字，来自 `input[name="zc"]`
    sfFD: '1', // 是否放大（显示更多信息），来自 `input[name="sfFD"]`
    cj0701id: '', // 未知字段，来自 `input[name="cj0701id"]`
    demo: '', // 未知字段，来自 `input[name="demo"]`
    // 除此以外还有类似 jx0415zbdiv_1 格式的字段，是课表每个格子里面的 `input[name="jx0415zbdiv_1"]`，意义不明
  },
}

export const 所有成绩 = {
  url: 'https://edusys.wvpn.hrbeu.edu.cn/jsxsd/kscj/cjcx_list',
  method: FetchMethod.POST,
  headers: {
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    origin: 'https://edusys.wvpn.hrbeu.edu.cn',
    referer: 'https://edusys.wvpn.hrbeu.edu.cn/jsxsd/kscj/cjcx_query.do',
    'content-type': 'application/x-www-form-urlencoded',
    accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  },
  payload: {
    kksj: '', // 开课时间，例如 2020-2021-1
    kcxz: '', // 课程性质，为数字编号
    kcmc: '', // 课程名称
    xsfs: 'all', // 显示方式，all 或 max
  },
}
