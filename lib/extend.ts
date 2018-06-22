import {Matcher, MatcherOptions, SelectorMatcherOptions} from 'dom-testing-library/typings' // tslint:disable-line no-submodule-imports
import {extendObjectWithTestingUtils, getDocument} from '.'

const Page = require('puppeteer/lib/Page.js') // tslint:disable-line
const ElementHandle = require('puppeteer/lib/ElementHandle.js') // tslint:disable-line

Page.prototype.getDocument = getDocument

extendObjectWithTestingUtils(ElementHandle.prototype)

/* tslint:disable */
declare module 'puppeteer' {
  interface Page {
    getDocument(): Promise<ElementHandle>
  }

  interface ElementHandle {
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
