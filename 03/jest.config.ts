import type { JestConfigWithTsJest } from 'ts-jest';

export const configuration: JestConfigWithTsJest = {
  coverageReporters: ['text'],
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
  },
  verbose: true,
};

export default configuration;
