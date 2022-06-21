export interface FetcherRequset {
  url: string
  method: 'GET' | 'POST'
  headers?: {
    [key: string]: string
  }
  payload?: {
    [key: string]: string
  }
}

export interface Captcha {
  captcha: string
  token: string
}

export interface CaptchaResponse {
  img: string
  token: string
}

export interface User {
  username: string
  password: string
}

export interface Score {
  name: string // 学期
  scores: ScoreItem[]
}

export interface ScoreItem {
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

export interface Timetable {
  name: string // 学期
  weeks: TimetableWeek[]
}

export interface TimetableWeek {
  name: string // 第几周
  rows: TimetableRow[]
}

export interface TimetableRow {
  name: string // 第几大节
  cols: TimetableCol[]
}

export interface TimetableCol {
  name: string // 星期几
  courses: TimetableCourse[]
}

export interface TimetableCourse {
  name: string
  teacher: string[]
  week: number[]
  location?: string
  section?: number[]
}
