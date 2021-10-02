import {API, FileInfo} from 'jscodeshift'

const transformer = (file: FileInfo, {jscodeshift: j}: API) =>
  j(file.source)
    .find(j.ImportDeclaration)
    .find(j.StringLiteral)
    .filter(path => path.value.value === 'playwright')
    .replaceWith(() => j.stringLiteral('@playwright/test'))
    .toSource()

export default transformer
