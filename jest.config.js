module.exports = {
    verbose: true,
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
    rootDir: '.',
    transform: {
        '^.+\\.[jt]sx?$': 'ts-jest',
    },
    transformIgnorePatterns: ['node_modules/(?!(@gravity-ui)/)'],
    coverageDirectory: './coverage',
    collectCoverageFrom: [
        'src/blocks/**/*.{ts,tsx,js,jsx}',
        'src/components/**/*.{ts,tsx,js,jsx}',
        'src/containers/**/*.{ts,tsx,js,jsx}',
        '!src/demo/**/*',
        '!**/__stories__/**/*',
        '!**/*/*.stories.{ts,tsx}',
    ],
    testEnvironment: '<rootDir>/test-utils/custom-environment.ts',
    setupFiles: ['<rootDir>/test-utils/setup-tests.ts'],
    setupFilesAfterEnv: ['<rootDir>/test-utils/setup-tests-after.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'jest-transform-css',
    },
    testMatch: ['**/*.test.[jt]s?(x)'],
};
