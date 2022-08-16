/* eslint-env node */
const path = require('path');
const {task, src, dest, series, parallel} = require('gulp');
const rimraf = require('rimraf');
const ts = require('gulp-typescript');
const replace = require('gulp-replace');
const sass = require('gulp-dart-sass');
const rename = require('gulp-rename');

const BUILD_CLIENT_DIR = path.resolve('build');
const BUILD_SERVER_DIRS = {
    server: path.resolve('server'),
    configure: path.resolve('configure'),
};

task('clean', (done) => {
    rimraf.sync(BUILD_CLIENT_DIR);
    rimraf.sync(BUILD_SERVER_DIRS.server);
    rimraf.sync(BUILD_SERVER_DIRS.configure);
    rimraf.sync('styles/**/*.css');
    done();
});

function getStylesTasks() {
    const dirs = ['blocks', 'sub-blocks', 'components', 'containers', 'grid'];

    return dirs.map((dir) => {
        const taskName = `styles-${dir}`;

        task(taskName, () => {
            return src([`src/${dir}/**/*.scss`, `!src/${dir}/**/__stories__/**/*.scss`])
                .pipe(sass().on('error', sass.logError))
                .pipe(dest(path.resolve(BUILD_CLIENT_DIR, 'esm', dir)))
                .pipe(dest(path.resolve(BUILD_CLIENT_DIR, 'cjs', dir)));
        });

        return taskName;
    });
}

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
        '!src/server.ts',
        '!src/configure.ts',
    ])
        .pipe(
            replace(/import '.+\.scss';/g, (match) =>
                modules ? match.replace('.scss', '.css') : '',
            ),
        )
        .pipe(tsProject())
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, modules ? 'esm' : 'cjs')));
}

function compileServerTs(entry) {
    const tsProject = ts.createProject(`tsconfig.${entry}.json`, {
        declaration: true,
        module: 'commonjs',
    });

    return src([`src/**/${entry}.ts`])
        .pipe(tsProject())
        .pipe(
            rename(function (filePath) {
                filePath.basename = filePath.basename.replace(entry, 'index');
            }),
        )
        .pipe(dest(path.resolve(BUILD_SERVER_DIRS[entry])));
}

task('compile-to-esm', () => {
    return compileTs(true);
});

task('compile-to-cjs', () => {
    return compileTs();
});

task('compile-server', () => {
    return compileServerTs('server');
});

task('compile-configure', () => {
    return compileServerTs('configure');
});

task('copy-js-declarations', () => {
    return src([
        'src/**/*.d.ts',
        '!src/demo/**/*.d.ts',
        '!src/stories/**/*.d.ts',
        '!src/**/__stories__/**/*.d.ts',
    ])
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, 'esm')))
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, 'cjs')));
});

task('copy-i18n', () => {
    return src(['src/**/i18n/*.json'])
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, 'esm')))
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, 'cjs')));
});

task('styles-global', () => {
    return src('styles/styles.scss').pipe(sass().on('error', sass.logError)).pipe(dest('styles'));
});

task(
    'build',
    series([
        'clean',
        parallel(['compile-to-esm', 'compile-to-cjs', 'compile-server', 'compile-configure']),
        'copy-js-declarations',
        'copy-i18n',
        parallel(['styles-global', ...getStylesTasks()]),
    ]),
);

task('default', series(['build']));
