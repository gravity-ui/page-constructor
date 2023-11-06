module.exports = {
    verbose: true,
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
    rootDir: '.',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {tsconfig: './tsconfig.test.json'}],
    },
    transformIgnorePatterns: ['node_modules/(?!(@gravity-ui|react-github-btn|tinygesture)/)'],
    coverageDirectory: './coverage',
    collectCoverageFrom: [
        'src/blocks/**/*.{ts,tsx,js,jsx}',
        'src/components/**/*.{ts,tsx,js,jsx}',
        'src/containers/**/*.{ts,tsx,js,jsx}',
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
    testPathIgnorePatterns: [
        '<rootDir>/node_modules',
        '<rootDir>/build',
        '<rootDir>/server',
        '<rootDir>/.storybook',
    ],
};
