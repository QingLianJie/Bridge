interface map {
  [index: string]: Array<UserScoreItem>
}

/**
 * 解析成绩数据
 * @param {string} html 成绩页面的 HTML 文件
 * @returns JSON 格式的成绩数据
 */
export const score = (html: string): Array<UserTermScore> => {
  const dom = new DOMParser().parseFromString(html, 'text/html')
  const data = dom.querySelector('#dataList')
  const termMap: map = {}

  if (data == null) return []

  data.querySelectorAll('tr').forEach((tr: HTMLTableRowElement) => {
    const row: Array<string> = []
    tr.querySelectorAll('td').forEach((td: HTMLTableCellElement) => {
      row.push(td.textContent!)
    })
    if (row.length !== 13) return
    let term = row[1]
    let record = {
      name: row[3],
      id: row[2],
      type: row[9],
      nature: row[10],
      test: row[7],
      credit: row[5],
      period: row[6],
      score: row[4],
      category: row[11],
      mark: row[12],
    }
    if (!(term in termMap)) termMap[term] = []
    termMap[term].push(record)
  })

  const result: Array<UserTermScore> = []
  for (let term in termMap) {
    let scores = termMap[term]
    result.push({
      name: term,
      total: scores.length,
      scores: scores,
    })
  }
  return result
}
