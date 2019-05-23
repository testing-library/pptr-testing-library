import {readFileSync} from 'fs'
import * as path from 'path'
import {ElementHandle, EvaluateFn, JSHandle, Page} from 'puppeteer'
import waitForExpect from 'wait-for-expect'
import {IQueryUtils, IScopedQueryUtils} from './typedefs'

const domLibraryAsString = readFileSync(
  path.join(__dirname, '../dom-testing-library.js'),
  'utf8',
).replace(/process.env/g, '{}')

/* istanbul ignore next */
function mapArgument(argument: any, index: number): any {
  return index === 0 && typeof argument === 'object' && argument.regex
    ? new RegExp(argument.regex, argument.flags)
    : argument
}

const delegateFnBodyToExecuteInPage = `
  ${domLibraryAsString};

  const mappedArgs = args.map(${mapArgument.toString()});
  const moduleWithFns = fnName in __dom_testing_library__ ?
    __dom_testing_library__ :
    __dom_testing_library__.__moduleExports;
  return moduleWithFns[fnName](container, ...mappedArgs);
`

type DOMReturnType = ElementHandle | ElementHandle[] | null

type ContextFn = (...args: any[]) => ElementHandle

async function createElementHandleArray(handle: JSHandle): Promise<ElementHandle[]> {
  const lengthHandle = await handle.getProperty('length')
  const length = await lengthHandle.jsonValue()

  const elements: ElementHandle[] = []
  for (let i = 0; i < length; i++) {
    const jsElement = await handle.getProperty(i.toString())
    const element = await createElementHandle(jsElement)
    if (element) elements.push(element)
  }

  return elements
}

async function createElementHandle(handle: JSHandle): Promise<ElementHandle | null> {
  const element = handle.asElement()
  if (element) return element
  await handle.dispose()
  return null // tslint:disable-line
}

async function covertToElementHandle(handle: JSHandle, asArray: boolean): Promise<DOMReturnType> {
  return asArray ? createElementHandleArray(handle) : createElementHandle(handle)
}

function processNodeText(handles: IHandleSet): Promise<string> {
  return handles.containerHandle
    .executionContext()
    .evaluate(handles.evaluateFn, handles.containerHandle, 'getNodeText')
}

async function processQuery(handles: IHandleSet): Promise<DOMReturnType> {
  const {containerHandle, evaluateFn, fnName, argsToForward} = handles

  try {
    const handle = await containerHandle
      .executionContext()
      .evaluateHandle(evaluateFn, containerHandle, fnName, ...argsToForward)
    return await covertToElementHandle(handle, fnName.includes('All'))
  } catch (err) {
    err.message = err.message.replace('[fnName]', `[${fnName}]`)
    err.stack = err.stack.replace('[fnName]', `[${fnName}]`)
    throw err
  }
}

interface IHandleSet {
  containerHandle: ElementHandle
  evaluateFn: EvaluateFn
  fnName: string
  argsToForward: any[]
}

function createDelegateFor<T = DOMReturnType>(
  fnName: keyof IQueryUtils,
  contextFn?: ContextFn,
  processHandleFn?: (handles: IHandleSet) => Promise<T>,
): (...args: any[]) => Promise<T> {
  // @ts-ignore
  processHandleFn = processHandleFn || processQuery

  const convertRegExp = (regex: RegExp) => ({regex: regex.source, flags: regex.flags})

  return async function(...args: any[]): Promise<T> {
    // @ts-ignore
    const containerHandle: ElementHandle = contextFn ? contextFn.apply(this, args) : this
    // @ts-ignore
    const evaluateFn: EvaluateFn = new Function(
      'container, fnName, ...args',
      delegateFnBodyToExecuteInPage,
    )

    // Convert RegExp to a special format since they don't serialize well
    let argsToForward = args.map(arg => (arg instanceof RegExp ? convertRegExp(arg) : arg))
    // Remove the container from the argsToForward since it's always the first argument
    if (containerHandle === args[0]) {
      argsToForward = args.slice(1)
    }

    return processHandleFn!({fnName, containerHandle, evaluateFn, argsToForward})
  }
}

