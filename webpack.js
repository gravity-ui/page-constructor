/* eslint-env node */
const fs = require('fs');
const path = require('path');

const autoprefixer = require('autoprefixer');

const BUILD_CLIENT_DIR = path.resolve('build');
const ESM_DIR = 'esm';
// const CJS_DIR = 'cjs';

const modulesDir = 'node_modules';

module.exports = {
    entry: {
        index: `${BUILD_CLIENT_DIR}/${ESM_DIR}/editor/iframe/index.js`,
    },
    output: {
        path: path.resolve(__dirname, `${BUILD_CLIENT_DIR}/${ESM_DIR}/editor/iframe`),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@gravity-ui/babel-preset',
                                {
                                    env: {modules: false},
                                    runtime: {useESModules: true},
                                },
                            ],
                        ],
                    },
                },
            },
            {
                test: /\.(scss|css)$/,
                include: [
                    path.resolve(BUILD_CLIENT_DIR, ESM_DIR),
                    path.resolve(modulesDir, '@doc-tools/transform'),
                    path.resolve(modulesDir, '@gravity-ui/uikit'),
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
    plugins: [
        {
            apply: (compiler) => {
                compiler.hooks.assetEmitted.tap(
                    'InjectIframeSourcePlugin',
                    (_fileName, contentBuffer) => {
                        const content = JSON.stringify(contentBuffer.toString());
                        const targetFileContent = fs.readFileSync(
                            path.resolve(BUILD_CLIENT_DIR, ESM_DIR, 'editor/iframe/source.js'),
                            'utf8',
                        );

                        const targetFileContentReplaced = targetFileContent.replace(
                            /"__IFRAME_SOURCE__"/,
                            () => content,
                        );

                        fs.writeFileSync(
                            path.resolve(BUILD_CLIENT_DIR, ESM_DIR, 'editor/iframe/source.js'),
                            targetFileContentReplaced,
                        );
                        fs.unlinkSync(
                            path.resolve(
                                BUILD_CLIENT_DIR,
                                ESM_DIR,
                                'editor/iframe/index.bundle.js',
                            ),
                        );
                    },
                );
            },
        },
    ],
};
