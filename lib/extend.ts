import {extendObjectWithTestingUtils, getDocument} from '.'

const Page = require('puppeteer/lib/Page.js') // tslint:disable-line
const ElementHandle = require('puppeteer/lib/ElementHandle.js') // tslint:disable-line

Page.prototype.document = getDocument

extendObjectWithTestingUtils(ElementHandle.prototype)
