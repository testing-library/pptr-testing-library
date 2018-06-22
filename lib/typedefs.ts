import {ElementHandle} from 'puppeteer'
import {MatcherOptions, Matcher, SelectorMatcherOptions} from 'dom-testing-library/typings/'

type Element = ElementHandle

export interface ITestUtils {
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

declare module 'puppeteer' {
  interface Page {
    getTestingUtilsForDocument(): ElementHandle
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
