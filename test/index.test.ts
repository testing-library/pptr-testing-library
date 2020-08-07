import * as path from 'path'
import * as puppeteer from 'puppeteer'
import {getDocument, queries, getQueriesForElement, wait, configure} from '../lib'

describe('lib/index.ts', () => {
  let browser: puppeteer.Browser
  let page: puppeteer.Page

  it('should launch puppeteer', async () => {
    browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
    page = await browser.newPage()
    await page.goto(`file://${path.join(__dirname, 'fixtures/page.html')}`)
  })

  it('should export the utilities', async () => {
    const document = await getDocument(page)
    const element = await queries.getByText(document, 'Hello h1')
    expect(await queries.getNodeText(element)).toEqual('Hello h1')
  })

  it('should support custom data-testid attribute name', async () => {
    configure({testIdAttribute: 'data-id'})
    const document = await getDocument(page)
    const element = await queries.getByTestId(document, 'second-level-header')
    expect(await queries.getNodeText(element)).toEqual('Hello h2')
  })

  it('should support subsequent changing the data-testid attribute names', async () => {
    configure({testIdAttribute: 'data-id'})
    configure({testIdAttribute: 'data-new-id'})
    const document = await getDocument(page)
    const element = await queries.getByTestId(document, 'first-level-header')
    expect(await queries.getNodeText(element)).toEqual('Hello h1')
  })

  it('should keep the default data-testid when input passed is invalid', async () => {
    ;[{}, undefined, null, {testIdAttribute: ''}].forEach(async options => {
      const document = await getDocument(page)
      configure(options as any)
      const element = await queries.getByTestId(document, 'testid-label')
      expect(await queries.getNodeText(element)).toEqual('Label A')
    })
  })

  it('should support regex on raw queries object', async () => {
    const scope = await page.$('#scoped')
    if (!scope) throw new Error('Should have scope')
    const element = await queries.getByText(scope, /Hello/i)
    expect(await queries.getNodeText(element)).toEqual('Hello h3')
  })

  it('should bind getQueriesForElement', async () => {
    const {getByText} = getQueriesForElement(await getDocument(page))
    const element = await getByText('Hello h1')
    expect(await queries.getNodeText(element)).toEqual('Hello h1')
  })

  it('should load the defered page', async () => {
    await page.goto(`file://${path.join(__dirname, 'fixtures/late-page.html')}`)
  })

  it('should use `wait` properly', async () => {
    const {getByText} = getQueriesForElement(await getDocument(page))
    await wait(() => getByText('Loaded!'), {timeout: 7000})
    expect(await getByText('Loaded!')).toBeTruthy()
  }, 9000)

  afterEach(() => {
    configure({testIdAttribute: 'data-testid'}) //cleanup
  })

  afterAll(async () => {
    await browser.close()
  })
})
