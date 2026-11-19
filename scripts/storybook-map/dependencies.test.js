const path = require('path');

const {buildEdges} = require('./dependencies');
const {createProgram, discoverSignificantElements} = require('./discovery');
const {createFixture, removeFixtures} = require('./test-utils');

afterEach(removeFixtures);

function build(files) {
    const root = createFixture(files);
    const program = createProgram(root);
    const components = discoverSignificantElements(program, root);

    return {components, edges: buildEdges(program, root, components), root};
}

function edgeIds({edges}) {
    return edges.map(({source, target}) => `${source}->${target}`);
}

test('extracts a direct significant dependency', () => {
    const result = build({
        'src/blocks/index.ts': "export {A} from './A/A';",
        'src/blocks/A/A.tsx':
            "import {B} from '../../components/B/B'; export const A = () => <B />;",
        'src/sub-blocks/index.ts': 'export {};',
        'src/components/index.ts': "export {B} from './B/B';",
        'src/components/B/B.tsx': 'export const B = () => <div />;',
    });

    expect(edgeIds(result)).toEqual(['block:A->component:B']);
});

test('resolves a significant dependency through a barrel export', () => {
    const result = build({
        'src/blocks/index.ts': "export {A} from './A/A';",
        'src/blocks/A/A.tsx': "import {B} from '../../components'; export const A = () => <B />;",
        'src/sub-blocks/index.ts': 'export {};',
        'src/components/index.ts': "export {B} from './B/B';",
        'src/components/B/B.tsx': 'export const B = () => <div />;',
    });

    expect(edgeIds(result)).toEqual(['block:A->component:B']);
});

test('rejects an unresolved production JSX component reference', () => {
    expect(() =>
        build({
            'src/blocks/index.ts': "export {A} from './A/A';",
            'src/blocks/A/A.tsx': `
                import {Missing} from './Missing';
                export const A = () => <Missing />;
            `,
            'src/sub-blocks/index.ts': 'export {};',
            'src/components/index.ts': 'export {};',
        }),
    ).toThrow(
        'src/blocks/A/A.tsx: JSX component reference "Missing" could not be resolved; check its import or export',
    );
});

test('rejects an unresolved production JSX member on a lowercase internal namespace', () => {
    expect(() =>
        build({
            'src/blocks/index.ts': "export {A} from './A/A';",
            'src/blocks/A/A.tsx': `
                import {widgets} from './Missing';
                export const A = () => <widgets.Missing />;
            `,
            'src/sub-blocks/index.ts': 'export {};',
            'src/components/index.ts': 'export {};',
        }),
    ).toThrow(
        'src/blocks/A/A.tsx: JSX component reference "widgets.Missing" could not be resolved; check its import or export',
    );
});

test('rejects an unresolved production JSX member on an uppercase internal namespace', () => {
    expect(() =>
        build({
            'src/blocks/index.ts': "export {A} from './A/A';",
            'src/blocks/A/A.tsx': `
                import {Widgets} from './Missing';
                export const A = () => <Widgets.Missing />;
            `,
            'src/sub-blocks/index.ts': 'export {};',
            'src/components/index.ts': 'export {};',
        }),
    ).toThrow(
        'src/blocks/A/A.tsx: JSX component reference "Widgets.Missing" could not be resolved; check its import or export',
    );
});

test('ignores a resolved external-package JSX component', () => {
    const result = build({
        'src/blocks/index.ts': "export {A} from './A/A';",
        'src/blocks/A/A.tsx': `
            import {External} from 'external-package';
            export const A = () => <External />;
        `,
        'src/sub-blocks/index.ts': 'export {};',
        'src/components/index.ts': 'export {};',
        'node_modules/external-package/index.d.ts': 'export const External: any;',
    });

    expect(edgeIds(result)).toEqual([]);
});

test('ignores a valid external-package JSX member on a lowercase namespace', () => {
    const result = build({
        'src/blocks/index.ts': "export {A} from './A/A';",
        'src/blocks/A/A.tsx': `
            import {animated} from 'external-package';
            export const A = () => <animated.div />;
        `,
        'src/sub-blocks/index.ts': 'export {};',
        'src/components/index.ts': 'export {};',
        'node_modules/external-package/index.d.ts': 'export const animated: any;',
    });

    expect(edgeIds(result)).toEqual([]);
});

test('ignores a valid external-package JSX member on an uppercase namespace', () => {
    const result = build({
        'src/blocks/index.ts': "export {A} from './A/A';",
        'src/blocks/A/A.tsx': `
            import {UI} from 'external-package';
            export const A = () => <UI.Button />;
        `,
        'src/sub-blocks/index.ts': 'export {};',
        'src/components/index.ts': 'export {};',
        'node_modules/external-package/index.d.ts': 'export const UI: any;',
    });

    expect(edgeIds(result)).toEqual([]);
});

