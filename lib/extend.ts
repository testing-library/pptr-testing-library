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
  const libPrefix = requireOrUndefined(`puppeteer/lib/cjs/puppeteer/common/Page.js`)
    ? 'puppeteer/lib/cjs/puppeteer/common'
    : 'puppeteer/lib'

  Page = requireOrUndefined(`${libPrefix}/Page.js`) // tslint:disable-line
  if (Page.Page) Page = Page.Page

  ElementHandle = requireOrUndefined(`${libPrefix}/ElementHandle.js`) // tslint:disable-line variable-name
  if (ElementHandle && ElementHandle.ElementHandle) ElementHandle = ElementHandle.ElementHandle

  if (!ElementHandle) {
    const ExecutionContext = requireOrUndefined(`${libPrefix}/ExecutionContext.js`) // tslint:disable-line variable-name
    if (ExecutionContext && ExecutionContext.ElementHandle) {
      ElementHandle = ExecutionContext.ElementHandle
    }
  }
  if (ElementHandle && ElementHandle.ElementHandle) ElementHandle = ElementHandle.ElementHandle

  if (!ElementHandle) {
    const JSHandle = require(`${libPrefix}/JSHandle.js`) // tslint:disable-line
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
