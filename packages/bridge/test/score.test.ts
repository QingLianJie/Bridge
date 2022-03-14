import fs from 'fs'
import { describe, expect, test } from 'vitest'
import { score } from '../src/parser/score'

const base = './test/assets/score/score'
const html = fs.readFileSync(`${base}.test.html`, 'utf-8')
const json = JSON.parse(fs.readFileSync(`${base}.result.json`, 'utf-8'))

describe('解析成绩页面', () => {
  test('正常页面', () => expect(score(html)).toMatchObject(json))
  test('空白页面', () => expect(score('')).toMatchObject([]))
})