test('traverses an anonymous default-exported component declaration', () => {
    const result = build({
        'src/blocks/index.ts': "export {default as A} from './A/A';",
        'src/blocks/A/A.tsx': "import {B} from '../../components/B/B'; export default () => <B />;",
        'src/sub-blocks/index.ts': 'export {};',
        'src/components/index.ts': "export {B} from './B/B';",
        'src/components/B/B.tsx': 'export const B = () => <div />;',
    });

    expect(edgeIds(result)).toEqual(['block:A->component:B']);
});

test('traverses a property-assigned render callback at a callable argument position', () => {
    const result = build({
        'src/blocks/index.ts': "export {A} from './A/A';",
        'src/blocks/A/A.tsx': `
            import {B} from '../../components/B/B';
            const helpers = {renderChild: () => <B />};
            const items = [1];
            export const A = () => <>{items.map(helpers.renderChild)}</>;
        `,
        'src/sub-blocks/index.ts': 'export {};',
        'src/components/index.ts': "export {B} from './B/B';",
        'src/components/B/B.tsx': 'export const B = () => <div />;',
    });

    expect(edgeIds(result)).toEqual(['block:A->component:B']);
});

test('does not treat a component passed to a value parameter as a render callback', () => {
    const result = build({
        'src/blocks/index.ts': "export {A} from './A/A';",
        'src/blocks/A/A.tsx': `
            import {B} from '../../components/B/B';
            export const A = () => { console.log(B); return <div />; };
        `,
        'src/sub-blocks/index.ts': 'export {};',
        'src/components/index.ts': "export {B} from './B/B';",
        'src/components/B/B.tsx': 'export const B = () => <div />;',
    });

    expect(edgeIds(result)).toEqual([]);
});

test('collapses helper chains and stops at the first significant boundary', () => {
    const result = build({
        'src/blocks/index.ts': "export {A} from './A/A';",
        'src/blocks/A/A.tsx': "import {Helper} from './Helper'; export const A = () => <Helper />;",
        'src/blocks/A/Helper.tsx':
            "import {B} from '../../components/B/B'; export const Helper = () => <B />;",
        'src/sub-blocks/index.ts': 'export {};',
        'src/components/index.ts': `
            export {B} from './B/B';
            export {C} from './C/C';
        `,
        'src/components/B/B.tsx': "import {C} from '../C/C'; export const B = () => <C />;",
        'src/components/C/C.tsx': 'export const C = () => <div />;',
    });

    expect(edgeIds(result)).toEqual(['block:A->component:B', 'component:B->component:C']);
    expect(edgeIds(result)).not.toContain('block:A->component:C');
});

test('traverses significant wrapper children through an internal barrel', () => {
    const result = build({
        'src/blocks/index.ts': "export {A} from './A/A';",
        'src/blocks/A/A.tsx': `
            import {Helper} from '../../internal';
            import {Wrapper} from '../../components';
            export const A = () => <Wrapper><Helper /></Wrapper>;
        `,
        'src/sub-blocks/index.ts': 'export {};',
        'src/components/index.ts': `
            export {B} from './B/B';
            export {Wrapper} from './Wrapper/Wrapper';
        `,
        'src/internal/index.ts': "export {Helper} from './Helper';",
        'src/internal/Helper.tsx': `
            import {B} from '../components';
            export const Helper = () => <B />;
        `,
        'src/components/Wrapper/Wrapper.tsx':
            'export const Wrapper = ({children}) => <section>{children}</section>;',
        'src/components/B/B.tsx': 'export const B = () => <div />;',
    });

    expect(edgeIds(result)).toEqual(['block:A->component:B', 'block:A->component:Wrapper']);
});

test('ignores dependencies composed only in stories', () => {
    const storyFile = 'src/blocks/A/__stories__/A.stories.tsx';
    const root = createFixture({
        'src/blocks/index.ts': "export {A} from './A/A';",
        'src/blocks/A/A.tsx': 'export const A = () => <div />;',
        [storyFile]: `
            import {A} from '../A';
            import {B} from '../../../components';
            const Example = () => <A><B /></A>;
            export default {title: 'Blocks/A', component: A};
            export {Example};
        `,
        'src/sub-blocks/index.ts': 'export {};',
        'src/components/index.ts': "export {B} from './B/B';",
        'src/components/B/B.tsx': 'export const B = () => <div />;',
    });
    const program = createProgram(root);
    const components = discoverSignificantElements(program, root).map((component) =>
        component.id === 'block:A'
            ? {...component, storyFile: path.join(root, storyFile)}
            : component,
    );
    const result = {edges: buildEdges(program, root, components)};

    expect(edgeIds(result)).toEqual([]);
});
