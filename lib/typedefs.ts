import {
  ByRoleOptions as ByRoleOptions_,
  Matcher,
  MatcherOptions as MatcherOptions_,
  SelectorMatcherOptions as SelectorMatcherOptions_,
  waitForOptions,
} from '@testing-library/dom'
import {ElementHandle} from 'puppeteer'

type Element = ElementHandle

type MatcherOptions = Omit<MatcherOptions_, 'normalizer'>
type SelectorMatcherOptions = Omit<SelectorMatcherOptions_, 'normalizer'>
type ByRoleOptions = Omit<ByRoleOptions_, 'normalizer'>

interface IQueryMethods {
  queryByPlaceholderText(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element | null>
  queryAllByPlaceholderText(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  getByPlaceholderText(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element>
  getAllByPlaceholderText(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  findByPlaceholderText(
    el: Element,
    m: Matcher,
    opts?: SelectorMatcherOptions,
    waitForOpts?: waitForOptions,
  ): Promise<Element>
  findAllByPlaceholderText(
    el: Element,
    m: Matcher,
    opts?: SelectorMatcherOptions,
    waitForOpts?: waitForOptions,
  ): Promise<Element[]>

  queryByText(el: Element, m: Matcher, opts?: SelectorMatcherOptions): Promise<Element | null>
  queryAllByText(el: Element, m: Matcher, opts?: SelectorMatcherOptions): Promise<Element[]>
  getByText(el: Element, m: Matcher, opts?: SelectorMatcherOptions): Promise<Element>
  getAllByText(el: Element, m: Matcher, opts?: SelectorMatcherOptions): Promise<Element[]>
  findByText(
    el: Element,
    m: Matcher,
    opts?: SelectorMatcherOptions,
    waitForOpts?: waitForOptions,
  ): Promise<Element>
  findAllByText(
    el: Element,
    m: Matcher,
    opts?: SelectorMatcherOptions,
    waitForOpts?: waitForOptions,
  ): Promise<Element[]>

  queryByLabelText(el: Element, m: Matcher, opts?: SelectorMatcherOptions): Promise<Element | null>
  queryAllByLabelText(el: Element, m: Matcher, opts?: SelectorMatcherOptions): Promise<Element[]>
  getByLabelText(el: Element, m: Matcher, opts?: SelectorMatcherOptions): Promise<Element>
  getAllByLabelText(el: Element, m: Matcher, opts?: SelectorMatcherOptions): Promise<Element[]>
  findByLabelText(
    el: Element,
    m: Matcher,
    opts?: SelectorMatcherOptions,
    waitForOpts?: waitForOptions,
  ): Promise<Element>
  findAllByLabelText(
    el: Element,
    m: Matcher,
    opts?: SelectorMatcherOptions,
    waitForOpts?: waitForOptions,
  ): Promise<Element[]>

  queryByAltText(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element | null>
  queryAllByAltText(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  getByAltText(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element>
  getAllByAltText(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  findByAltText(
    el: Element,
    m: Matcher,
    opts?: SelectorMatcherOptions,
    waitForOpts?: waitForOptions,
  ): Promise<Element>
  findAllByAltText(
    el: Element,
    m: Matcher,
    opts?: SelectorMatcherOptions,
    waitForOpts?: waitForOptions,
  ): Promise<Element[]>

  queryByTestId(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element | null>
  queryAllByTestId(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  getByTestId(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element>
  getAllByTestId(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  findByTestId(
    el: Element,
    m: Matcher,
    opts?: SelectorMatcherOptions,
    waitForOpts?: waitForOptions,
  ): Promise<Element>
  findAllByTestId(
    el: Element,
    m: Matcher,
    opts?: SelectorMatcherOptions,
    waitForOpts?: waitForOptions,
  ): Promise<Element[]>

  queryByTitle(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element | null>
  queryAllByTitle(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  getByTitle(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element>
  getAllByTitle(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  findByTitle(
    el: Element,
    m: Matcher,
    opts?: SelectorMatcherOptions,
    waitForOpts?: waitForOptions,
  ): Promise<Element>
  findAllByTitle(
    el: Element,
    m: Matcher,
    opts?: SelectorMatcherOptions,
    waitForOpts?: waitForOptions,
  ): Promise<Element[]>

  queryByRole(el: Element, m: Matcher, opts?: ByRoleOptions): Promise<Element | null>
  queryAllByRole(el: Element, m: Matcher, opts?: ByRoleOptions): Promise<Element[]>
  getByRole(el: Element, m: Matcher, opts?: ByRoleOptions): Promise<Element>
  getAllByRole(el: Element, m: Matcher, opts?: ByRoleOptions): Promise<Element[]>
  findByRole(
    el: Element,
    m: Matcher,
    opts?: ByRoleOptions,
    waitForOpts?: waitForOptions,
  ): Promise<Element>
  findAllByRole(
    el: Element,
    m: Matcher,
    opts?: ByRoleOptions,
    waitForOpts?: waitForOptions,
  ): Promise<Element[]>

  queryByDisplayValue(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element | null>
  queryAllByDisplayValue(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  getByDisplayValue(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element>
  getAllByDisplayValue(el: Element, m: Matcher, opts?: MatcherOptions): Promise<Element[]>
  findByDisplayValue(
    el: Element,
    m: Matcher,
    opts?: SelectorMatcherOptions,
    waitForOpts?: waitForOptions,
  ): Promise<Element>
  findAllByDisplayValue(
    el: Element,
    m: Matcher,
    opts?: SelectorMatcherOptions,
    waitForOpts?: waitForOptions,
  ): Promise<Element[]>
}

export type BoundFunction<T> = T extends (
  attribute: string,
  element: Element,
  text: infer P,
  options: infer Q,
) => infer R
  ? (text: P, options?: Q) => R
  : T extends (a1: any, text: infer P, options: infer Q, waitForOptions: infer W) => infer R
  ? (text: P, options?: Q, waitForOptions?: W) => R
  : T extends (a1: any, text: infer P, options: infer Q) => infer R
  ? (text: P, options?: Q) => R
  : never
export type BoundFunctions<T> = {[P in keyof T]: BoundFunction<T[P]>}

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
