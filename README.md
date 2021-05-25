# pptr-testing-library

[![NPM Package](https://badge.fury.io/js/pptr-testing-library.svg)](https://www.npmjs.com/package/pptr-testing-library)
![GitHub Actions status](https://github.com/testing-library/pptr-testing-library/actions/workflows/ci.yml/badge.svg?branch=main)
[![Dependencies](https://david-dm.org/testing-library/pptr-testing-library.svg)](https://david-dm.org/testing-library/pptr-testing-library)
[![Discord](https://img.shields.io/discord/723559267868737556.svg?color=7389D8&labelColor=6A7EC2&logo=discord&logoColor=ffffff)](https://discord.gg/testing-library)

[puppeteer](https://github.com/GoogleChrome/puppeteer) + [@testing-library/dom](https://github.com/testing-library/dom-testing-library) = 💖

All your favorite user-centric querying functions from @testing-library/react & @testing-library/library available from Puppeteer!

## Install

`npm install --save-dev pptr-testing-library`

## Use

```js
const puppeteer = require('puppeteer')
const {getDocument, queries, waitFor} = require('pptr-testing-library')

const {getByTestId, getByLabelText} = queries

const browser = await puppeteer.launch()
const page = await browser.newPage()

// Grab ElementHandle for document
const $document = await getDocument(page)
// Your favorite query methods are available
const $form = await getByTestId($document, 'my-form')
// returned elements are ElementHandles too!
const $email = await getByLabelText($form, 'Email')
// interact with puppeteer like usual
await $email.type('pptr@example.com')
// waiting works too!
await waitFor(() => getByText($document, 'Loading...'))
```

A little too un-puppeteer for you? We've got prototype-mucking covered too :)

```js
const puppeteer = require('puppeteer')
require('pptr-testing-library/extend')

const browser = await puppeteer.launch()
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

- `getDocument(page: puppeteer.Page): ElementHandle` - get an ElementHandle for the document
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
  - `queryByRole`
  - `queryAllByRole`
  - `getByRole`
  - `getAllByRole`
  - `findByRole`
  - `findAllByRole`
  - `queryByDisplayValue`,
  - `queryAllByDisplayValue`,
  - `getByDisplayValue`,
  - `getAllByDisplayValue`,
  - `findByDisplayValue`,
  - `findAllByDisplayValue`,

## Known Limitations

- Async utilities `waitForElement`, `waitForElementToBeRemoved` and `waitForDomChange` are not exposed. Consider using a `find*` query.
- `fireEvent` method is not exposed, use puppeteer's built-ins instead.
- `expect` assertion extensions are not available.

## Special Thanks

[@testing-library/dom](https://github.com/testing-library/dom-testing-library) of course!

## Related Puppeteer Test Utilities

- [jest-puppeteer](https://github.com/smooth-code/jest-puppeteer)
- Yours! Name TBD, PR welcome ;)

## LICENSE

MIT
