import * as queries from '@testing-library/dom/dist/queries'
import {getNodeText} from '@testing-library/dom'

window['__dom_testing_library__'] = {...queries, getNodeText}
