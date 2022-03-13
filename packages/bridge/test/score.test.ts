import fs from 'fs'
import { expect, test } from 'vitest'
import { score } from '../src/parser/score'

const html = fs.readFileSync('./test/assets/score.test.html', 'utf-8')
const json = fs.readFileSync('./test/assets/score.result.json', 'utf-8')

test('解析成绩页面', () => {
  expect(score(html)).toMatchObject(JSON.parse(json))
})
