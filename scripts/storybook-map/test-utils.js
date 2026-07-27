const fs = require('fs');
const os = require('os');
const path = require('path');

const fixtures = [];

function createFixture(files) {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'storybook-map-'));
    fixtures.push(root);

    fs.writeFileSync(
        path.join(root, 'tsconfig.json'),
        JSON.stringify({
            compilerOptions: {
                esModuleInterop: true,
                jsx: 'react-jsx',
                module: 'commonjs',
                target: 'es2019',
            },
        }),
    );

    for (const [relativePath, content] of Object.entries(files)) {
        const filePath = path.join(root, relativePath);
        fs.mkdirSync(path.dirname(filePath), {recursive: true});
        fs.writeFileSync(filePath, content);
    }

    return root;
}

function removeFixtures() {
    while (fixtures.length > 0) {
        fs.rmSync(fixtures.pop(), {force: true, recursive: true});
    }
}

module.exports = {createFixture, removeFixtures};
