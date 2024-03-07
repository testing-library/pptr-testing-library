import type {ElementHandle as ElementHandleType} from 'puppeteer'

import {getDocument, getQueriesForElement} from '.'
import {IScopedQueryUtils} from './typedefs'

// tslint:disable-next-line
let Page, ElementHandle

function requireOrUndefined(path: string): any {
  try {
    return require(path)
  } catch (err) {}
}

try {
  let apiPrefix = 'puppeteer-core/lib/cjs/puppeteer/api' // Puppeteer v18+

  if (!requireOrUndefined(`${apiPrefix}/Page.js`)) {
    apiPrefix = 'puppeteer/lib/cjs/common' // Puppeteer v5-v18
  } else if (!requireOrUndefined(`${apiPrefix}/Page.js`)) {
    apiPrefix = 'puppeteer/lib' // Puppeteer <v5
  }

  Page = requireOrUndefined(`${apiPrefix}/Page.js`) // tslint:disable-line
  if (Page.Page) Page = Page.Page

  ElementHandle = requireOrUndefined(`${apiPrefix}/ElementHandle.js`) // tslint:disable-line variable-name
  if (ElementHandle && ElementHandle.ElementHandle) ElementHandle = ElementHandle.ElementHandle

  if (!ElementHandle) {
    const ExecutionContext = requireOrUndefined(`${apiPrefix}/ExecutionContext.js`) // tslint:disable-line variable-name
    if (ExecutionContext && ExecutionContext.ElementHandle) {
      ElementHandle = ExecutionContext.ElementHandle
    }
  }
  if (ElementHandle && ElementHandle.ElementHandle) ElementHandle = ElementHandle.ElementHandle

  if (!ElementHandle) {
    const JSHandle = require(`${apiPrefix}/JSHandle.js`) // tslint:disable-line
    if (JSHandle && JSHandle.ElementHandle) {
      ElementHandle = JSHandle.ElementHandle
    }
  }
  if (ElementHandle && ElementHandle.ElementHandle) ElementHandle = ElementHandle.ElementHandle

  Page.prototype.getDocument = getDocument
  getQueriesForElement(ElementHandle.prototype, function(
    this: ElementHandleType,
  ): ElementHandleType {
    return this
  })

  ElementHandle.prototype.getQueriesForElement = function(
    this: ElementHandleType,
  ): ElementHandleType {
    return getQueriesForElement(this)
  }
} catch (err) {
  console.error('Could not augment puppeteer functions, do you have a conflicting version?')
  console.error((err as any).stack)
  throw err
}

/* tslint:disable */
declare module 'puppeteer' {
  interface Page {
    getDocument(): Promise<ElementHandle>
  }

  interface ElementHandle extends IScopedQueryUtils {}
}
