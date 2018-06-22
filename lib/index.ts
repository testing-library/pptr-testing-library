import {readFileSync} from 'fs'
import * as path from 'path'
import {ElementHandle, EvaluateFn, Page} from 'puppeteer'
import {ITestUtils} from './typedefs'

const domLibraryAsString = readFileSync(
  path.join(__dirname, '../dom-testing-library.js'),
  'utf8',
).replace(/process.env/g, '{}')

function mapArgument(argument: any): any {
  return typeof argument === 'object' && argument.regex ? new RegExp(argument.regex) : argument
}

const mockFnToExecuteInPage = `
function evaluateInPage(container, fnName, ...args) {
  ${domLibraryAsString}

  const mappedArgs = args.map(${mapArgument.toString()})
  return __dom_testing_library__[fnName](container, ...mappedArgs)
}
`

type DOMReturnType = ElementHandle | ElementHandle[] | null

type ContextFn = (...args: any[]) => ElementHandle

function createDelegateFor(
  fnName: keyof ITestUtils,
  contextFn?: ContextFn,
): (...args: any[]) => Promise<DOMReturnType> {
  return async function(...args: any[]): Promise<DOMReturnType> {
    if (fnName.includes('All')) throw new Error('*All methods not yet supported')

    // @ts-ignore
    const containerHandle: ElementHandle = contextFn ? contextFn(...args) : this
    // @ts-ignore
    const evaluateFn: EvaluateFn = {toString: () => mockFnToExecuteInPage}

    let argsToForward = args.map(arg => (arg instanceof RegExp ? {regex: arg.source} : arg))
    if (containerHandle === args[0]) {
      argsToForward = args.slice(1)
    }

    const handle = await containerHandle
      .executionContext()
      .evaluateHandle(evaluateFn, containerHandle, fnName, ...argsToForward)
    const element = handle.asElement()
    if (element) return element
    await handle.dispose()
    return null // tslint:disable-line
  }
}

export async function getDocument(context?: Page): Promise<ElementHandle> {
  // @ts-ignore
  const page: Page = context || this
  const documentHandle = await page.mainFrame().evaluateHandle('document')
  const document = documentHandle.asElement()
  if (!document) throw new Error('Could not find document')
  return document
}

export function extendObjectWithTestingUtils(object: any, contextFn?: ContextFn): void {
  object.queryByPlaceholderText = createDelegateFor('queryByPlaceholderText', contextFn)
  object.queryAllByPlaceholderText = createDelegateFor('queryAllByPlaceholderText', contextFn)
  object.getByPlaceholderText = createDelegateFor('getByPlaceholderText', contextFn)
  object.getAllByPlaceholderText = createDelegateFor('getAllByPlaceholderText', contextFn)
  object.queryByText = createDelegateFor('queryByText', contextFn)
  object.queryAllByText = createDelegateFor('queryAllByText', contextFn)
  object.getByText = createDelegateFor('getByText', contextFn)
  object.getAllByText = createDelegateFor('getAllByText', contextFn)
  object.queryByLabelText = createDelegateFor('queryByLabelText', contextFn)
  object.queryAllByLabelText = createDelegateFor('queryAllByLabelText', contextFn)
  object.getByLabelText = createDelegateFor('getByLabelText', contextFn)
  object.getAllByLabelText = createDelegateFor('getAllByLabelText', contextFn)
  object.queryByAltText = createDelegateFor('queryByAltText', contextFn)
  object.queryAllByAltText = createDelegateFor('queryAllByAltText', contextFn)
  object.getByAltText = createDelegateFor('getByAltText', contextFn)
  object.getAllByAltText = createDelegateFor('getAllByAltText', contextFn)
  object.queryByTestId = createDelegateFor('queryByTestId', contextFn)
  object.queryAllByTestId = createDelegateFor('queryAllByTestId', contextFn)
  object.getByTestId = createDelegateFor('getByTestId', contextFn)
  object.getAllByTestId = createDelegateFor('getAllByTestId', contextFn)
  object.queryByTitle = createDelegateFor('queryByTitle', contextFn)
  object.queryAllByTitle = createDelegateFor('queryAllByTitle', contextFn)
  object.getByTitle = createDelegateFor('getByTitle', contextFn)
  object.getAllByTitle = createDelegateFor('getAllByTitle', contextFn)
}

// @ts-ignore
export const utils: ITestUtils = {}
extendObjectWithTestingUtils(utils, el => el)
