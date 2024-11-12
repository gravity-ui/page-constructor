/* eslint-env node */
// Schema generation has client dependencies, to run it on the node we bundle it.
const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');

const SRC_PATH = path.resolve('src');
const SCHEMA_SRC_PATH = path.resolve(SRC_PATH, 'schema');
const SCHEMA_RESULT_PATH = path.resolve(__dirname, 'schema');
const SCHEMA_BUNDLE_FILENAME = 'index.js';

module.exports = {
    entry: path.resolve(SCHEMA_SRC_PATH, 'index.ts'),
    output: {
        path: SCHEMA_RESULT_PATH,
        filename: SCHEMA_BUNDLE_FILENAME,
        library: 'library',
        libraryTarget: 'umd',
    },
    mode: 'production',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: 'null-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
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
