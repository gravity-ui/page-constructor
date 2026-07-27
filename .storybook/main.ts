import {resolve} from 'path';
import WebpackShellPluginNext from 'webpack-shell-plugin-next';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

const ASSET_PATH = 'story-assets';
const PREVIEW_DEST_PATH = process.env.PREVIEW_DEST_PATH;

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
                actions: false,
            },
        },
        './addons/yaml-addon/preset',
        './addons/theme-addon/register.tsx',
        '@storybook/addon-mdx-gfm',
        '@storybook/addon-webpack5-compiler-babel',
    ],

    webpackFinal: (storybookBaseConfig: any) => {
        storybookBaseConfig.plugins.push(
            new MonacoWebpackPlugin(),
            new WebpackShellPluginNext({
                onBuildStart: {
                    scripts: ['npm run build:widget'],
                    blocking: false,
                },
            }),
        );

        storybookBaseConfig.resolve.alias = {
            ...(storybookBaseConfig.resolve?.alias || {}),
            ...customAlias,
        };

        // Import README.md files as raw strings so each block's docs page
        // (.mdx) can render the README via <Markdown> instead of duplicating
        // the content. (.mdx files are unaffected — they end in .mdx, not .md.)
        storybookBaseConfig.module.rules.push({
            test: /\.md$/u,
            exclude: [/node_modules/u],
            type: 'asset/source',
        });

        // main and branch storybook previews are deployed in subfolders
        // so we need to add subfolder prefix to stories asset static path:
        if (PREVIEW_DEST_PATH) {
            storybookBaseConfig.module.rules.push({
                test: /data\.json$/,
                loader: 'string-replace-loader',
                options: {
                    search: `/${ASSET_PATH}/`,
                    replace: `${PREVIEW_DEST_PATH}/${ASSET_PATH}/`,
                    flags: 'g',
                },
            });
        }

        return storybookBaseConfig;
    },

    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },
};

export default config;
