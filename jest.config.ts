const config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ['<rootDir>/**/__tests__/**/*.test.{ts,tsx}'],
    testPathIgnorePatterns: ['/node_modules/'],
    coverageDirectory: './test-reports',
    coveragePathIgnorePatterns: ['node_modules', 'src/types'],
    reporters: ['default', 'jest-junit'],
    globals: { 'ts-jest': { diagnostics: false } },
};

export default config;
