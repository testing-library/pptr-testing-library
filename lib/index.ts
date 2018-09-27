import {readFileSync} from 'fs'
import * as path from 'path'
import * as queries from 'dom-testing-library/dist/queries'
import {ElementHandle, EvaluateFn, JSHandle, Page} from 'puppeteer'
import waitForExpect from 'wait-for-expect'
import {IQueryUtils} from './typedefs'

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
  return __dom_testing_library__[fnName](container, ...mappedArgs);
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

  const handle = await containerHandle
    .executionContext()
    .evaluateHandle(evaluateFn, containerHandle, fnName, ...argsToForward)
  return covertToElementHandle(handle, fnName.includes('All'))
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

export function getQueriesForElement<T>(object: T, contextFn?: ContextFn): T & IQueryUtils {
  const o = object as any
  if (!contextFn) contextFn = () => o
 
  Object.entries(queries).map(([fnName]) => {
    o[fnName] = createDelegateFor(fnName, contextFn)
  })
  
  o.getQueriesForElement = () => getQueriesForElement(o, () => o)
  o.getNodeText = createDelegateFor<string>('getNodeText', contextFn, processNodeText)
 
  return o
}

export const within = getQueriesForElement

// @ts-ignore
export const queries: IQueryUtils = {}
getQueriesForElement(queries, el => el)
