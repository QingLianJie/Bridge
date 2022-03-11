interface FetcherRequset {
  url: string
  method: 'GET' | 'POST'
  headers?: {
    [key: string]: string
  }
  payload?: {
    [key: string]: string
  }
}

type Captcha = {
  captcha: string
  token: token
}

type CaptchaResponse = {
  img: string
  token: token
}

type User = {
  username: string
  password: string
}