export async function getDocument(_page?: Page): Promise<ElementHandle> {
  // @ts-ignore
  const page: Page = _page || this
  const documentHandle = await page.mainFrame().evaluateHandle('document')
  const document = documentHandle.asElement()
  if (!document) throw new Error('Could not find document')
  return document
}

export function wait(
  callback: () => any = () => undefined,
  {timeout = 4500, interval = 50} = {}, // tslint:disable-line
): Promise<{}> {
  return waitForExpect(callback, timeout, interval)
}

export function getQueriesForElement<T>(
  object: T,
  contextFn?: ContextFn,
): T & IQueryUtils & IScopedQueryUtils {
  const o = object as any
  if (!contextFn) contextFn = () => o
  o.getQueriesForElement = () => getQueriesForElement(o, () => o)

  o.queryByPlaceholderText = createDelegateFor('queryByPlaceholderText', contextFn)
  o.queryAllByPlaceholderText = createDelegateFor('queryAllByPlaceholderText', contextFn)
  o.getByPlaceholderText = createDelegateFor('getByPlaceholderText', contextFn)
  o.getAllByPlaceholderText = createDelegateFor('getAllByPlaceholderText', contextFn)

  o.queryByText = createDelegateFor('queryByText', contextFn)
  o.queryAllByText = createDelegateFor('queryAllByText', contextFn)
  o.getByText = createDelegateFor('getByText', contextFn)
  o.getAllByText = createDelegateFor('getAllByText', contextFn)

  o.queryByLabelText = createDelegateFor('queryByLabelText', contextFn)
  o.queryAllByLabelText = createDelegateFor('queryAllByLabelText', contextFn)
  o.getByLabelText = createDelegateFor('getByLabelText', contextFn)
  o.getAllByLabelText = createDelegateFor('getAllByLabelText', contextFn)

  o.queryByAltText = createDelegateFor('queryByAltText', contextFn)
  o.queryAllByAltText = createDelegateFor('queryAllByAltText', contextFn)
  o.getByAltText = createDelegateFor('getByAltText', contextFn)
  o.getAllByAltText = createDelegateFor('getAllByAltText', contextFn)

  o.queryByTestId = createDelegateFor('queryByTestId', contextFn)
  o.queryAllByTestId = createDelegateFor('queryAllByTestId', contextFn)
  o.getByTestId = createDelegateFor('getByTestId', contextFn)
  o.getAllByTestId = createDelegateFor('getAllByTestId', contextFn)

  o.queryByTitle = createDelegateFor('queryByTitle', contextFn)
  o.queryAllByTitle = createDelegateFor('queryAllByTitle', contextFn)
  o.getByTitle = createDelegateFor('getByTitle', contextFn)
  o.getAllByTitle = createDelegateFor('getAllByTitle', contextFn)

  o.queryByRole = createDelegateFor('queryByRole', contextFn)
  o.queryAllByRole = createDelegateFor('queryAllByRole', contextFn)
  o.getByRole = createDelegateFor('getByRole', contextFn)
  o.getAllByRole = createDelegateFor('getAllByRole', contextFn)

  o.queryByDisplayValue = createDelegateFor('queryByDisplayValue', contextFn)
  o.queryAllByDisplayValue = createDelegateFor('queryAllByDisplayValue', contextFn)
  o.getByDisplayValue = createDelegateFor('getByDisplayValue', contextFn)
  o.getAllByDisplayValue = createDelegateFor('getAllByDisplayValue', contextFn)

  o.getNodeText = createDelegateFor<string>('getNodeText', contextFn, processNodeText)

  return o
}

export const within = getQueriesForElement

// @ts-ignore
export const queries: IQueryUtils = {}
getQueriesForElement(queries, el => el)
