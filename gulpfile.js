/* eslint-env node */
const path = require('path');

const {task, src, dest, series, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const replace = require('gulp-replace');
const alias = require('gulp-ts-alias');
const ts = require('gulp-typescript');
const rimraf = require('rimraf');

const BUILD_CLIENT_DIR = path.resolve('build');
const ESM_DIR = 'esm';
const CJS_DIR = 'cjs';

task('clean', (done) => {
    rimraf.sync(BUILD_CLIENT_DIR);
    rimraf.sync('styles/**/*.css');
    done();
});

function compileTs(modules = false) {
    const tsProject = ts.createProject('tsconfig.json', {
        declaration: true,
        module: modules ? 'esnext' : 'nodenext',
        moduleResolution: modules ? 'bundler' : 'nodenext',
    });

    return src([
        'src/**/*.{ts,tsx}',
        '!src/stories/**/*',
        '!src/**/__stories__/**/*',
        '!src/**/__tests__/**/*',
        '!src/server.ts',
        '!src/configure.ts',
        '!src/widget/**/*',
        '!test-utils/**/*',
    ])
        .pipe(
            replace(/import '.+\.scss';/g, (match) =>
                modules ? match.replace('.scss', '.css') : '',
            ),
        )
        .pipe(alias(tsProject.config))
        .pipe(tsProject())
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
        '!src/stories/**/*.d.ts',
        '!src/**/__stories__/**/*.d.ts',
        '!src/**/__tests__/**/*.d.ts',
        '!test-utils/**/*.d.ts',
        '!src/widget/**/*',
    ])
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, ESM_DIR)))
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, CJS_DIR)));
});

task('copy-json', () => {
    return src(['src/**/i18n/*.json', `src/**/templates/*.json`])
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, ESM_DIR)))
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, CJS_DIR)));
});

task('styles-global', () => {
    return src('styles/styles.scss')
        .pipe(
            sass
                .sync({
                    loadPaths: ['node_modules'],
                })
                .on('error', sass.logError),
        )
        .pipe(dest('styles'));
});

task('styles-components', () => {
    return src([`src/**/*.scss`, `!src/**/__stories__/**/*.scss`, '!src/widget/**/*.scss'])
        .pipe(
            sass.sync({loadPaths: ['node_modules']}).on('error', function (error) {
                sass.logError.call(this, error);
                process.exit(1);
            }),
        )
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, ESM_DIR)))
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, CJS_DIR)));
});

task(
    'build',
    series([
        'clean',
        parallel(['compile-to-esm', 'compile-to-cjs']),
        'copy-js-declarations',
        'copy-json',
        parallel(['styles-global', 'styles-components']),
    ]),
);

task('default', series(['build']));
