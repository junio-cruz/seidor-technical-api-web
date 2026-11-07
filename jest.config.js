module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main**/*.ts'],
  coverageDirectory: './coverage',
  coverageReporters: ['text-summary', 'lcov'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          module: 'commonjs',
          moduleResolution: 'node',
        },
      },
    ],
  },
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
};
