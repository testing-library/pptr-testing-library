import {Matcher, MatcherOptions, SelectorMatcherOptions} from 'dom-testing-library/typings' // tslint:disable-line no-submodule-imports
import {ElementHandle} from 'puppeteer'

type Element = ElementHandle

interface IQueryMethods {
  queryByPlaceholderText(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element | null>
  queryAllByPlaceholderText(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  getByPlaceholderText(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element>
  getAllByPlaceholderText(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>

  queryByText(el: Element, m: Matcher, opts?: SelectorMatcherOptions): Promise<Element | null>
  queryAllByText(el: Element, m: Matcher, opts?: SelectorMatcherOptions): Promise<Element[]>
  getByText(el: Element, m: Matcher, opts?: SelectorMatcherOptions): Promise<Element>
  getAllByText(el: Element, m: Matcher, opts?: SelectorMatcherOptions): Promise<Element[]>

  queryByLabelText(el: Element, m: Matcher, opts?: SelectorMatcherOptions): Promise<Element | null>
  queryAllByLabelText(el: Element, m: Matcher, opts?: SelectorMatcherOptions): Promise<Element[]>
  getByLabelText(el: Element, m: Matcher, opts?: SelectorMatcherOptions): Promise<Element>
  getAllByLabelText(el: Element, m: Matcher, opts?: SelectorMatcherOptions): Promise<Element[]>

  queryByAltText(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element | null>
  queryAllByAltText(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  getByAltText(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element>
  getAllByAltText(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>

  queryByTestId(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element | null>
  queryAllByTestId(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  getByTestId(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element>
  getAllByTestId(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>

  queryByTitle(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element | null>
  queryAllByTitle(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  getByTitle(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element>
  getAllByTitle(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
}

type IScopedQueryMethods = {
  [K in keyof IQueryMethods]: (m: Matcher, opts?: MatcherOptions) => ReturnType<IQueryMethods[K]>
}

export interface IScopedQueryUtils extends IScopedQueryMethods {
  getQueriesForElement(): IQueryUtils & IScopedQueryUtils
  getNodeText(): Promise<string>
}

export interface IQueryUtils extends IQueryMethods {
  getQueriesForElement(): IQueryUtils & IScopedQueryUtils
  getNodeText(el: Element): Promise<string>
}
