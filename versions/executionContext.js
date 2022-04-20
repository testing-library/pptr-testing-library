"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path = require("path");
const wait_for_expect_1 = require("wait-for-expect");
const domLibraryAsString = fs_1.readFileSync(path.join(__dirname, '../dom-testing-library.js'), 'utf8').replace(/process.env/g, '{}');
/* istanbul ignore next */
function mapArgument(o) {
    return convertProxyToRegExp(o, 0);
}
/* istanbul ignore next */
function convertProxyToRegExp(o, depth) {
    if (typeof o !== 'object' || !o || depth > 2)
        return o;
    if (!o.__regex || typeof o.__flags !== 'string') {
        const copy = Object.assign({}, o);
        for (const key of Object.keys(copy)) {
            copy[key] = convertProxyToRegExp(copy[key], depth + 1);
        }
        return copy;
    }
    return new RegExp(o.__regex, o.__flags);
}
function convertRegExpToProxy(o, depth) {
    if (typeof o !== 'object' || !o || depth > 2)
        return o;
    // Support the cross-environment use case where `instanceof` is not sufficient, see https://github.com/testing-library/pptr-testing-library/pull/64
    if (Object.prototype.toString.call(o) !== '[object RegExp]') {
        const copy = Object.assign({}, o);
        for (const key of Object.keys(copy)) {
            copy[key] = convertRegExpToProxy(copy[key], depth + 1);
        }
        return copy;
    }
    return { __regex: o.source, __flags: o.flags };
}
let domLibraryToExecute = domLibraryAsString;
function getDelegateFnBodyToExecuteInPage(includeDomTestingLib) {
    return `
    ${includeDomTestingLib ? domLibraryToExecute : ""}
    ${convertProxyToRegExp.toString()}
    
    const mappedArgs = args.map(${mapArgument.toString()});
    const moduleWithFns = fnName in __dom_testing_library__ ?
      __dom_testing_library__ :
      __dom_testing_library__.__moduleExports;
    return moduleWithFns[fnName](container, ...mappedArgs);
  `;
}
async function createElementHandleArray(handle) {
    const lengthHandle = await handle.getProperty('length');
    if (!lengthHandle)
        throw new Error(`Failed to assess length property`);
    const length = (await lengthHandle.jsonValue());
    const elements = [];
    for (let i = 0; i < length; i++) {
        const jsElement = await handle.getProperty(i.toString());
        if (!jsElement)
            throw new Error(`Failed to assess ${i.toString()} property`);
        const element = await createElementHandle(jsElement);
        if (element)
            elements.push(element);
    }
    return elements;
}
async function createElementHandle(handle) {
    const element = handle.asElement();
    if (element)
        return element;
    await handle.dispose();
    return null; // tslint:disable-line
}
async function covertToElementHandle(handle, asArray) {
    return asArray ? createElementHandleArray(handle) : createElementHandle(handle);
}
function processNodeText(handles) {
    return handles.containerHandle
        .executionContext()
        .evaluate(handles.evaluateFn, handles.containerHandle, 'getNodeText');
}
async function processQuery(handles) {
    const { containerHandle, evaluateFn, fnName, argsToForward } = handles;
    try {
        const handle = await containerHandle
            .executionContext()
            .evaluateHandle(evaluateFn, containerHandle, fnName, ...argsToForward);
        return await covertToElementHandle(handle, fnName.includes('All'));
    }
    catch (err) {
        err.message = err.message.replace('[fnName]', `[${fnName}]`);
        err.stack = err.stack.replace('[fnName]', `[${fnName}]`);
        throw err;
    }
}
const executionContextInit = new WeakMap();
function createDelegateFor(fnName, contextFn, processHandleFn) {
    // @ts-ignore
    processHandleFn = processHandleFn || processQuery;
    return async function (...args) {
        // @ts-ignore
        const containerHandle = contextFn ? contextFn.apply(this, args) : this;
        const executionContext = containerHandle.executionContext();
        const shouldIncludeTestingLib = !executionContextInit.has(executionContext);
        if (shouldIncludeTestingLib) {
            executionContextInit.set(executionContext, true);
        }
        // @ts-ignore
        const evaluateFn = new Function("container, fnName, ...args", getDelegateFnBodyToExecuteInPage(shouldIncludeTestingLib));
        let argsToForward = args;
        // Remove the container from the argsToForward since it's always the first argument
        if (containerHandle === args[0]) {
            argsToForward = argsToForward.slice(1);
        }
        // Convert RegExp to a special format since they don't serialize well
        argsToForward = argsToForward.map(convertRegExpToProxy);
        return processHandleFn({ fnName, containerHandle, evaluateFn, argsToForward });
    };
}
async function getDocument(_page) {
    // @ts-ignore
    const page = _page || this;
    const documentHandle = await page.mainFrame().evaluateHandle('document');
    const document = documentHandle.asElement();
    if (!document)
        throw new Error('Could not find document');
    return document;
}
exports.getDocument = getDocument;
function wait(callback, { timeout = 4500, interval = 50 } = {}) {
    return wait_for_expect_1.default(callback, timeout, interval);
}
exports.wait = wait;
exports.waitFor = wait;
function configure(options) {
    if (!options) {
        return;
    }
    const { testIdAttribute } = options;
    if (testIdAttribute) {
        domLibraryToExecute = domLibraryAsString.replace(/testIdAttribute: (['|"])data-testid(['|"])/g, `testIdAttribute: $1${testIdAttribute}$2`);
    }
}
exports.configure = configure;
function getQueriesForElement(object, contextFn) {
    const o = object;
    if (!contextFn)
        contextFn = () => o;
    const functionNames = [
        'queryByPlaceholderText',
        'queryAllByPlaceholderText',
        'getByPlaceholderText',
        'getAllByPlaceholderText',
        'findByPlaceholderText',
        'findAllByPlaceholderText',
        'queryByText',
        'queryAllByText',
        'getByText',
        'getAllByText',
        'findByText',
        'findAllByText',
        'queryByLabelText',
        'queryAllByLabelText',
        'getByLabelText',
        'getAllByLabelText',
        'findByLabelText',
        'findAllByLabelText',
        'queryByAltText',
        'queryAllByAltText',
        'getByAltText',
        'getAllByAltText',
        'findByAltText',
        'findAllByAltText',
        'queryByTestId',
        'queryAllByTestId',
        'getByTestId',
        'getAllByTestId',
        'findByTestId',
        'findAllByTestId',
        'queryByTitle',
        'queryAllByTitle',
        'getByTitle',
        'getAllByTitle',
        'findByTitle',
        'findAllByTitle',
        'queryByRole',
        'queryAllByRole',
        'getByRole',
        'getAllByRole',
        'findByRole',
        'findAllByRole',
        'queryByDisplayValue',
        'queryAllByDisplayValue',
        'getByDisplayValue',
        'getAllByDisplayValue',
        'findByDisplayValue',
        'findAllByDisplayValue',
    ];
    functionNames.forEach(functionName => {
        o[functionName] = createDelegateFor(functionName, contextFn);
    });
    o.getQueriesForElement = () => getQueriesForElement(o, () => o);
    o.getNodeText = createDelegateFor('getNodeText', contextFn, processNodeText);
    return o;
}
exports.getQueriesForElement = getQueriesForElement;
exports.within = getQueriesForElement;
// @ts-ignore
exports.queries = {};
getQueriesForElement(exports.queries, el => el);
//# sourceMappingURL=index.js.map