const env = {
  development: {
    verbose: true,
    bail: false,
    notify: true
  },
  test: {
    verbose: false,
    bail: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.js', '!src/config/*', '!src/**/index.js'],
    coverageDirectory: 'coverage',
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80
      }
    }
  }
}

const config = {
  setupFiles: ['./jest-setup.js'],
  setupTestFrameworkScriptFile: './node_modules/jasmine-expect/index.js',
  unmockedModulePathPatterns: ['jasmine-expect']
}

module.exports = Object.assign({}, config, env[process.env.ENVIRONMENT])
