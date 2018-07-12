module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  coverageThreshold: {
    global: {
      statements: 60,
      branches: 45,
      functions: 70,
      lines: 60
    }
  },
  testPathIgnorePatterns: ['/node_modules/', '/lib/'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  setupFiles: ['./test/setup.js']
};
