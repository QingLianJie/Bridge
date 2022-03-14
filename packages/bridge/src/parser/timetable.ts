const weekdays = [
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
  '星期日',
]

// prettier-ignore
const sections = [
  '第一大节', '第一大节',  // 1-2 
  '第二大节', '第二大节', '第二大节', // 3-5
  '第三大节', '第三大节',  // 6-7
  '第四大节', '第四大节', '第四大节', // 8-10
  '第五大节', '第五大节', '第五大节', // 11-13
]

// 大节与小节的映射
const group = [
  [1, 2],
  [3, 4, 5],
  [6, 7],
  [8, 9, 10],
  [11, 12, 13],
]

/**
 * 生成一个数组
 * @param start 从
 * @param end 到
 * @returns 数组
 */
const range = (start: number, end: number = start) =>
  Array(end - start + 1)
    .fill(0)
    .map((_, i) => i + start)

/**
 * 生成一个空白课表
 * @param week 周数
 * @returns 空白课表
 */
const create = (week: number = 1): TimetableWeek[] => {
  return range(1, week).map(i => ({
    name: `第 ${i} 周`,
    rows: range(1, 14).map(j => {
      if (j === 14)
        return { name: '备注', cols: [{ name: '全部', courses: [] }] }

      return {
        name: sections[j - 1],
        cols: range(1, 7).map(k => ({ name: weekdays[k - 1], courses: [] })),
      }
    }),
  }))
}

/**
 * 解析课表数据
 * @param {string} html 课表页面的 HTML 文件
 * @returns JSON 格式的数据
 */
export const timetable = (html: string) => {
  const dom = new DOMParser().parseFromString(html, 'text/html')
  const table = dom.querySelector('#kbtable')
  if (!table) return { name: '无法获取课表', weeks: create() }

  // 获取课表中的最大周数
  let max = Math.max(
    ...(table.textContent?.match(/(\d+\(周\))|(\d+周)/g) || [])
      .map(str => str.replace(/(\(周\))|(周)/g, ''))
      .map(str => Number(str))
  )
  if (max < 1) return { name: '空白课表', weeks: create() }

  // 获取当前学期
  const term = dom
    .querySelector('#xnxq01id option[selected]')
    ?.textContent?.trim()

  // 预先生成表格
  const data: TimetableWeek[] = create(max)

  ;[...table.querySelectorAll('tr')].slice(1).map((tr, m) => {
    const cols = tr.querySelectorAll('td')

    if (cols.length === 1) {
      // 备注部分
      const courses = cols[0].textContent
        ?.replace(/&nbsp;/g, ' ')
        .trim()
        .split(';')

      courses?.map(course => {
        if (course.length === 0) return
        const item = course.split(/\s+/).filter(Boolean)
        const week = item[2]
          .replace('周', '')
          .split('-')
          .map(w => Number(w))

        // 将课程添加到对应的周数
        range(week[0], week[1]).map(i => {
          data[i - 1].rows[13].cols[0].courses.push({
            name: item[0],
            teacher: item[1].split(','),
            week: range(week[0], week[1]),
          })
        })
      })
    } else {
      // 课程部分
      ;[...cols].map((col, n) => {
        const courses = col
          .querySelector('.kbcontent')
          ?.innerHTML?.replace(/&nbsp;/g, ' ')
          .trim()
          .split(/---{3,}/g)
          .map(course =>
            course
              .trim()
              .split(/<br\s*\/?>/g)
              .filter(Boolean)
              .map(w => w.replace(/<\/?font.*?>/g, ''))
          )

        // 一个格子里可能有多个课程
        courses?.map(course => {
          if (course.length === 0) return

          const section = course[3].match(/\d{2}/g)?.map(w => Number(w))
          const week = course[2]
            .replace(/\(双?周\)/g, '')
            .split(',')
            .map(w => w.split('-').map(w => Number(w)))
            .map(w => range(w[0], w[1]))
            .flat()

          week.map(i => {
            section?.map(j => {
              if (group[m].includes(j))
                data[i - 1].rows[j - 1].cols[n].courses.push({
                  name: course[0],
                  teacher: course[1].split(','),
                  week,
                  location: course[4],
                  section,
                })
            })
          })
        })
      })
    }
  })

  return { name: term, weeks: data }
}
