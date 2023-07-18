/* eslint-env node */
const fs = require('fs');
const path = require('path');

const autoprefixer = require('autoprefixer');

const SRC_PATH = path.resolve('src');
const IFRAME_SRC_PATH = path.resolve(SRC_PATH, 'editor/iframe');
const IFRAME_RESULT_PATH = path.resolve(__dirname, 'iframe');
const NODE_MODULES_PATH = path.resolve('node_modules');
const IFRAME_BUNDLE_FILENAME = 'index.js';

module.exports = {
    entry: {
        index: path.resolve(IFRAME_SRC_PATH, 'index.tsx'),
    },
    output: {
        path: IFRAME_RESULT_PATH,
        filename: IFRAME_BUNDLE_FILENAME,
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@gravity-ui/babel-preset',
                                {
                                    env: {modules: false},
                                    runtime: {useESModules: true},
                                    typescript: true,
                                    react: {},
                                },
                            ],
                        ],
                    },
                },
            },
            {
                test: /\.(scss|css)$/,
                include: [
                    SRC_PATH,
                    path.resolve(__dirname, 'styles'),
                    path.resolve(NODE_MODULES_PATH, '@doc-tools/transform'),
                    path.resolve(NODE_MODULES_PATH, '@gravity-ui/uikit'),
                ],
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {plugins: [autoprefixer()]},
                        },
                    },
                    'resolve-url-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        {
            apply: (compiler) => {
                compiler.hooks.assetEmitted.tap('InjectIframeBundlePlugin', (_, contentBuffer) => {
                    const script = JSON.stringify(contentBuffer.toString());
                    const fileContent = `export default ${script};`;

                    fs.writeFileSync(
                        path.resolve(IFRAME_RESULT_PATH, IFRAME_BUNDLE_FILENAME),
                        fileContent,
                    );
                });
            },
        },
    ],
};
