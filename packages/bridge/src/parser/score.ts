/**
 * 解析成绩数据
 * @param {string} html 成绩页面的 HTML 文件
 * @returns JSON 格式的成绩数据
 */
export const score = (html: string) => {
  const dom = new DOMParser().parseFromString(html, 'text/html')
  dom.querySelector('table')

  return []
}
