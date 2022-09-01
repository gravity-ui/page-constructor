/* eslint-env node */
const path = require('path');
const {task, src, dest, series, parallel} = require('gulp');
const rimraf = require('rimraf');
const ts = require('gulp-typescript');
const replace = require('gulp-replace');
const sass = require('gulp-dart-sass');
const alias = require('gulp-ts-alias');
const styleAliases = require('gulp-style-aliases');

const BUILD_CLIENT_DIR = path.resolve('build');
const ESM_DIR = 'esm';
const CJS_DIR = 'cjs';
const ALIASES_FOR_STYLES = {
    styles: 'styles',
    '~': 'node_modules',
};
const SASS_LOADER_OPTIONS = {
    includePaths: ['./node_modules'],
};

task('clean', (done) => {
    rimraf.sync(BUILD_CLIENT_DIR);
    rimraf.sync('styles/**/*.css');
    done();
});

function compileTs(modules = false) {
    const tsProject = ts.createProject('tsconfig.json', {
        declaration: true,
        module: modules ? 'esnext' : 'commonjs',
    });

    return src([
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/demo/**/*.{js,jsx,ts,tsx}',
        '!src/stories/**/*.{js,jsx,ts,tsx}',
        '!src/**/__stories__/**/*.{js,jsx,ts,tsx}',
    ])
        .pipe(
            replace(/import '.+\.scss';/g, (match) =>
                modules ? match.replace('.scss', '.css') : '',
            ),
        )
        .pipe(tsProject())
        .pipe(alias('tsconfig.json'))
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, modules ? ESM_DIR : CJS_DIR)));
}

task('compile-to-esm', () => {
    return compileTs(true);
});

task('compile-to-cjs', () => {
    return compileTs();
});

task('copy-js-declarations', () => {
    return src([
        'src/**/*.d.ts',
        '!src/demo/**/*.d.ts',
        '!src/stories/**/*.d.ts',
        '!src/**/__stories__/**/*.d.ts',
    ])
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, ESM_DIR)))
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, CJS_DIR)));
});

task('copy-i18n', () => {
    return src(['src/**/i18n/*.json'])
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, ESM_DIR)))
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, CJS_DIR)));
});

task('styles-global', () => {
    return src('styles/*.scss')
        .pipe(styleAliases(ALIASES_FOR_STYLES))
        .pipe(sass(SASS_LOADER_OPTIONS).on('error', sass.logError))
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, 'styles')));
});

task('copy-global-scss', () => {
    return src('styles/*').pipe(dest(path.resolve(BUILD_CLIENT_DIR, 'styles')));
});

task('styles-components', () => {
    return src([`src/**/*.scss`, `!src/**/__stories__/**/*.scss`])
        .pipe(styleAliases(ALIASES_FOR_STYLES))
        .pipe(sass(SASS_LOADER_OPTIONS).on('error', sass.logError))
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, ESM_DIR)))
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, CJS_DIR)));
});

task(
    'build',
    series([
        'clean',
        parallel(['compile-to-esm', 'compile-to-cjs']),
        'copy-js-declarations',
        'copy-i18n',
        parallel(['styles-global', 'styles-components', 'copy-global-scss']),
    ]),
);

task('default', series(['build']));
