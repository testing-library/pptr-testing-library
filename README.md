# pptr-testing-library

[![NPM Package](https://badge.fury.io/js/pptr-testing-library.svg)](https://www.npmjs.com/package/pptr-testing-library)
[![Build Status](https://travis-ci.org/patrickhulce/pptr-testing-library.svg?branch=master)](https://travis-ci.org/patrickhulce/pptr-testing-library)
[![Coverage Status](https://coveralls.io/repos/github/patrickhulce/pptr-testing-library/badge.svg?branch=master)](https://coveralls.io/github/patrickhulce/pptr-testing-library?branch=master)
[![Dependencies](https://david-dm.org/patrickhulce/pptr-testing-library.svg)](https://david-dm.org/patrickhulce/pptr-testing-library)

[puppeteer](https://github.com/GoogleChrome/puppeteer) + [dom-testing-library](https://github.com/kentcdodds/dom-testing-library) = 💖

All your favorite user-centric querying functions from react-testing-library/dom-testing-library available from Puppeteer!

## Install

`npm install --save-dev pptr-testing-library`

## Use

```js
const puppeteer = require('puppeteer')
require('pptr-testing-library/extend')

const browser = await puppeteer.launch()
const page = await browser.newPage()

// Grab ElementHandle for document, this convenience method added by pptr-testing-library/extend
const $document = await page.getDocument()

// query methods are added to prototype of ElementHandle
const $form = await $document.getByTestId('my-form')
// returned elements are ElementHandles too!
const $email = await $form.getByLabelText('Email')
// interact with puppeteer like usual
await $email.type('pptr@example.com')
```

For those less enthused by prototype manipulation, we've got you covered too.

```js
const puppeteer = require('puppeteer')
const {getDocument, queries} = require('pptr-testing-library')

const browser = await puppeteer.launch()
const page = await browser.newPage()

const $document = await getDocument(page)
const $form = await queries.getByTestId($document, 'my-form')
// ...
```

## API

Puppeteer-specific methods

- `getDocument(page: puppeteer.Page): ElementHandle` - get an ElementHandle for the document

---

[dom-testing-libary API](https://github.com/kentcdodds/dom-testing-library#usage). All `get*`/`query*` methods are supported.

- `getQueriesForElement(handle: ElementHandle): ElementHandle & QueryUtils` - extend the input object with the query API and return it
- `wait(conditionFn: () => {}): Promise<{}>` - wait for the condition to not throw
- `getNodeText(handle: ElementHandle): Promise<string>` - get the text content of the element
- `queries: QueryUtils` - the query subset of `dom-testing-library` exports
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

- `waitForElement` method is not exposed. Puppeteer has its own set of wait utilities that somewhat conflict with the style used in `dom-testing-library`. See [issue](https://github.com/patrickhulce/pptr-testing-library/issues/3).
- `fireEvent` method is not exposed, use puppeteer's built-ins instead.

## Special Thanks

[dom-testing-library](https://github.com/kentcdodds/dom-testing-library) of course!

## LICENSE

MIT
