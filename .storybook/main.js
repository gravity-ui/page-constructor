const path = require('path');

const root = path.join(__dirname, '..');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const {ConfigBuilder, javascript, styles, assets} = require('@yandex-data-ui/webpack-levels');

const srcRoot = path.resolve(root, 'src');
const stylesRoot = path.resolve(root, 'styles');
const assetsRoot = path.resolve(root, 'assets');

const chartKitRoot = path.resolve(root, 'node_modules/@yandex-data-ui/chartkit');
const ymapsRoot = path.resolve(root, 'node_modules/@yandex-data-ui/ymaps-polygonmap');
const dt100Root = path.resolve(root, 'node_modules/@yandex-data-ui/dt100');

const storybookRoot = path.resolve(root, '.storybook');

const ruleIncludes = [
    srcRoot,
    stylesRoot,
    assetsRoot,

    chartKitRoot,
    ymapsRoot,
    dt100Root,

    storybookRoot,
];

const config = new ConfigBuilder();

config
    .apply(
        javascript({
            bem: false,
            typescript: true,
            reactHotLoader: false,
            threadLoader: false, // https://github.com/storybookjs/storybook/issues/9515#issuecomment-607319175
            ruleIncludes,
        }),
    )
    .apply(
        styles({
            ruleIncludes,
        }),
    )
    .apply(
        assets({
            ruleIncludes,
            ruleExcludes: [path.resolve(assetsRoot, 'icons')],
        }),
    )
    .module.addRule({
        test: /\.svg$/,
        include: [path.resolve(assetsRoot, 'icons')],
        loader: 'svg-sprite-loader',
        options: {
            extract: true,
            spriteFilename: 'sprite-[hash:6].svg',
        },
    })
    .plugins.addPlugin(new SpriteLoaderPlugin({plainSprite: true}));

const projectConfig = config.build();

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-essentials', '@storybook/addon-knobs'],
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

    webpackFinal: async (storybookBaseConfig) => {
        storybookBaseConfig.module.rules = projectConfig.module.rules;

        storybookBaseConfig.plugins.push(...projectConfig.plugins);
        // Remove webpack-levels plugin for ts check, storybook already add it.
        storybookBaseConfig.plugins.splice(-3, 1);

        storybookBaseConfig.module.rules.push({
            test: /\.md$/,
            include: [root],
            use: [{loader: 'html-loader'}, {loader: 'markdown-loader'}],
        });
        // aliases to build ChartKit based on current @yandex-data-ui/common
        // storybookBaseConfig.resolve.alias['@yandex-data-ui/common/assets'] = assetsRoot;
        // storybookBaseConfig.resolve.alias['@yandex-data-ui/common'] = srcRoot;

        // без этого fileName в context.parameters в продакшн сборке становится цифрой, а не путём, и ссылку на сорсы не сформировать
        storybookBaseConfig.optimization.moduleIds = 'named';
        return storybookBaseConfig;
    },

    // Ссылки на связанные сторибуки
    // FIXME: пока скрыли из-за баги в Сафари DATAUI-894
    // refs: (_, {configType}) => {
    //     if (configType === 'PRODUCTION') {
    //         // внешние сторибуки показывать только в продакшн моде
    //         return {
    //             navigation: {
    //                 title: '🔗 Navigation',
    //                 url: 'https://s3.mds.yandex.net/cloud-storybooks/master/navigation/',
    //             },
    //             'infra-components': {
    //                 title: '🎨 Infra components',
    //                 url: 'https://s3.mds.yandex.net/cloud-storybooks/master/infra-components/',
    //             },
    //         };
    //     }

    //     return {};
    // },
};
