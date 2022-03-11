const NUMBER_MAP = {
  0: '一',
  1: '二',
  2: '三',
  3: '四',
  4: '五',
  5: '六',
  6: '日',
}

/**
 * 解析课表数据
 * @param {string} html 课表页面的 HTML 文件
 * @param week 周数
 * @returns JSON 格式的数据
 */
export const timetable = (html: string, week: number) => {
  const dom = new DOMParser().parseFromString(html, 'text/html')
  const form = dom.querySelector('#Form1')

  if (form === null) return
  const result: UserTimeTableItem = { week: week, row: [], ps: [] }
  form.querySelectorAll('tr').forEach(tr => {
    if (tr.querySelectorAll('th').length !== 1) return
    const row: TimeTableRow = {
      name: tr.querySelector('th')!.textContent!.trim(),
      col: [],
    }
    const tds = tr.querySelectorAll('td')
    if (tds.length !== 1) {
      tds.forEach(function (td, index) {
        const ele = td.querySelector('.kbcontent')!
        const grid: Array<Array<string>> = []
        let course: Array<string> = []
        ele.innerHTML
          .replaceAll('<br>', '\n')
          .replaceAll(/<(.*?)>/g, '')
          .replaceAll('&nbsp;', '')
          .split('\n')
          .forEach(function (val) {
            if (val.length) {
              val === '---------------------'
                ? (grid.push(course), (course = []))
                : course.push(val)
            }
          })
        if (course.length) grid.push(course)
        const colItem: TimeTableCol = {
          name: `星期${(NUMBER_MAP as any)[index]}`,
          course: [],
        }
        // Process course
        for (let courseItem of grid) {
          // if (courseItem.length !== 5) continue;
          while (courseItem.length < 5) courseItem.push('')
          console.log(courseItem)
          colItem.course.push({
            name: courseItem[0],
            teacher: courseItem[1].split(','),
            week: (function (raw: string): Array<CourseWeekItem> {
              return raw.split(',').map(value => {
                const t = value.replace('(周)', '').split('-')
                if (t.length === 1)
                  return { from: Number(t[0]), to: Number(t[0]) }
                if (t.length === 2)
                  return { from: Number(t[0]), to: Number(t[1]) }
                return { from: -1, to: -1 }
              })
            })(courseItem[2]),
            section: (function (raw: string): Array<number> {
              const result: Array<number> = []
              raw = raw.replace(/\[|\]|节/g, '')
              for (let i = 0; i < raw.length; i += 2)
                result.push(Number(raw.substring(i, i + 2)))
              return result
            })(courseItem[3]),
            location: courseItem[4],
          })
        }
        row.col.push(colItem)
      })
      result.row.push(row)
    }
    // 表末备注
    else {
      const td = tds[0]
      const ps: Array<string> = []
      td.textContent!.split(';').forEach(val => {
        const content = val.replaceAll(' ', '').replaceAll('\xa0', '')
        if (content.length !== 0) ps.push(content)
      })
      result.ps = result.ps.concat(ps)
    }
  })
  return result
}
