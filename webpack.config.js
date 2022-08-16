const {resolve} = require('path');
const autoprefixer = require('autoprefixer');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: resolve(__dirname, 'build'),
        filename: '[name].js',
        library: {
            name: 'PageConstructor',
            type: 'umd',
        },
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                include: [resolve('src'), resolve('./node_modules/@doc-tools/components')],
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            'data-ui',
                            {
                                env: {modules: false},
                                runtime: {useESModules: true},
                                typescript: true,
                            },
                        ],
                    ],
                    plugins: ['lodash'],
                    sourceType: 'unambiguous',
                },
                exclude: /node_modules/,
            },
            {
                test: /\.s?css$/,
                sideEffects: true,
                include: [
                    resolve('./src'),
                    resolve('./styles'),
                    resolve('./node_modules/@doc-tools/transform'),
                    resolve('./node_modules/@doc-tools/components'),
                    resolve('./node_modules/@yandex-cloud/uikit'),
                ],
                use: [
                    MiniCSSExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {plugins: [autoprefixer()]},
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                sourceMap: true,
                                includePaths: [resolve('./styles'), resolve('./src')],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                include: [resolve('./assets/images')],
                exclude: [
                    resolve('./assets/icons'),
                    resolve('./node_modules/@doc-tools/components/assets/icons'),
                ],
                loader: 'url-loader',
                options: {
                    limit: 4096,
                    name: 'assets/img/[name].[hash:8].[ext]',
                    fallback: 'file-loader',
                    publicPath: '/build/assets',
                },
            },
            {
                test: /\.svg$/,
                include: [resolve('./assets/icons')],
                exclude: [resolve('./node_modules/@doc-tools/components/assets/icons')],
                loader: 'svg-sprite-loader',
            },
            {
                test: /\.svg$/,
                include: [resolve('./node_modules/@doc-tools/components/assets/icons')],
                loader: 'react-svg-loader',
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    },
    plugins: [
        new WebpackManifestPlugin({
            fileName: 'manifest.json',
            publicPath: '/build',
        }),
        new MiniCSSExtractPlugin({
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[name].[contenthash:8].css',
        }),
    ],
};
