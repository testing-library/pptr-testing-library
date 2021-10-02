import * as path from 'path'
import * as playwright from 'playwright'
import {getDocument, queries, getQueriesForElement, waitFor, configure} from '../../lib'

describe('lib/index.ts', () => {
  let browser: playwright.Browser
  let page: playwright.Page

  beforeAll(async () => {
    browser = await playwright.chromium.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
    page = await browser.newPage()
    await page.goto(`file://${path.join(__dirname, '../fixtures/page.html')}`)
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

  it.each([{}, undefined, null, {testIdAttribute: ''}])(
    'should keep the default data-testid when input passed is invalid',
    async options => {
      const document = await getDocument(page)
      configure(options as any)
      const element = await queries.getByTestId(document, 'testid-label')
      expect(await queries.getNodeText(element)).toEqual('Label A')
    },
  )

  it('should support regex on raw queries object', async () => {
    const scope = await page.$('#scoped')
    if (!scope) throw new Error('Should have scope')
    const element = await queries.getByText(scope, /Hello/i)
    expect(await queries.getNodeText(element)).toEqual('Hello h3')
  })

  it('should bind getQueriesForElement', async () => {
    // FIXME: I think it will take some work to get the types in a
    // place to prevent @typescript-eslint from flagging this
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const {getByText} = getQueriesForElement(await getDocument(page))
    const element = await getByText('Hello h1')
    expect(await queries.getNodeText(element)).toEqual('Hello h1')
  })

  describe('loading the deferred page', () => {
    beforeEach(async () =>
      page.goto(`file://${path.join(__dirname, '../fixtures/late-page.html')}`),
    )

    it('should use `wait` properly', async () => {
      // FIXME: I think it will take some work to get the types in a
      // place to prevent @typescript-eslint from flagging this
      // eslint-disable-next-line @typescript-eslint/unbound-method
      const {getByText} = getQueriesForElement(await getDocument(page))
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      await waitFor(async () => expect(await getByText('Loaded!')).toBeTruthy(), {timeout: 7000})
      expect(await getByText('Loaded!')).toBeTruthy()
    }, 9000)
  })

  afterEach(() => {
    configure({testIdAttribute: 'data-testid'}) // cleanup
  })

  afterAll(async () => {
    await browser.close()
  })
})
