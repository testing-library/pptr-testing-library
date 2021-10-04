#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs/promises')
const path = require('path')
const process = require('process')

const PACKAGE = path.join(__dirname, '..', 'package.json')

const run = async () => {
  const package = JSON.parse(await fs.readFile(PACKAGE, {encoding: 'utf-8'}))

  process.stdout.write(JSON.stringify(package.version !== '0.0.0-semantically-released'))
}

run()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
