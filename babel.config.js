/* eslint-env node */
module.exports = {
    env: {
        test: {
            presets: ['data-ui'],
            only: ['./src', './node_modules/@yandex-data-ui'],
        },
    },
};
