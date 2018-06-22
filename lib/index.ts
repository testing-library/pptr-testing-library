import './typedefs'
import * as path from 'path'
import {readFileSync} from 'fs'
import {ElementHandle, EvaluateFn} from 'puppeteer'

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

export function createDelegateFor(
  fnName: string,
  context?: () => ElementHandle,
): (...args: any[]) => Promise<DOMReturnType> {
  return async function(...args: any[]): Promise<DOMReturnType> {
    if (fnName.includes('All')) throw new Error('*All methods not yet supported')

    // @ts-ignore
    const containerHandle: ElementHandle = context ? context() : this
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

export async function getTestingUtilsForDocument(): Promise<ElementHandle> {
  // @ts-ignore
  const page: Page = this
  const documentHandle = await page.mainFrame().evaluateHandle('document')
  return await documentHandle.asElement()
}

export function extendObjectWithTestingUtils(object: any): void {
  object.queryByPlaceholderText = createDelegateFor('queryByPlaceholderText')
  object.queryAllByPlaceholderText = createDelegateFor('queryAllByPlaceholderText')
  object.getByPlaceholderText = createDelegateFor('getByPlaceholderText')
  object.getAllByPlaceholderText = createDelegateFor('getAllByPlaceholderText')
  object.queryByText = createDelegateFor('queryByText')
  object.queryAllByText = createDelegateFor('queryAllByText')
  object.getByText = createDelegateFor('getByText')
  object.getAllByText = createDelegateFor('getAllByText')
  object.queryByLabelText = createDelegateFor('queryByLabelText')
  object.queryAllByLabelText = createDelegateFor('queryAllByLabelText')
  object.getByLabelText = createDelegateFor('getByLabelText')
  object.getAllByLabelText = createDelegateFor('getAllByLabelText')
  object.queryByAltText = createDelegateFor('queryByAltText')
  object.queryAllByAltText = createDelegateFor('queryAllByAltText')
  object.getByAltText = createDelegateFor('getByAltText')
  object.getAllByAltText = createDelegateFor('getAllByAltText')
  object.queryByTestId = createDelegateFor('queryByTestId')
  object.queryAllByTestId = createDelegateFor('queryAllByTestId')
  object.getByTestId = createDelegateFor('getByTestId')
  object.getAllByTestId = createDelegateFor('getAllByTestId')
  object.queryByTitle = createDelegateFor('queryByTitle')
  object.queryAllByTitle = createDelegateFor('queryAllByTitle')
  object.getByTitle = createDelegateFor('getByTitle')
  object.getAllByTitle = createDelegateFor('getAllByTitle')
}
