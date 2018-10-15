import {getDocument, getQueriesForElement} from '.'
import {ElementHandle} from '../node_modules/@types/puppeteer'
import {IScopedQueryUtils} from './typedefs'

// tslint:disable-next-line
let Page, ElementHandle

try {
  Page = require('puppeteer/lib/Page.js') // tslint:disable-line
  ElementHandle = require('puppeteer/lib/ElementHandle.js') // tslint:disable-line

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
