import * as path from 'path'
import * as puppeteer from 'puppeteer'
import {getDocument, utils} from '../lib'

describe('lib/index.ts', () => {
  let browser: puppeteer.Browser
  let page: puppeteer.Page

  it('should launch puppeteer', async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
    await page.goto(`file://${path.join(__dirname, 'fixtures/page.html')}`)
  })

  it('should export the utilities', async () => {
    const document = await getDocument(page)
    const element = await utils.getByText(document, 'Hello h1')
    expect(await page.evaluate(el => el.textContent, element)).toEqual('Hello h1')
  })

  afterAll(async () => {
    await browser.close()
  })
})
