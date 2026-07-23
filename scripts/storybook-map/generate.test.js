const {spawnSync} = require('child_process');
const fs = require('fs');
const path = require('path');

const {buildComponentMap, writeComponentMap} = require('./generate');
const {createFixture, removeFixtures} = require('./test-utils');

afterEach(removeFixtures);

const repoRoot = path.resolve(__dirname, '../..');

test('builds and writes deterministic serializable map data', () => {
    const root = createFixture({
        'src/blocks/index.ts': "export {A} from './A/A';",
        'src/blocks/A/A.tsx':
            "import {B} from '../../components/B/B'; export const A = () => <><B /><B /></>;",
        'src/sub-blocks/index.ts': 'export {};',
        'src/components/index.ts': "export {B} from './B/B';",
        'src/components/B/B.tsx': 'export const B = () => <div />;',
    });
    const outputPath = path.join(root, '.storybook/generated/component-map.json');

    const data = buildComponentMap(root);
    expect(data).toEqual({
        nodes: [
            {id: 'block:A', kind: 'block', exportName: 'A', label: 'A'},
            {id: 'component:B', kind: 'component', exportName: 'B', label: 'B'},
        ],
        edges: [{source: 'block:A', target: 'component:B'}],
    });

    expect(writeComponentMap(root, outputPath)).toEqual(data);
    expect(fs.readFileSync(outputPath, 'utf8')).toBe(`${JSON.stringify(data, null, 2)}\n`);
});

test('preserves the production BannerBlock public nodes and direct dependencies', () => {
    const data = buildComponentMap(repoRoot);
    const nodesById = new Map(data.nodes.map((node) => [node.id, node]));

    expect(nodesById.get('block:BannerBlock')).toEqual({
        id: 'block:BannerBlock',
        kind: 'block',
        exportName: 'BannerBlock',
        label: 'BannerBlock',
    });
    expect(nodesById.get('sub-block:BannerCard')).toEqual({
        id: 'sub-block:BannerCard',
        kind: 'sub-block',
        exportName: 'BannerCard',
        label: 'BannerCard',
    });
    expect(nodesById.get('component:AnimateBlock')).toEqual({
        id: 'component:AnimateBlock',
        kind: 'component',
        exportName: 'AnimateBlock',
        label: 'AnimateBlock',
    });
    expect(data.edges.filter(({source}) => source === 'block:BannerBlock')).toEqual([
        {source: 'block:BannerBlock', target: 'component:AnimateBlock'},
        {source: 'block:BannerBlock', target: 'sub-block:BannerCard'},
    ]);
});

test('rejects unsupported CLI arguments before generation', () => {
    const result = spawnSync(process.execPath, [path.join(__dirname, 'generate.js'), '--unknown'], {
        encoding: 'utf8',
    });

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('Unsupported argument: --unknown');
});
