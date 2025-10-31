/* eslint-env node */
const fs = require('fs');
const path = require('path');

const utils = require('@gravity-ui/gulp-utils');
const esbuild = require('esbuild');
const {task, src, dest, series, parallel} = require('gulp');
const replace = require('gulp-replace');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const {rimrafSync} = require('rimraf');

const BUILD_CLIENT_DIR = path.resolve('build');
const ESM_DIR = 'esm';
const CJS_DIR = 'cjs';

task('clean', (done) => {
    rimrafSync(BUILD_CLIENT_DIR);
    rimrafSync('styles/**/*.css', {glob: true});
    done();
});

async function compileTs(modules = false) {
    const tsProject = await utils.createTypescriptProject({
        compilerOptions: {
            declaration: true,
            module: modules ? 'esnext' : 'nodenext',
            moduleResolution: modules ? 'bundler' : 'nodenext',
            ...(modules ? undefined : {verbatimModuleSyntax: false}),
        },
    });

    const transformers = [
        tsProject.customTransformers.transformScssImports,
        tsProject.customTransformers.transformLocalModules,
    ];
    return new Promise((resolve) => {
        src([
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
            .pipe(sourcemaps.init())
            .pipe(
                tsProject({
                    customTransformers: {
                        before: transformers,
                        afterDeclarations: transformers,
                    },
                }),
            )
            .pipe(sourcemaps.write('.', {includeContent: true, sourceRoot: '../../src'}))
            .pipe(
                utils.addVirtualFile({
                    fileName: 'package.json',
                    text: JSON.stringify({type: modules ? 'module' : 'commonjs'}),
                }),
            )
            .pipe(dest(path.resolve(BUILD_CLIENT_DIR, modules ? 'esm' : 'cjs')))
            .on('end', resolve);
    });
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

// Transpile ESM-only packages (swiper) to CJS for compatibility
task('bundle-esm-deps-for-cjs', async () => {
    const cjsDir = path.resolve(BUILD_CLIENT_DIR, CJS_DIR);
    const vendorDir = path.join(cjsDir, '_vendor');

    // Create directory for vendored CJS modules
    fs.mkdirSync(vendorDir, {recursive: true});

    // Bundle swiper to CJS
    await esbuild.build({
        entryPoints: {
            swiper: 'node_modules/swiper/swiper.mjs',
            'swiper-react': 'node_modules/swiper/swiper-react.mjs',
        },
        bundle: true,
        format: 'cjs',
        outdir: vendorDir,
        platform: 'browser',
        external: ['react', 'react-dom'],
        minify: false,
        sourcemap: true,
    });

    // Bundle swiper modules
    await esbuild.build({
        stdin: {
            contents: `
                export { A11y, Autoplay, Pagination } from 'swiper/modules';
            `,
            resolveDir: process.cwd(),
        },
        bundle: true,
        format: 'cjs',
        outfile: path.join(vendorDir, 'swiper-modules.js'),
        platform: 'browser',
        minify: false,
        sourcemap: true,
    });

    // Create node_modules/swiper structure in CJS build
    const swiperCjsDir = path.join(cjsDir, 'node_modules', 'swiper');
    fs.mkdirSync(swiperCjsDir, {recursive: true});

    // Create package.json for CJS version of swiper
    fs.writeFileSync(
        path.join(swiperCjsDir, 'package.json'),
        JSON.stringify(
            {
                name: 'swiper',
                version: '10.2.0',
                type: 'commonjs',
                main: './swiper.js',
                exports: {
                    '.': './swiper.js',
                    './react': './swiper-react.js',
                    './modules': './modules/index.js',
                    './css': './swiper.css',
                    './css/a11y': './modules/a11y.css',
                    './css/pagination': './modules/pagination.css',
                },
            },
            null,
            2,
        ),
    );

    // Copy transpiled JS files
    fs.copyFileSync(path.join(vendorDir, 'swiper.js'), path.join(swiperCjsDir, 'swiper.js'));
    fs.copyFileSync(
        path.join(vendorDir, 'swiper-react.js'),
        path.join(swiperCjsDir, 'swiper-react.js'),
    );

    // Create modules directory and copy modules there
    const modulesDir = path.join(swiperCjsDir, 'modules');
    fs.mkdirSync(modulesDir, {recursive: true});
    fs.copyFileSync(path.join(vendorDir, 'swiper-modules.js'), path.join(modulesDir, 'index.js'));

    // Copy CSS files
    const swiperNodeModules = path.join('node_modules', 'swiper');

    // Main CSS
    fs.copyFileSync(
        path.join(swiperNodeModules, 'swiper.css'),
        path.join(swiperCjsDir, 'swiper.css'),
    );

    // Module CSS files
    ['pagination.css', 'a11y.css', 'autoplay.css'].forEach((file) => {
        const src = path.join(swiperNodeModules, 'modules', file);
        const dest = path.join(modulesDir, file);
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, dest);
        }
    });

    // Copy types
    const typesDir = path.join(swiperCjsDir, 'types');
    fs.mkdirSync(path.join(typesDir, 'modules'), {recursive: true});

    fs.copyFileSync(
        path.join(swiperNodeModules, 'swiper.d.ts'),
        path.join(swiperCjsDir, 'swiper.d.ts'),
    );
    fs.copyFileSync(
        path.join(swiperNodeModules, 'swiper-react.d.ts'),
        path.join(swiperCjsDir, 'swiper-react.d.ts'),
    );
    fs.copyFileSync(
        path.join(swiperNodeModules, 'types', 'index.d.ts'),
        path.join(typesDir, 'index.d.ts'),
    );
    fs.copyFileSync(
        path.join(swiperNodeModules, 'types', 'modules', 'index.d.ts'),
        path.join(typesDir, 'modules', 'index.d.ts'),
    );
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
        'bundle-esm-deps-for-cjs',
        'copy-js-declarations',
        'copy-json',
        parallel(['styles-global', 'styles-components']),
    ]),
);

task('default', series(['build']));
