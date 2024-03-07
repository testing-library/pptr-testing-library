module.exports = {
  collectCoverageFrom: ['**/*.ts', '!**/*.d.ts'],
  transform: {
    '\\.ts$': ['ts-jest', {diagnostics: false}],
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/*.test.ts'],
}
