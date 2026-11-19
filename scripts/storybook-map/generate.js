const fs = require('fs');
const path = require('path');

const {buildEdges} = require('./dependencies');
const {createProgram, discoverSignificantElements} = require('./discovery');

function buildComponentMap(repoRoot) {
    const program = createProgram(repoRoot);
    const components = discoverSignificantElements(program, repoRoot);
    return {
        nodes: components.map(({id, kind, exportName, label}) => ({
            id,
            kind,
            exportName,
            label,
        })),
        edges: buildEdges(program, repoRoot, components),
    };
}

function writeComponentMap(repoRoot, outputPath) {
    const data = buildComponentMap(repoRoot);
    fs.mkdirSync(path.dirname(outputPath), {recursive: true});
    fs.writeFileSync(outputPath, `${JSON.stringify(data, null, 2)}\n`);
    return data;
}

function getOutputPath(repoRoot, args) {
    if (args.length === 0) {
        return path.join(repoRoot, '.storybook/generated/component-map.json');
    }
    if (args.length !== 2 || args[0] !== '--output') {
        throw new Error(`Unsupported argument: ${args[0] || ''}`);
    }
    if (!args[1]) throw new Error('--output requires a path');
    return path.resolve(args[1]);
}

function run() {
    const repoRoot = path.resolve(__dirname, '../..');
    const outputPath = getOutputPath(repoRoot, process.argv.slice(2));
    const data = writeComponentMap(repoRoot, outputPath);
    const relativePath = path.relative(repoRoot, outputPath) || path.basename(outputPath);
    process.stdout.write(
        `Generated ${data.nodes.length} nodes and ${data.edges.length} edges at ${relativePath}\n`,
    );
}

if (require.main === module) {
    try {
        run();
    } catch (error) {
        process.stderr.write(`${error instanceof Error ? error.message : error}\n`);
        process.exitCode = 1;
    }
}

module.exports = {buildComponentMap, writeComponentMap};
