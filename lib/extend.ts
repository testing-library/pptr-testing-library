import {getDocument, getQueriesForElement} from '.'
import {ElementHandle} from '../node_modules/@types/puppeteer'
import {IScopedQueryUtils} from './typedefs'

// tslint:disable-next-line
let Page, ElementHandle

function requireOrUndefined(path: string): any {
  try {
    return require(path)
  } catch (err) {}
}

try {
  Page = require('puppeteer/lib/Page.js') // tslint:disable-line
  if (Page.Page) Page = Page.Page

  ElementHandle = requireOrUndefined('puppeteer/lib/ElementHandle.js') // tslint:disable-line variable-name
  if (ElementHandle && ElementHandle.ElementHandle) ElementHandle = ElementHandle.ElementHandle

  if (!ElementHandle) {
    const ExecutionContext = requireOrUndefined('puppeteer/lib/ExecutionContext.js') // tslint:disable-line variable-name
    if (ExecutionContext && ExecutionContext.ElementHandle) {
      ElementHandle = ExecutionContext.ElementHandle
    }
  }
  if (ElementHandle && ElementHandle.ElementHandle) ElementHandle = ElementHandle.ElementHandle

  if (!ElementHandle) {
    const JSHandle = require('puppeteer/lib/JSHandle.js') // tslint:disable-line
    if (JSHandle && JSHandle.ElementHandle) {
      ElementHandle = JSHandle.ElementHandle
    }
  }
  if (ElementHandle && ElementHandle.ElementHandle) ElementHandle = ElementHandle.ElementHandle

  Page.prototype.getDocument = getDocument
  getQueriesForElement(ElementHandle.prototype, function(this: ElementHandle): ElementHandle {
    return this
  })

  ElementHandle.prototype.getQueriesForElement = function(this: ElementHandle): ElementHandle {
    return getQueriesForElement(this)
  }
} catch (err) {
  // tslint:disable-next-line
  console.error('Could not augment puppeteer functions, do you have a conflicting version?')
  throw err
}

/* tslint:disable */
declare module 'puppeteer' {
  interface Page {
    getDocument(): Promise<ElementHandle>
  }

  interface ElementHandle extends IScopedQueryUtils {}
}
