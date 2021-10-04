#!/usr/bin/env node
/* eslint-disable no-console */

const process = require('process')

const {getPackage} = require('./package')

const run = async () => {
  const package = await getPackage()

  process.stdout.write(JSON.stringify(package.version !== '0.0.0-semantically-released'))
}

run()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
