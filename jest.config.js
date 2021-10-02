const config = require('@hover/javascript/jest')

module.exports = {
  ...config,
  collectCoverageFrom: ['**/*.ts', '!**/*.d.ts'],
  coverageThreshold: {},
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testMatch: ['<rootDir>/test/standalone/*.+(test.js|test.jsx|test.ts|test.tsx)'],
  testTimeout: 30000,
}
