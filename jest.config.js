const config = require('@hover/javascript/jest')

module.exports = {
  ...config,
  collectCoverageFrom: ['**/*.ts', '!**/*.d.ts'],
  coverageThreshold: {},
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testTimeout: 15000,
}
