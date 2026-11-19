const {createProgram, discoverSignificantElements} = require('./discovery');
const {createFixture, removeFixtures} = require('./test-utils');

afterEach(removeFixtures);

function stripSymbols(elements) {
    // eslint-disable-next-line no-unused-vars
    return elements.map(({symbol: _symbol, ...element}) => element);
}

test('discovers runtime exports from the designated barrels using public names', () => {
    const root = createFixture({
        'src/blocks/index.ts': "export {default as BannerBlock} from './Banner/Banner';",
        'src/blocks/Banner/Banner.tsx': 'export default () => <div />;',
        'src/sub-blocks/index.ts': "export {default as BannerCard} from './BannerCard/BannerCard';",
        'src/sub-blocks/BannerCard/BannerCard.tsx': 'export default () => <article />;',
        'src/components/index.ts': `
            export {default as YFMWrapper} from './YFMWrapper/YFMWrapper';
            export type {YFMWrapperProps} from './YFMWrapper/YFMWrapper';
        `,
        'src/components/YFMWrapper/YFMWrapper.tsx': `
            export interface YFMWrapperProps {content?: string}
            export default () => <div />;
        `,
        'src/components/StoryOnly/StoryOnly.tsx': 'export default () => <div />;',
        'src/components/StoryOnly/__stories__/StoryOnly.stories.tsx': `
            import StoryOnly from '../StoryOnly';
            export default {title: 'Components/StoryOnly', component: StoryOnly};
        `,
    });

    expect(stripSymbols(discoverSignificantElements(createProgram(root), root))).toEqual([
        {id: 'block:BannerBlock', kind: 'block', exportName: 'BannerBlock', label: 'BannerBlock'},
        {
            id: 'sub-block:BannerCard',
            kind: 'sub-block',
            exportName: 'BannerCard',
            label: 'BannerCard',
        },
        {
            id: 'component:YFMWrapper',
            kind: 'component',
            exportName: 'YFMWrapper',
            label: 'YFMWrapper',
        },
    ]);
});

test('reports the exact path of a missing designated public barrel', () => {
    const root = createFixture({
        'src/blocks/index.ts': 'export {};',
        'src/components/index.ts': 'export {};',
    });

    expect(() => discoverSignificantElements(createProgram(root), root)).toThrow(
        'src/sub-blocks/index.ts: designated public barrel is required',
    );
});

test('resolves a runtime export through chained reexports', () => {
    const root = createFixture({
        'src/blocks/index.ts': 'export {};',
        'src/sub-blocks/index.ts': 'export {};',
        'src/components/index.ts': "export {PublicCard} from './cards';",
        'src/components/cards/index.ts': "export {Card as PublicCard} from './Card';",
        'src/components/cards/Card.tsx': 'export const Card = () => <article />;',
    });

    expect(stripSymbols(discoverSignificantElements(createProgram(root), root))).toEqual([
        {
            id: 'component:PublicCard',
            kind: 'component',
            exportName: 'PublicCard',
            label: 'PublicCard',
        },
    ]);
});

test('ignores an erased named type reexport without explicit export type syntax', () => {
    const root = createFixture({
        'src/blocks/index.ts': 'export {};',
        'src/sub-blocks/index.ts': 'export {};',
        'src/components/index.ts': "export {Props} from './Props';",
        'src/components/Props.ts': 'export interface Props {content?: string}',
    });

    expect(stripSymbols(discoverSignificantElements(createProgram(root), root))).toEqual([]);
});

test('ignores erased types from a star reexport', () => {
    const root = createFixture({
        'src/blocks/index.ts': 'export {};',
        'src/sub-blocks/index.ts': 'export {};',
        'src/components/index.ts': "export * from './Props';",
        'src/components/Props.ts': 'export interface Props {content?: string}',
    });

    expect(stripSymbols(discoverSignificantElements(createProgram(root), root))).toEqual([]);
});

test('rejects a public reexport whose symbol cannot be resolved', () => {
    const root = createFixture({
        'src/blocks/index.ts': 'export {};',
        'src/sub-blocks/index.ts': 'export {};',
        'src/components/index.ts': "export {Missing} from './Missing';",
    });

    expect(() => discoverSignificantElements(createProgram(root), root)).toThrow(
        'src/components/index.ts: runtime export Missing could not be resolved',
    );
});

test('rejects two public names for the same implementation and names both exports', () => {
    const root = createFixture({
        'src/blocks/index.ts': 'export {};',
        'src/sub-blocks/index.ts': 'export {};',
        'src/components/index.ts': `
            export {Card as CardOne} from './Card/Card';
            export {Card as CardTwo} from './Card/Card';
        `,
        'src/components/Card/Card.tsx': 'export const Card = () => <article />;',
    });

    expect(() => discoverSignificantElements(createProgram(root), root)).toThrow(
        'component:CardTwo resolves to the same implementation as component:CardOne',
    );
});
