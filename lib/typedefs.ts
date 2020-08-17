import {BoundFunctions, Matcher, MatcherOptions, SelectorMatcherOptions, WaitForElementOptions} from '@testing-library/dom'
import {ElementHandle} from 'puppeteer'

type Element = ElementHandle

interface IQueryMethods {
  queryByPlaceholderText(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element | null>
  queryAllByPlaceholderText(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  getByPlaceholderText(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element>
  getAllByPlaceholderText(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  findByPlaceholderText(el: Element, m: Matcher, opts?: SelectorMatcherOptions, waitForOpts?: WaitForElementOptions): Promise<Element>
  findAllByPlaceholderText(el: Element, m: Matcher, opts?: SelectorMatcherOptions, waitForOpts?: WaitForElementOptions): Promise<Element[]>

  queryByText(el: Element, m: Matcher, opts?: SelectorMatcherOptions): Promise<Element | null>
  queryAllByText(el: Element, m: Matcher, opts?: SelectorMatcherOptions): Promise<Element[]>
  getByText(el: Element, m: Matcher, opts?: SelectorMatcherOptions): Promise<Element>
  getAllByText(el: Element, m: Matcher, opts?: SelectorMatcherOptions): Promise<Element[]>
  findByText(el: Element, m: Matcher, opts?: SelectorMatcherOptions, waitForOpts?: WaitForElementOptions): Promise<Element>
  findAllByText(el: Element, m: Matcher, opts?: SelectorMatcherOptions, waitForOpts?: WaitForElementOptions): Promise<Element[]>

  queryByLabelText(el: Element, m: Matcher, opts?: SelectorMatcherOptions): Promise<Element | null>
  queryAllByLabelText(el: Element, m: Matcher, opts?: SelectorMatcherOptions): Promise<Element[]>
  getByLabelText(el: Element, m: Matcher, opts?: SelectorMatcherOptions): Promise<Element>
  getAllByLabelText(el: Element, m: Matcher, opts?: SelectorMatcherOptions): Promise<Element[]>
  findByLabelText(el: Element, m: Matcher, opts?: SelectorMatcherOptions, waitForOpts?: WaitForElementOptions): Promise<Element>
  findAllByLabelText(el: Element, m: Matcher, opts?: SelectorMatcherOptions, waitForOpts?: WaitForElementOptions): Promise<Element[]>

  queryByAltText(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element | null>
  queryAllByAltText(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  getByAltText(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element>
  getAllByAltText(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  findByAltText(el: Element, m: Matcher, opts?: SelectorMatcherOptions, waitForOpts?: WaitForElementOptions): Promise<Element>
  findAllByAltText(el: Element, m: Matcher, opts?: SelectorMatcherOptions, waitForOpts?: WaitForElementOptions): Promise<Element[]>

  queryByTestId(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element | null>
  queryAllByTestId(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  getByTestId(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element>
  getAllByTestId(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  findByTestId(el: Element, m: Matcher, opts?: SelectorMatcherOptions, waitForOpts?: WaitForElementOptions): Promise<Element>
  findAllByTestId(el: Element, m: Matcher, opts?: SelectorMatcherOptions, waitForOpts?: WaitForElementOptions): Promise<Element[]>

  queryByTitle(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element | null>
  queryAllByTitle(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  getByTitle(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element>
  getAllByTitle(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  findByTitle(el: Element, m: Matcher, opts?: SelectorMatcherOptions, waitForOpts?: WaitForElementOptions): Promise<Element>
  findAllByTitle(el: Element, m: Matcher, opts?: SelectorMatcherOptions, waitForOpts?: WaitForElementOptions): Promise<Element[]>

  queryByRole(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element | null>
  queryAllByRole(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  getByRole(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element>
  getAllByRole(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  findByRole(el: Element, m: Matcher, opts?: SelectorMatcherOptions, waitForOpts?: WaitForElementOptions): Promise<Element>
  findAllByRole(el: Element, m: Matcher, opts?: SelectorMatcherOptions, waitForOpts?: WaitForElementOptions): Promise<Element[]>

  queryByDisplayValue(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element | null>
  queryAllByDisplayValue(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  getByDisplayValue(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element>
  getAllByDisplayValue(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  findByDisplayValue(el: Element, m: Matcher, opts?: SelectorMatcherOptions, waitForOpts?: WaitForElementOptions): Promise<Element>
  findAllByDisplayValue(el: Element, m: Matcher, opts?: SelectorMatcherOptions, waitForOpts?: WaitForElementOptions): Promise<Element[]>
}

export interface IScopedQueryUtils extends BoundFunctions<IQueryMethods> {
  getQueriesForElement(): IScopedQueryUtils
  getNodeText(): Promise<string>
}

export interface IQueryUtils extends IQueryMethods {
  getQueriesForElement(): IScopedQueryUtils
  getNodeText(el: Element): Promise<string>
}

export interface IConfigureOptions {
  testIdAttribute: string
}
