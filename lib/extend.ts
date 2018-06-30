import {Matcher, MatcherOptions, SelectorMatcherOptions} from 'dom-testing-library/typings' // tslint:disable-line no-submodule-imports
import {getDocument, getQueriesForElement} from '.'

// tslint:disable-next-line
let Page, ElementHandle

try {
  Page = require('puppeteer/lib/Page.js') // tslint:disable-line
  ElementHandle = require('puppeteer/lib/ElementHandle.js') // tslint:disable-line

  Page.prototype.getDocument = getDocument
  getQueriesForElement(ElementHandle.prototype)
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

  interface ElementHandle {
    getNodeText(): Promise<string>
    queryByPlaceholderText(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle | null>
    queryAllByPlaceholderText(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle[]>
    getByPlaceholderText(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle>
    getAllByPlaceholderText(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle[]>
    queryByText(m: Matcher, opts?: SelectorMatcherOptions): Promise<ElementHandle | null>
    queryAllByText(m: Matcher, opts?: SelectorMatcherOptions): Promise<ElementHandle[]>
    getByText(m: Matcher, opts?: SelectorMatcherOptions): Promise<ElementHandle>
    getAllByText(m: Matcher, opts?: SelectorMatcherOptions): Promise<ElementHandle[]>
    queryByLabelText(m: Matcher, opts?: SelectorMatcherOptions): Promise<ElementHandle | null>
    queryAllByLabelText(m: Matcher, opts?: SelectorMatcherOptions): Promise<ElementHandle[]>
    getByLabelText(m: Matcher, opts?: SelectorMatcherOptions): Promise<ElementHandle>
    getAllByLabelText(m: Matcher, opts?: SelectorMatcherOptions): Promise<ElementHandle[]>
    queryByAltText(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle | null>
    queryAllByAltText(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle[]>
    getByAltText(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle>
    getAllByAltText(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle[]>
    queryByTestId(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle | null>
    queryAllByTestId(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle[]>
    getByTestId(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle>
    getAllByTestId(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle[]>
    queryByTitle(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle | null>
    queryAllByTitle(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle[]>
    getByTitle(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle>
    getAllByTitle(m: Matcher, opts?: MatcherOptions): Promise<ElementHandle[]>
  }
}
