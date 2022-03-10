export const 登录 = {
  url: 'https://cas-443.wvpn.hrbeu.edu.cn/cas/login',
  method: 'POST',
  headers: {
    host: 'cas-443.wvpn.hrbeu.edu.cn',
  },
  payload: {
    username: '',
    password: '',
    captcha: '',
    token: '', // 来自验证码
    _eventId: 'submit',
    lt: '', // 来自 `input[name="lt"]`
    source: 'cas',
    execution: 'e1s1',
  },
}

export const 获取验证码 = {
  url: 'https://cas-443.wvpn.hrbeu.edu.cn/sso/apis/v2/open/captcha?captchaSize=4',
  method: 'GET',
  headers: {
    host: 'cas-443.wvpn.hrbeu.edu.cn',
    referer: 'https://cas-443.wvpn.hrbeu.edu.cn/cas/login',
  },
}

export const 学期课表 = {
  url: 'https://edusys.wvpn.hrbeu.edu.cn/jsxsd/xskb/xskb_list.do',
  method: 'POST',
}

export const 成绩列表 = {
  url: 'https://edusys.wvpn.hrbeu.edu.cn/jsxsd/kscj/cjcx_list',
  method: 'POST',
}
