/**
 * 解析成绩数据
 * @param {string} html 成绩页面的 HTML 文件
 * @returns JSON 格式的成绩数据
 */
export const score = (html: string): Score[] => {
  const dom = new DOMParser().parseFromString(html, 'text/html')
  const table = dom.querySelector('#dataList')
  if (table === null) return []

  const terms = new Map<string, ScoreItem[]>()

  table.querySelectorAll('tr').forEach((tr: HTMLTableRowElement) => {
    const row = [...tr.querySelectorAll('td')].map(
      (td: HTMLTableCellElement) => td.innerText
    )

    if (row.length !== 13) return

    const term = row[1]
    const record = {
      id: row[2], // 课程编号
      name: row[3], // 课程名称
      score: isNaN(Number(row[4])) ? row[4] : Number(row[4]), //成绩
      credit: Number(row[5]), // 学分
      period: Number(row[6]), // 总学时
      test: row[7], // 考核方式
      from: row[8], // 考试性质
      type: row[9], // 课程属性
      nature: row[10], // 课程性质
      category: row[11] || undefined, // 通识教育选修课程类别
      mark: row[12] || undefined, // 成绩标记
    }

    terms.set(term, [...(terms.get(term) || []), record])
  })

  return [...terms].map(([name, scores]) => ({ name, scores }))
}
