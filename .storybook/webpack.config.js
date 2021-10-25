'use strict';
const path = require('path');
const {
    ConfigBuilder,
    javascript,
    styles,
    optimize,
} = require('@yandex-data-ui/webpack-levels');

const srcRoot = path.resolve(__dirname, '..', 'src');
const stylesRoot = path.resolve(__dirname, '..', 'styles');
const commonRoot = path.resolve(__dirname, '..', 'node_modules/@yandex-data-ui/common');
const storybookRoot = path.resolve(__dirname, '..', '.storybook');
const storybookHost = path.resolve(__dirname, '..', 'node_modules/storybook-host');

const ruleIncludes = [
    srcRoot,
    stylesRoot,
    commonRoot,
    storybookRoot,
    storybookHost,
];

const config = new ConfigBuilder();

config
    .apply(
        javascript({
            bem: false,
            typescript: true,
            reactHotLoader: false,
            ruleIncludes,
            forkTsChecker: {
                typescript: require.resolve('typescript'),
            },
        }),
    )
    .apply(
        styles({
            ruleIncludes,
        }),
    )
    .apply(optimize())
    .resolve.addModules(srcRoot);

const projectConfig = config.build();

module.exports = ({config: storybookBaseConfig}) => {
    storybookBaseConfig.module = projectConfig.module;
    storybookBaseConfig.resolve = projectConfig.resolve;

    // storybook-readme
    storybookBaseConfig.module.rules.push({
        test: /\.md$/,
        include: [path.resolve(__dirname, '..')],
        use: [{loader: 'html-loader'}, {loader: 'markdown-loader'}],
    });

    // prevent css tree-shaking
    storybookBaseConfig.module.rules.forEach((rule) => {
        if (rule.test.test('.css')) {
            rule.sideEffects = true;
        }
    });

    storybookBaseConfig.plugins.push(...projectConfig.plugins);

    return storybookBaseConfig;
};
