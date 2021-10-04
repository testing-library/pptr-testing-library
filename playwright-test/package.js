const fs = require('fs/promises')
const path = require('path')

const PACKAGE = path.join(__dirname, '..', 'package.json')

const getPackage = async () => JSON.parse(await fs.readFile(PACKAGE, {encoding: 'utf-8'}))

module.exports = {PACKAGE, getPackage}
