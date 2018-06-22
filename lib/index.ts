import * as path from 'path'
import {readFileSync} from 'fs'
import {MatcherOptions, Matcher, SelectorMatcherOptions} from 'dom-testing-library/typings/'
import {ElementHandle, EvaluateFn} from 'puppeteer'

const Page = require('puppeteer/lib/Page.js')
const ElementHandle = require('puppeteer/lib/ElementHandle.js')

const domLibraryAsString = readFileSync(
  path.join(__dirname, '../dom-testing-library.js'),
  'utf8',
).replace(/process.env/g, '{}')

const mockFnToExecuteInPage = `
function evaluateInPage(container, fnName, ...args) {
  ${domLibraryAsString}

  const mappedArgs = args.map(item => item.regex ? new RegExp(item.regex) : item)
  return __dom_testing_library__[fnName](container, ...mappedArgs)
}
`

type DOMReturnType = ElementHandle | ElementHandle[] | null

function createDelegateFor(fnName: string): (...args: any[]) => Promise<DOMReturnType> {
  return async function(...args: any[]): Promise<DOMReturnType> {
    if (fnName.includes('All')) throw new Error('*All methods not yet supported')

    // @ts-ignore
    const containerHandle: ElementHandle = this
    // @ts-ignore
    const evaluateFn: EvaluateFn = {toString: () => mockFnToExecuteInPage}

    const mappedArgs = args.map(arg => (arg instanceof RegExp ? {regex: arg.source} : arg))
    const handle = await containerHandle
      .executionContext()
      .evaluateHandle(evaluateFn, containerHandle, fnName, ...mappedArgs)
    const element = handle.asElement()
    if (element) return element
    await handle.dispose()
    return null
  }
}

Page.prototype.getTestingUtilsForDocument = async function(): Promise<ElementHandle> {
  const documentHandle = await this.mainFrame().evaluateHandle('document')
  return await documentHandle.asElement()
}

ElementHandle.prototype.queryByPlaceholderText = createDelegateFor('queryByPlaceholderText')
ElementHandle.prototype.queryAllByPlaceholderText = createDelegateFor('queryAllByPlaceholderText')
ElementHandle.prototype.getByPlaceholderText = createDelegateFor('getByPlaceholderText')
ElementHandle.prototype.getAllByPlaceholderText = createDelegateFor('getAllByPlaceholderText')
ElementHandle.prototype.queryByText = createDelegateFor('queryByText')
ElementHandle.prototype.queryAllByText = createDelegateFor('queryAllByText')
ElementHandle.prototype.getByText = createDelegateFor('getByText')
ElementHandle.prototype.getAllByText = createDelegateFor('getAllByText')
ElementHandle.prototype.queryByLabelText = createDelegateFor('queryByLabelText')
ElementHandle.prototype.queryAllByLabelText = createDelegateFor('queryAllByLabelText')
ElementHandle.prototype.getByLabelText = createDelegateFor('getByLabelText')
ElementHandle.prototype.getAllByLabelText = createDelegateFor('getAllByLabelText')
ElementHandle.prototype.queryByAltText = createDelegateFor('queryByAltText')
ElementHandle.prototype.queryAllByAltText = createDelegateFor('queryAllByAltText')
ElementHandle.prototype.getByAltText = createDelegateFor('getByAltText')
ElementHandle.prototype.getAllByAltText = createDelegateFor('getAllByAltText')
ElementHandle.prototype.queryByTestId = createDelegateFor('queryByTestId')
ElementHandle.prototype.queryAllByTestId = createDelegateFor('queryAllByTestId')
ElementHandle.prototype.getByTestId = createDelegateFor('getByTestId')
ElementHandle.prototype.getAllByTestId = createDelegateFor('getAllByTestId')
ElementHandle.prototype.queryByTitle = createDelegateFor('queryByTitle')
ElementHandle.prototype.queryAllByTitle = createDelegateFor('queryAllByTitle')
ElementHandle.prototype.getByTitle = createDelegateFor('getByTitle')
ElementHandle.prototype.getAllByTitle = createDelegateFor('getAllByTitle')

declare module 'puppeteer' {
  interface Page {
    getTestingUtilsForDocument(): ElementHandle
  }

  interface ElementHandle {
    queryByPlaceholderText(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle | null>
    queryAllByPlaceholderText(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle[]>
    getByPlaceholderText(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle>
    getAllByPlaceholderText(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle[]>
    queryByText(m: Matcher, opts?: SelectorMatcherOptions): Promise<ElementHandle | null>
    queryAllByText(m: Matcher, opts?: SelectorMatcherOptions): Promise<ElementHandle[]>
    getByText(m: Matcher, opts?: SelectorMatcherOptions): Promise<ElementHandle>
    getAllByText(m: Matcher, opts?: SelectorMatcherOptions): Promise<ElementHandle[]>
    queryByLabelText(m: Matcher, opts?: SelectorMatcherOptions): Promise<ElementHandle | null>
    queryAllByLabelText(m: Matcher, opts?: SelectorMatcherOptions): Promise<ElementHandle[]>
    getByLabelText(m: Matcher, opts?: SelectorMatcherOptions): Promise<ElementHandle>
    getAllByLabelText(m: Matcher, opts?: SelectorMatcherOptions): Promise<ElementHandle[]>
    queryByAltText(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle | null>
    queryAllByAltText(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle[]>
    getByAltText(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle>
    getAllByAltText(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle[]>
    queryByTestId(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle | null>
    queryAllByTestId(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle[]>
    getByTestId(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle>
    getAllByTestId(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle[]>
    queryByTitle(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle | null>
    queryAllByTitle(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle[]>
    getByTitle(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle>
    getAllByTitle(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle[]>
  }
}
