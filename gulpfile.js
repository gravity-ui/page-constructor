/* eslint-env node */
const path = require('path');

const browserify = require('browserify');
const {task, src, dest, series, parallel} = require('gulp');
const sass = require('gulp-dart-sass');
const replace = require('gulp-replace');
const replaceString = require('gulp-string-replace');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const rimraf = require('rimraf');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

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
        module: modules ? 'esnext' : 'commonjs',
    });

    return src([
        'src/**/*.{ts,tsx}',
        '!src/demo/**/*',
        '!src/stories/**/*',
        '!src/**/__stories__/**/*',
        '!src/**/__tests__/**/*',
        '!src/server.ts',
        '!src/configure.ts',
        '!test-utils/**/*',
    ])
        .pipe(
            replace(/import '.+\.scss';/g, (match) =>
                modules ? match.replace('.scss', '.css') : '',
            ),
        )
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
        '!src/demo/**/*.d.ts',
        '!src/stories/**/*.d.ts',
        '!src/**/__stories__/**/*.d.ts',
        '!src/**/__tests__/**/*.d.ts',
        '!test-utils/**/*.d.ts',
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
    return src('styles/styles.scss').pipe(sass().on('error', sass.logError)).pipe(dest('styles'));
});

task('styles-components', () => {
    return src([`src/**/*.scss`, `!src/**/__stories__/**/*.scss`])
        .pipe(sass().on('error', sass.logError))
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

task('copy-styles', function () {
    return src(['styles/**/*']).pipe(dest(path.resolve(BUILD_CLIENT_DIR, 'styles')));
});

task('bundle', function () {
    const iframePath = `${path.resolve(BUILD_CLIENT_DIR, ESM_DIR)}/editor/iframe/index.js`;

    return browserify({
        entries: [iframePath],
        transform: [
            [
                'babelify',
                {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                },
            ],
            ['browserify-css'],
        ],
    })
        .bundle()
        .pipe(source(iframePath))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(dest('.'));
});

task('inject', () => {
    const buildPath = `${path.resolve(BUILD_CLIENT_DIR, ESM_DIR)}/editor/iframe`;

    const codePath = `${buildPath}/index.js`;
    const file = JSON.stringify(require('fs').readFileSync(codePath, 'utf8'));

    return src([`${buildPath}/source.js`])
        .pipe(replaceString(/"__IFRAME_SOURCE__"/, file))
        .pipe(dest(buildPath));
});

task('bundle-cleanup', (done) => {
    rimraf.sync(path.resolve(BUILD_CLIENT_DIR, 'styles'));
    rimraf.sync(`${path.resolve(BUILD_CLIENT_DIR, ESM_DIR)}/editor/iframe/index.js`);
    done();
});

// task('default', series(['build', 'copy-styles', 'bundle', 'inject', 'bundle-cleanup']));
task('default', series(['build']));
