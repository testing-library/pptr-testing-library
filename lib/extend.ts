/* eslint-disable func-names, global-require, import/no-dynamic-require */

import {getDocument, getQueriesForElement} from '.'
import {ElementHandle, IScopedQueryUtils} from './typedefs'

let Page
let ElementHandle // eslint-disable-line no-redeclare

function requireOrUndefined(path: string) {
  try {
    return require(path)
  } catch (err) {
    return undefined
  }
}

try {
  Page = require('playwright/lib/page.js')
  if (Page.Page) Page = Page.Page

  ElementHandle = requireOrUndefined('playwright/lib/api.js')
  if (ElementHandle && ElementHandle.ElementHandle) ElementHandle = ElementHandle.ElementHandle

  Page.prototype.getDocument = getDocument
  getQueriesForElement(ElementHandle.prototype, function (this: ElementHandle): ElementHandle {
    return this
  })

  ElementHandle.prototype.getQueriesForElement = function (this: ElementHandle): ElementHandle {
    return getQueriesForElement(this)
  }
} catch (err) {
  // eslint-disable-next-line no-console
  console.error('Could not augment playwright functions, do you have a conflicting version?')
  throw err
}

declare module 'playwright/types/types' {
  interface Page {
    getDocument(): Promise<ElementHandle>
  }

  interface ElementHandle extends IScopedQueryUtils {}
}
