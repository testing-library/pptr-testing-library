#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs/promises')

const {PACKAGE, getPackage} = require('./package')

const run = async () => {
  const package = await getPackage()
  const modifiedPackage = {
    ...package,
    name: '@playwright-testing-library/test',
  }

  await fs.writeFile(PACKAGE, JSON.stringify(modifiedPackage, undefined, 2))
}

run()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
