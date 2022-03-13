import fs from 'fs'
import { expect, test } from 'vitest'
import { timetable } from '../src/parser/timetable'

const html = fs.readFileSync('./test/assets/timetable.test.html', 'utf-8')
const json = fs.readFileSync('./test/assets/timetable.result.json', 'utf-8')

test('解析课表页面', () => {
  expect(timetable(html, 1)).toMatchObject(JSON.parse(json))
})
