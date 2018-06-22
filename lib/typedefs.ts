import {MatcherOptions, Matcher, SelectorMatcherOptions} from 'dom-testing-library/typings/'

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
