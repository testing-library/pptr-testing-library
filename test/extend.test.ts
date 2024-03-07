import * as path from 'path'
import * as puppeteer from 'puppeteer'

describe('lib/extend.ts', () => {
  let browser: puppeteer.Browser
  let page: puppeteer.Page
  let document: puppeteer.ElementHandle

  it('should require without error', async () => {
    await import('../lib/extend')
  })

  it('should launch puppeteer', async () => {
    browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
    page = await browser.newPage()
    await page.goto(`file://${path.join(__dirname, 'fixtures/page.html')}`)
  })

  it('should extend puppeteer ElementHandle', async () => {
    document = await page.getDocument()
    expect(typeof document.queryAllByAltText).toBe('function')
  })

  it('should handle the query* methods', async () => {
    const element = await document.queryByText('Hello h1')
    if (!element) throw Error('Expected element to be defined')
    /* istanbul ignore next */
    expect(await page.evaluate(el => el.textContent, element)).toEqual('Hello h1')
  })

  it('should use the new v3 methods', async () => {
    const element = await document.queryByRole('presentation')
    if (!element) throw Error('Expected element to be defined')
    /* istanbul ignore next */
    expect(await page.evaluate(el => el.textContent, element)).toContain('Layout table')
  })

  it('should handle regex matching', async () => {
    const element = await document.queryByText(/HeLlO h(1|7)/i)
    if (!element) throw Error('Expected element to be defined')
    /* istanbul ignore next */
    expect(await page.evaluate(el => el.textContent, element)).toEqual('Hello h1')
  })

  it('should handle the get* methods', async () => {
    const element = await document.getByTestId('testid-text-input')
    /* istanbul ignore next */
    expect(await page.evaluate(el => el.outerHTML, element)).toMatchSnapshot()
  })

  it('should handle the get* method failures', async () => {
    // Use the scoped element so the pretty HTML snapshot is smaller
    const scope = await document.$('#scoped')

    try {
      await scope!.getByTitle('missing')
      fail()
    } catch (err) {
      const message = (err as any).message
      expect(message).toContain('Unable to find an element with the title: missing')
      const html = message.match(/<div([\s\S]+)div>/)
      expect(html[0]).toMatchSnapshot()
    }
  })

  it('should handle the LabelText methods', async () => {
    const element = await document.getByLabelText('Label A')
    /* istanbul ignore next */
    expect(await page.evaluate(el => el.outerHTML, element)).toMatchSnapshot()
  })

  it('should handle the queryAll* methods', async () => {
    const elements = await document.queryAllByText(/Hello/)
    expect(elements).toHaveLength(3)

    const text = await Promise.all([
      page.evaluate(el => el.textContent, elements[0]),
      page.evaluate(el => el.textContent, elements[1]),
      page.evaluate(el => el.textContent, elements[2]),
    ])

    expect(text).toEqual(['Hello h1', 'Hello h2', 'Hello h3'])
  })

  it('should handle the queryAll* methods with a selector', async () => {
    const elements = await document.queryAllByText(/Hello/, {selector: 'h2'})
    expect(elements).toHaveLength(1)

    const text = await page.evaluate(el => el.textContent, elements[0])

    expect(text).toEqual('Hello h2')
  })

  it('should handle the getBy* methods with a selector', async () => {
    const element = await document.getByText(/Hello/, {selector: 'h2'})

    const text = await page.evaluate(el => el.textContent, element)

    expect(text).toEqual('Hello h2')
  })

  it('should handle the getBy* methods with a regex name', async () => {
    const element = await document.getByRole('button', {name: /getBy.*Test/})

    const text = await page.evaluate(el => el.textContent, element)

    expect(text).toEqual('getByRole Test')
  })

  it('should scope results to element', async () => {
    const scope = await document.$('#scoped')
    const element = await scope!.queryByText(/Hello/)
    /* istanbul ignore next */
    expect(await page.evaluate(el => el.textContent, element)).toEqual('Hello h3')
  })

  it('should get text content', async () => {
    const $h3 = await document.$('#scoped h3')
    expect(await $h3!.getNodeText()).toEqual('Hello h3')
  })

  it('should work with destructuring', async () => {
    const {queryByText} = (await document.$('#scoped'))!.getQueriesForElement()
    expect(await queryByText('Hello h1')).toBeFalsy()
    expect(await queryByText('Hello h3')).toBeTruthy()
  })

  describe('deferred page', () => {
    beforeEach(async () => {
      await page.goto(`file://${path.join(__dirname, 'fixtures/late-page.html')}`)
      document = await page.getDocument()
    })

    it('should handle the findBy* methods', async () => {
      expect(await document.findByText('Loaded!', {}, {timeout: 7000})).toBeTruthy()
    }, 9000)

    it('should handle the findByAll* methods', async () => {
      const elements = await document.findAllByText(/Hello/, {}, {timeout: 7000})
      expect(elements).toHaveLength(2)

      const text = await Promise.all([
        page.evaluate(el => el.textContent, elements[0]),
        page.evaluate(el => el.textContent, elements[1]),
      ])

      expect(text).toEqual(['Hello h1', 'Hello h2'])
    }, 9000)
  })

  afterAll(async () => {
    await browser.close()
  })
})
