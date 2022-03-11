enum Method {
  GET = 'GET',
  POST = 'POST',
}

export const 学生个人页面 = {
  url: 'https://edusys.wvpn.hrbeu.edu.cn/jsxsd/framework/xsMain.jsp',
  method: Method.GET,
  headers: {
    // 参考 https://web.dev/i18n/zh/fetch-metadata/
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  },
}

export const 登录请求 = {
  url: 'https://cas-443.wvpn.hrbeu.edu.cn/cas/login',
  method: Method.POST,
  headers: {
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    origin: 'https://cas-443.wvpn.hrbeu.edu.cn',
    referer:
      'https://cas-443.wvpn.hrbeu.edu.cn/cas/login?service=https://edusys.wvpn.hrbeu.edu.cn/jsxsd/framework/xsMain.jsp',
    'content-type': 'application/x-www-form-urlencoded',
    accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
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

export const 获取验证码 = {
  url: 'https://cas-443.wvpn.hrbeu.edu.cn/sso/apis/v2/open/captcha?captchaSize=4',
  method: Method.GET,
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
  method: Method.GET,
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
  method: Method.POST,
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
  method: Method.POST,
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
