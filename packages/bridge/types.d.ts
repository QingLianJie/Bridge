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

/** 成绩 */
interface UserTermScore {
  name: string //学期
  total: number
  scores: UserScoreItem[]
}

interface UserScoreItem {
  name: string
  id: string
  type: string
  category: string
  test: string
  credit: string
  period: string
  score: string
  statistics?: object
}

/** 课表 */
interface CourseWeekItem {
  from: number
  to: number
}

interface TimeTableCourseItem {
  name: string
  teacher: Array<string>
  week: Array<CourseWeekItem>
  section: Array<number>
  location: string
}

interface TimeTableCol {
  name: string
  course: Array<TimeTableCourseItem>
}

interface TimeTableRow {
  name: string
  col: Array<TimeTableCol>
}

interface UserTimeTableItem {
  week: number
  row: Array<TimeTableRow>
  ps: Array<string>
}

interface UserTimeTable {
  name: string //学期
  weeks: Array<UserTimeTableItem>
}
