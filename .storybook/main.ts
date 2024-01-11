import {resolve} from 'path';
import WebpackShellPluginNext from 'webpack-shell-plugin-next';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

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
    stories: ['./stories/**/*.mdx', '../src/**/__stories__/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
    staticDirs: ['./public'],
    addons: [
        '@storybook/preset-scss',
        {
            name: '@storybook/addon-essentials',
            options: {
                backgrounds: false,
            },
        },
        '@storybook/addon-knobs',
        './addons/yaml-addon/preset',
        './addons/theme-addon/register.tsx',
    ],
    webpackFinal: (storybookBaseConfig: any) => {
        storybookBaseConfig.plugins.push(
            new MonacoWebpackPlugin(),
            new WebpackShellPluginNext({
                onBuildStart: {
                    scripts: ['npm run build:widget'],
                    blocking: true,
                },
            }),
        );
        storybookBaseConfig.resolve.alias = {
            ...(storybookBaseConfig.resolve?.alias || {}),
            ...customAlias,
        };
        return storybookBaseConfig;
    },
};

export default config;
