import fs from 'fs'
import { expect, test, describe } from 'vitest'
import { timetable } from '../src/parser/timetable'

const base = './test/assets/timetable/timetable'
const html = fs.readFileSync(`${base}.test.html`, 'utf-8')
const json = {
  test: JSON.parse(fs.readFileSync(`${base}.result.json`, 'utf-8')),
  null: JSON.parse(fs.readFileSync(`${base}.null.json`, 'utf-8')),
  undefined: JSON.parse(fs.readFileSync(`${base}.undefined.json`, 'utf-8')),
}

describe('解析课表页面', () => {
  test('正常页面', () => expect(timetable(html)).toMatchObject(json.test))
  test('空白页面', () => expect(timetable('')).toMatchObject(json.undefined))
  test('空白课表', () => {
    const html = `<table id="kbtable"></table>`
    expect(timetable(html)).toMatchObject(json.null)
  })
})
