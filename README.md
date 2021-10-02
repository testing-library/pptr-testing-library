<div align="center">
  <br>
  <header>
    <img src="https://user-images.githubusercontent.com/288160/126050717-dd76eb80-ef06-40e0-97e8-72c20c9f8f20.png" height="64" />
  </header>
  <br>
  <h1>playwright-testing-library</h1>
  <p>🔍 Find elements in <strong>playwright</strong> like your users  with queries from <strong>@testing-library/dom</strong></p>
</div>

<div align="center">

[![Package Version][npm-badge]][npm-link]
[![Build Status][build-badge]][build-link]
[![Test Coverage][codecov-badge]][codecov-link]
[![Dependencies Status][david-badge]][david-link]
[![MIT License][license-badge]][license-link] <br>
[![Code Style][prettier-badge]][prettier-link]
[![Conventional Commits][conventional-commits-badge]][conventional-commits-link]
[![Maintenance][maintenance-badge]][maintenance-link]

</div>

<br>

## ✨ Features

> ⚠️ Note: this is a fork of [pptr-testing-library](https://github.com/testing-library/pptr-testing-library) modified to accomodate for some subtle API differences.

All of your favorite user-centric querying functions from **@testing-library/react** and **@testing-library/dom** available from Playwright!

- Playwright Test [fixture](https://playwright.dev/docs/test-fixtures) — **`@playwright-testing-library/test/fixture`** or...
- Standalone queries — **`playwright-testing-library`**/**`@playwright-testing-library/test`**
- Asynchronous assertion helper (via **[wait-for-expect](https://github.com/TheBrainFamily/wait-for-expect)**)

## 🌱 Getting Started

### 1. Install

```bash
npm install --save-dev playwright-testing-library
```

or

```bash
yarn add --dev playwright-testing-library
```

### 2a. Use _Playwright Test [fixture](https://playwright.dev/docs/test-fixtures)_

```ts
import {test as baseTest} from '@playwright/test'
import {fixtures, TestingLibraryFixtures} from '@playwright-testing-library/test/fixture'

// As only fixture
const test = baseTest.extend<TestingLibraryFixtures>(fixtures)

// Alternatively, with other fixtures
interface Fixtures extends TestingLibraryFixtures {
  // ... additional fixture types
}

const test = baseTest.extend<Fixtures>({
  ...fixtures,
  // ... additional fixtures
})

const {expect} = test

// Query methods are available in `test` blocks
test('my form', ({queries: {getByTestId}}) => {
  const $form = await getByTestId('my-form')

  // Scope queries with `getQueriesForElement`
  const {getByLabelText} = $form.getQueriesForElement()

  const $email = await getByLabelText('Email')

  // Interact with Playwright like usual
  await $email.type('playwright@example.com')

  expect($email).toHaveValue('playwright@example.com')

  // ...
})
```

### 2b. Use _standalone queries_

```js
const {webkit} = require('playwright') // or 'firefox' or 'chromium'
const {getDocument, queries} = require('playwright-testing-library')

const {getByTestId, getByLabelText} = queries

const browser = await webkit.launch()
const page = await browser.newPage()

// Grab ElementHandle for document
const $document = await getDocument(page)

// Your favorite query methods are available
const $form = await getByTestId($document, 'my-form')

// Returned elements are ElementHandles too!
const $email = await getByLabelText($form, 'Email')

// Interact with playwright like usual
await $email.type('playwright@example.com')

// ...
```

## 🔌 API

Unique methods, not part of **@testing-library/dom**

- Get an `ElementHandle` for the document

  ```ts
  getDocument(page: playwright.Page): ElementHandle
  ```

- Wait for an assertion (wrapper around [wait-for-expect](https://github.com/TheBrainFamily/wait-for-expect))

  ```ts
  waitFor(
    expectation: () => void | Promise<void>,
    timeout?: number,
    interval?: number
  ): Promise<{}>
  ```

---

The **[@testing-library/dom](https://github.com/testing-library/dom-testing-library#usage)** — All **`get*`** and **`query*`** methods are supported.

- `getQueriesForElement(handle: ElementHandle): ElementHandle & QueryUtils` - extend the input object with the query API and return it
- `getNodeText(handle: ElementHandle): Promise<string>` - get the text content of the element
- `queries: QueryUtils` - the query subset of `@testing-library/dom` exports
  - `queryByPlaceholderText`
  - `queryAllByPlaceholderText`
  - `getByPlaceholderText`
  - `getAllByPlaceholderText`
  - `findByPlaceholderText`
  - `findAllByPlaceholderText`
  - `queryByText`
  - `queryAllByText`
  - `getByText`
  - `getAllByText`
  - `findByText`
  - `findAllByText`
  - `queryByLabelText`
  - `queryAllByLabelText`
  - `getByLabelText`
  - `getAllByLabelText`
  - `findByLabelText`
  - `findAllByLabelText`
  - `queryByAltText`
  - `queryAllByAltText`
  - `getByAltText`
  - `getAllByAltText`
  - `findByAltText`
  - `findAllByAltText`
  - `queryByTestId`
  - `queryAllByTestId`
  - `getByTestId`
  - `getAllByTestId`
  - `findByTestId`
  - `findAllByTestId`
  - `queryByTitle`
  - `queryAllByTitle`
  - `getByTitle`
  - `getAllByTitle`
  - `findByTitle`
  - `findAllByTitle`
  - `queryByDisplayValue`,
  - `queryAllByDisplayValue`,
  - `getByDisplayValue`,
  - `getAllByDisplayValue`,
  - `findByDisplayValue`,
  - `findAllByDisplayValue`,

## Known Limitations

- Async utilities `waitForElement`, `waitForElementToBeRemoved` and `waitForDomChange` are not exposed. Consider using a `find*` query.
- `fireEvent` method is not exposed, use Playwright's built-ins instead.
- `expect` assertion extensions are not available.

## Special Thanks

- [pptr-testing-library](https://github.com/testing-library/pptr-testing-library)
- [@testing-library/dom](https://github.com/testing-library/dom-testing-library) of course!

## Related Playwright Test Utilities

- [jest-playwright](https://github.com/playwright-community/jest-playwright)
- [expect-playwright](https://github.com/playwright-community/expect-playwright)
- Yours! Name TBD, PR welcome ;)

## LICENSE

MIT

[codecov-badge]: https://codecov.io/gh/hoverinc/playwright-testing-library/branch/main/graph/badge.svg
[codecov-link]: https://codecov.io/gh/hoverinc/playwright-testing-library
[conventional-commits-badge]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg
[conventional-commits-link]: https://conventionalcommits.org
[david-badge]: https://david-dm.org/hoverinc/playwright-testing-library.svg
[david-link]: https://david-dm.org/hoverinc/playwright-testing-library
[license-badge]: https://img.shields.io/npm/l/@hover/javascript.svg
[license-link]: https://github.com/hoverinc/hover-javascript/blob/master/LICENSE
[maintenance-badge]: https://img.shields.io/badge/maintenance-active-247ddc?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAcCAYAAACUJBTQAAAB1ElEQVRIibWWPUtdQRCGH0VNF/wCCVjYCxr/gZWdhYVgLQYbm/wACTYxxA8SSBDtbKwUbfQWkiJFAgkkmHBBY6U2CXaCGlDDG1buxePOnt17bsgD28zOzjtnZvbuRVKR1SFpVdKepEe1njOGnOWCz0q60B1lSa05/oVE2iTNSfqdCZ7lSyWB0NmkSJekeUmXJqzlayWZUJxckUUTJs23mFAjlhNjSdMHfAQ6g54hZUnDdXyN44ek7iKNH4w0PMaeX7pQ8Ox6HQkWww3Dw1hPWoAJ4BxoB4aNR5oB4APQ5vekUdITSceZDLcreyORrGPcfpEL0CBpVNJRwLmUSWLS7NbGpju8FXEteT2qR+jQ9aS3QK2XgUljjXPpRC6iLpYV4KmxRghNVy28Aqb+t4jjLbBhrAH+RcRxZSwBUiINxlIHKZE/xlIHTTlHBDwHjoDPwHtgF/gEnBnvFJVfzSrXkpYyfxKGvIu14F3ONXP1LOWmzEPjpuWl92j55XyQyDnEjRN5AbwD9gMOPkV7tAPMOJE3ZuuOFmOpjS3gGfCdQDl8fgGnGVtzwt8F7wdGqgKOvOmq4iarB3gMjAFlb78qug5MAwehIO4tKViJe4wDP4FSrgfwF/ntR8JxRSf3AAAAAElFTkSuQmCC
[maintenance-link]: https://github.com/hoverinc/hover-javascript#maintenance
[npm-badge]: https://img.shields.io/npm/v/playwright-testing-library
[npm-link]: https://www.npmjs.com/package/playwright-testing-library
[prettier-badge]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?logo=prettier
[prettier-link]: https://prettierjs.org/en/download/
[build-badge]: https://github.com/hoverinc/playwright-testing-library/actions/workflows/build.yml/badge.svg
[build-link]: https://github.com/hoverinc/playwright-testing-library/actions/workflows/build.yml
