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

interface Captcha {
  captcha: string
  token: token
}

interface CaptchaResponse {
  img: string
  token: token
}

interface User {
  username: string
  password: string
}

interface Score {
  name: string // 学期
  scores: ScoreItem[]
}

interface ScoreItem {
  name: string
  id: string
  type: string
  nature: string
  test: string
  credit: number
  period: number
  score: string | number
  category?: string
  mark?: string
}

interface Timetable {
  name: string // 学期
  weeks: TimetableWeek[]
}

interface TimetableWeek {
  name: string // 第几周
  rows: TimetableRow[]
}

interface TimetableRow {
  name: string // 第几大节
  cols: TimetableCol[]
}

interface TimetableCol {
  name: string // 星期几
  courses: TimetableCourse[]
}

interface TimetableCourse {
  name: string
  teacher: string[]
  week: number[]
  location?: string
  section?: number[]
}
