/* eslint-env node */

module.exports = {
    multipass: true,
    js2svg: {
        pretty: true,
    },
    plugins: [
        {
            name: 'preset-default',
            params: {
                overrides: {
                    removeViewBox: false,
                    cleanupIDs: {
                        minify: false,
                    },
                },
            },
        },
    ],
};
