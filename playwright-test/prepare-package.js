#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs/promises')
const path = require('path')

const PACKAGE = path.join(__dirname, '..', 'package.json')

const run = async () => {
  const package = JSON.parse(await fs.readFile(PACKAGE, {encoding: 'utf-8'}))

  const modifiedPackage = {
    ...package,
    name: '@playwright-testing-library/test',
    version: '0.0.0-semantically-released',
  }

  await fs.writeFile(PACKAGE, JSON.stringify(modifiedPackage, undefined, 2))
}

run()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
