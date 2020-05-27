# playwright-testing-library

[![NPM Package](https://badge.fury.io/js/playwright-testing-library.svg)](https://www.npmjs.com/package/playwright-testing-library)
[![Build Status](https://travis-ci.org/hoverinc/playwright-testing-library.svg?branch=master)](https://travis-ci.org/hoverinc/playwright-testing-library)
[![Coverage Status](https://coveralls.io/repos/github/hoverinc/playwright-testing-library/badge.svg?branch=master)](https://coveralls.io/github/hoverinc/playwright-testing-library?branch=master)
[![Dependencies](https://david-dm.org/hoverinc/playwright-testing-library.svg)](https://david-dm.org/hoverinc/playwright-testing-library)

[playwright](https://github.com/microsoft/playwright) + [@testing-library/dom](https://github.com/testing-library/dom-testing-library) = 💖

All your favorite user-centric querying functions from @testing-library/react & @testing-library/library available from Playwright!

> ⚠️ Note: this is a fork of [pptr-testing-library](https://github.com/testing-library/pptr-testing-library) modified to accomodate for some subtle API differences.

## Install

`npm install --save-dev playwright-testing-library`

## Use

```js
const {webkit} = require('playwright') // or 'firefox' or 'chromium'
const {getDocument, queries, wait} = require('playwright-testing-library')

const {getByTestId, getByLabelText} = queries

const browser = await webkit.launch()
const page = await browser.newPage()

// Grab ElementHandle for document
const $document = await getDocument(page)
// Your favorite query methods are available
const $form = await getByTestId($document, 'my-form')
// returned elements are ElementHandles too!
const $email = await getByLabelText($form, 'Email')
// interact with playwright like usual
await $email.type('playwright@example.com')
// waiting works too!
await wait(() => getByText($document, 'Loading...'))
```

A little too un-playwright for you? We've got prototype-mucking covered too :)

```js
const {webkit} = require('playwright') // or 'firefox' or 'chromium'
require('playwright-testing-library/extend')

const browser = await webkit.launch()
const page = await browser.newPage()

// getDocument is added to prototype of Page
const $document = await page.getDocument()
// query methods are added directly to prototype of ElementHandle
const $form = await $document.getByTestId('my-form')
// destructing works if you explicitly call getQueriesForElement
const {getByText} = $form.getQueriesForElement()
// ...
```

## API

Unique methods, not part of `@testing-library/dom`

- `getDocument(page: playwright.Page): ElementHandle` - get an ElementHandle for the document
- `wait(conditionFn: () => {}): Promise<{}>` - wait for the condition to not throw (wrapper around `waitForExpect`)

---

[@testing-library/dom API](https://github.com/testing-library/dom-testing-library#usage). All `get*`/`query*` methods are supported.

- `getQueriesForElement(handle: ElementHandle): ElementHandle & QueryUtils` - extend the input object with the query API and return it
- `getNodeText(handle: ElementHandle): Promise<string>` - get the text content of the element
- `queries: QueryUtils` - the query subset of `@testing-library/dom` exports
  - `queryByPlaceholderText`
  - `queryAllByPlaceholderText`
  - `getByPlaceholderText`
  - `getAllByPlaceholderText`
  - `queryByText`
  - `queryAllByText`
  - `getByText`
  - `getAllByText`
  - `queryByLabelText`
  - `queryAllByLabelText`
  - `getByLabelText`
  - `getAllByLabelText`
  - `queryByAltText`
  - `queryAllByAltText`
  - `getByAltText`
  - `getAllByAltText`
  - `queryByTestId`
  - `queryAllByTestId`
  - `getByTestId`
  - `getAllByTestId`
  - `queryByTitle`
  - `queryAllByTitle`
  - `getByTitle`
  - `getAllByTitle`

## Known Limitations

- `waitForElement` method is not exposed. Playwright has its own set of wait utilities that somewhat conflict with the style used in `@testing-library/dom`. See [#3](https://github.com/testing-library/playwright-testing-library/issues/3).
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
