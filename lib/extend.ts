import {getTestingUtilsForDocument, extendObjectWithTestingUtils} from '.'

const Page = require('puppeteer/lib/Page.js')
const ElementHandle = require('puppeteer/lib/ElementHandle.js')

Page.prototype.getTestingUtilsForDocument = getTestingUtilsForDocument

extendObjectWithTestingUtils(ElementHandle.prototype)
