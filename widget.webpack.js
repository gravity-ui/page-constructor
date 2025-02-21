/* eslint-env node */
const fs = require('fs');
const path = require('path');

const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');

const SRC_PATH = path.resolve('src');
const NODE_MODULES_PATH = path.resolve('node_modules');
const WIDGET_SRC_PATH = path.resolve(SRC_PATH, 'widget');
const WIDGET_RESULT_PATH = path.resolve(__dirname, 'widget');
const WIDGET_BUNDLE_FILENAME = 'index.js';

module.exports = {
    entry: {
        index: path.resolve(WIDGET_SRC_PATH, 'index.tsx'),
    },
    output: {
        path: WIDGET_RESULT_PATH,
        filename: WIDGET_BUNDLE_FILENAME,
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.m?[jt]sx?$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(scss|css)$/,
                include: [
                    path.resolve(NODE_MODULES_PATH, '@diplodoc/transform'),
                    path.resolve(NODE_MODULES_PATH, '@gravity-ui/components'),
                    path.resolve(NODE_MODULES_PATH, '@gravity-ui/uikit'),
                    path.resolve(NODE_MODULES_PATH, 'swiper'),
                    path.resolve(__dirname, 'styles'),
                    SRC_PATH,
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
                compiler.hooks.assetEmitted.tap('InjectWidgetBundlePlugin', (_, {content}) => {
                    const script = JSON.stringify(content.toString());
                    const fileContent = `export default ${script};`;

                    fs.writeFileSync(
                        path.resolve(WIDGET_RESULT_PATH, WIDGET_BUNDLE_FILENAME),
                        fileContent,
                    );
                });
            },
        },
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
            }),
        ],
    },
};
