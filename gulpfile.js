/* eslint-env node */
const path = require('path');
const {task, src, dest, series, parallel} = require('gulp');
const rimraf = require('rimraf');
const ts = require('gulp-typescript');
const replace = require('gulp-replace');
const sass = require('gulp-dart-sass');
const rename = require('gulp-rename');

const BUILD_CLIENT_DIR = path.resolve('build');
const SERVER_CLIENT_DIR = path.resolve('server');
const ESM_DIR = 'esm';
const CJS_DIR = 'cjs';
const SASS_LOADER_OPTIONS = {
    includePaths: ['./node_modules'],
};

const TS_CONFIG_FILENAME = 'tsconfig.json';

const CONFIG_EXTENSION_FOR_DECLARATION = {
    emitDeclarationOnly: true,
    isolatedModules: false,
    declaration: true,
};

const CONFIG_EXTENSION_FOR_COMPILE = {
    incremental: true,
    isolatedModules: true,
};

const SRC_FOR_INDEX_BUILD = [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/demo/**/*.{js,jsx,ts,tsx}',
    '!src/stories/**/*.{js,jsx,ts,tsx}',
    '!src/**/__stories__/**/*.{js,jsx,ts,tsx}',
    '!src/data/**/*.{js,jsx,ts,tsx}',
    '!src/server.ts',
];

const SRC_FOR_SERVER_REQUIREMENTS = [
    'src/data/**/*.{js,jsx,ts,tsx}',
    'src/models/**/*.{js,jsx,ts,tsx}',
];

const getTsConfig = ({filename = TS_CONFIG_FILENAME, modules = false, extension = {}}) => {
    return ts.createProject(filename, {
        module: modules ? 'esnext' : 'commonjs',
        ...extension,
    });
};

task('clean', (done) => {
    rimraf.sync(BUILD_CLIENT_DIR);
    rimraf.sync(SERVER_CLIENT_DIR);
    rimraf.sync('styles/**/*.css');
    done();
});

function compileTs(modules = false) {
    const tsProject = getTsConfig({
        modules,
        extension: CONFIG_EXTENSION_FOR_COMPILE,
    });

    return src(SRC_FOR_INDEX_BUILD)
        .pipe(
            replace(/import '.+\.scss';/g, (match) =>
                modules ? match.replace('.scss', '.css') : '',
            ),
        )
        .pipe(tsProject())
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, modules ? ESM_DIR : CJS_DIR)));
}

function compileTsDeclaration(modules = false) {
    const tsProject = getTsConfig({
        modules,
        extension: CONFIG_EXTENSION_FOR_DECLARATION,
    });

    return src(SRC_FOR_INDEX_BUILD)
        .pipe(
            replace(/import '.+\.scss';/g, (match) =>
                modules ? match.replace('.scss', '.css') : '',
            ),
        )
        .pipe(tsProject())
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, modules ? ESM_DIR : CJS_DIR)));
}

function compileServerFile() {
    const tsProject = getTsConfig({
        extension: {
            declaration: true,
            isolatedModules: false,
        },
    });

    return src('src/server.ts')
        .pipe(rename('index.js'))
        .pipe(tsProject())
        .pipe(dest(path.resolve(SERVER_CLIENT_DIR)));
}

function compileServerRequirements() {
    const tsProject = getTsConfig({
        extension: CONFIG_EXTENSION_FOR_COMPILE,
    });

    return src(SRC_FOR_SERVER_REQUIREMENTS, {base: 'src'})
        .pipe(tsProject())
        .pipe(dest(path.resolve(SERVER_CLIENT_DIR)));
}

function compileServerRequirementsDeclaration() {
    const tsProject = getTsConfig({
        extension: CONFIG_EXTENSION_FOR_DECLARATION,
    });

    return src(SRC_FOR_SERVER_REQUIREMENTS, {base: 'src'})
        .pipe(tsProject())
        .pipe(dest(path.resolve(SERVER_CLIENT_DIR)));
}

task('compile-to-esm', () => {
    return compileTs(true);
});

task('compile-to-cjs', () => {
    return compileTs();
});

task('compile-to-esm-declaration', () => {
    return compileTsDeclaration(true);
});

task('compile-to-cjs-declaration', () => {
    return compileTsDeclaration();
});

task('compile-server-file', () => {
    return compileServerFile();
});

task('compile-server-requirements', () => {
    return compileServerRequirements();
});

task('compile-server-requirements-declaration', () => {
    return compileServerRequirementsDeclaration();
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
        .pipe(sass(SASS_LOADER_OPTIONS).on('error', sass.logError))
        .pipe(dest('styles'));
});

task('styles-components', () => {
    return src([`src/**/*.scss`, `!src/**/__stories__/**/*.scss`])
        .pipe(sass(SASS_LOADER_OPTIONS).on('error', sass.logError))
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, ESM_DIR)))
        .pipe(dest(path.resolve(BUILD_CLIENT_DIR, CJS_DIR)));
});

task(
    'build',
    series([
        'clean',
        parallel(['compile-to-esm', 'compile-to-cjs']),
        parallel(['compile-to-esm-declaration', 'compile-to-cjs-declaration']),
        parallel([
            'compile-server-file',
            'compile-server-requirements',
            'compile-server-requirements-declaration',
        ]),
        'copy-js-declarations',
        'copy-i18n',
        parallel(['styles-global', 'styles-components']),
    ]),
);

task('default', series(['build']));
