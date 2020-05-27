import {getDocument, getQueriesForElement} from '.'
import {ElementHandle, IScopedQueryUtils} from './typedefs'

// tslint:disable-next-line
let Page, ElementHandle

function requireOrUndefined(path: string): any {
  try {
    return require(path)
  } catch (err) {}
}

try {
  Page = require('playwright-core/lib/page.js') // tslint:disable-line
  if (Page.Page) Page = Page.Page

  ElementHandle = requireOrUndefined('playwright-core/lib/api.js') // tslint:disable-line variable-name
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
  console.error('Could not augment playwright functions, do you have a conflicting version?')
  throw err
}

/* tslint:disable */
declare module 'playwright-core/types/types' {
  interface Page {
    getDocument(): Promise<ElementHandle>
  }

  interface ElementHandle extends IScopedQueryUtils {}
}
