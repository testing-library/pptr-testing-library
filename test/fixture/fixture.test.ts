/* eslint-disable jest/no-done-callback */

import * as path from 'path'
import * as playwright from '@playwright/test'

import {fixtures, TestingLibraryFixtures} from '../../lib/fixture'
import {getDocument, within} from '../../lib'

const test = playwright.test.extend<TestingLibraryFixtures>(fixtures)

const {expect} = test

test.describe('lib/fixture.ts', () => {
  test.beforeEach(async ({page}) => {
    await page.goto(`file://${path.join(__dirname, '../fixtures/page.html')}`)
  })

  test('should handle the query* methods', async ({queries: {queryByText}}) => {
    const element = await queryByText('Hello h1')

    expect(element).toBeTruthy()
    expect(await element.textContent()).toEqual('Hello h1')
  })

  test('should use the new v3 methods', async ({queries: {queryByRole}}) => {
    const element = await queryByRole('presentation')

    expect(element).toBeTruthy()
    expect(await element.textContent()).toContain('Layout table')
  })

  test('should handle regex matching', async ({queries: {queryByText}}) => {
    const element = await queryByText(/HeLlO h(1|7)/i)

    expect(element).toBeTruthy()
    expect(await element.textContent()).toEqual('Hello h1')
  })

  test('should handle the get* methods', async ({queries: {getByTestId}, page}) => {
    const element = await getByTestId('testid-text-input')

    expect(await page.evaluate(el => el.outerHTML, element)).toMatch(
      `<input type="text" data-testid="testid-text-input">`,
    )
  })

  test('should handle the get* method failures', async ({queries}) => {
    const {getByTitle} = queries
    // Use the scoped element so the pretty HTML snapshot is smaller

    await expect(async () => getByTitle('missing')).rejects.toThrow()
  })

  test('should handle the LabelText methods', async ({queries, page}) => {
    const {getByLabelText} = queries
    const element = await getByLabelText('Label A')
    /* istanbul ignore next */
    expect(await page.evaluate(el => el.outerHTML, element)).toMatch(
      `<input id="label-text-input" type="text">`,
    )
  })

  test('should handle the queryAll* methods', async ({queries, page}) => {
    const {queryAllByText} = queries
    const elements = await queryAllByText(/Hello/)
    expect(elements).toHaveLength(3)

    const text = await Promise.all([
      page.evaluate(el => el.textContent, elements[0]),
      page.evaluate(el => el.textContent, elements[1]),
      page.evaluate(el => el.textContent, elements[2]),
    ])

    expect(text).toEqual(['Hello h1', 'Hello h2', 'Hello h3'])
  })

  test('should handle the queryAll* methods with a selector', async ({queries, page}) => {
    const {queryAllByText} = queries
    const elements = await queryAllByText(/Hello/, {selector: 'h2'})
    expect(elements).toHaveLength(1)

    const text = await page.evaluate(el => el.textContent, elements[0])

    expect(text).toEqual('Hello h2')
  })

  test('should handle the getBy* methods with a selector', async ({queries, page}) => {
    const {getByText} = queries
    const element = await getByText(/Hello/, {selector: 'h2'})

    const text = await page.evaluate(el => el.textContent, element)

    expect(text).toEqual('Hello h2')
  })

  test('should handle the getBy* methods with a regex name', async ({queries, page}) => {
    const {getByRole} = queries
    const element = await getByRole('button', {name: /getBy.*Test/})

    const text = await page.evaluate(el => el.textContent, element)

    expect(text).toEqual('getByRole Test')
  })

  test('should get text content', async ({page}) => {
    const document = await getDocument(page)
    const $h3 = await document.$('#scoped h3')
    expect(await $h3.textContent()).toEqual('Hello h3')
  })

  test('should work with destructuring', async ({page}) => {
    const document = await getDocument(page)
    const scope = await document.$('#scoped')
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const {queryByText} = within(scope)
    expect(await queryByText('Hello h1')).toBeFalsy()
    expect(await queryByText('Hello h3')).toBeTruthy()
  })

  test.describe('deferred page', () => {
    test.beforeEach(async ({page}) => {
      await page.goto(`file://${path.join(__dirname, '../fixtures/late-page.html')}`)
    })

    test('should handle the findBy* methods', async ({queries}) => {
      const {findByText} = queries
      expect(await findByText('Loaded!', {}, {timeout: 7000})).toBeTruthy()
    })

    test('should handle the findByAll* methods', async ({queries}) => {
      const {findAllByText} = queries
      const elements = await findAllByText(/Hello/, {}, {timeout: 7000})
      expect(elements).toHaveLength(2)

      const text = await Promise.all([elements[0].textContent(), elements[1].textContent()])

      expect(text).toEqual(['Hello h1', 'Hello h2'])
    })
  })
})
