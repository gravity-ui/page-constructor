const {join, resolve} = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');

const customAlias = {
    widget: resolve(__dirname, '../widget'),
};

const config = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: [
        '@storybook/preset-scss',
        {name: '@storybook/addon-essentials', options: {backgrounds: false}},
        '@storybook/addon-knobs',
        './addons/addon-yaml/preset',
    ],
    typescript: {
        check: true,
        checkOptions: {},
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            setDisplayName: false,
            shouldExtractLiteralValuesFromEnum: true,
            compilerOptions: {
                allowSyntheticDefaultImports: true,
                esModuleInterop: true,
            },
        },
    },
    webpackFinal: (storybookBaseConfig: any) => {
        storybookBaseConfig.module.rules.push({
            test: /\.md$/,
            include: [join(__dirname, '..')],
            use: [{loader: 'markdown-loader'}],
        });

        // to turn fileName in context.parameters into path form number in production bundle
        storybookBaseConfig.optimization.moduleIds = 'named';

        storybookBaseConfig.plugins.push(
            new WebpackShellPlugin({
                onBuildStart: ['npm run build:widget'],
            }),
        );

        storybookBaseConfig.resolve.alias = {
            ...(storybookBaseConfig.resolve?.alias || {}),
            ...customAlias,
        };

        return storybookBaseConfig;
    },
};

module.exports = config;
