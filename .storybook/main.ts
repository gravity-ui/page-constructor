const {join, resolve} = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');
const customAlias = {
    widget: resolve(__dirname, '../widget'),
};
const config = {
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    docs: {
        autodocs: true,
    },
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
    addons: [
        '@storybook/preset-scss',
        {
            name: '@storybook/addon-essentials',
            options: {
                backgrounds: false,
            },
        },
        '@storybook/addon-knobs',
        './addons/addon-yaml/preset',
    ],
    webpackFinal: (storybookBaseConfig: any) => {
        // storybookBaseConfig.plugins.push(new WebpackShellPlugin({
        //   onBuildStart: ['npm run build:widget']
        // }));
        storybookBaseConfig.resolve.alias = {
            ...(storybookBaseConfig.resolve?.alias || {}),
            ...customAlias,
        };
        return storybookBaseConfig;
    },
};
module.exports = config;
