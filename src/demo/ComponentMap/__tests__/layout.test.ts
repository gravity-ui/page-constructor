import {ARROW_SIZE, getSameGroupArcOutset} from '../edgeGeometry';
import {GROUP_GAP, WORLD_PADDING, hitTest, layoutComponentMap} from '../layout';
import type {ComponentMapData, LayoutNode} from '../model';

const data: ComponentMapData = {
    nodes: [
        {
            id: 'component:Zeta',
            kind: 'component',
            exportName: 'Zeta',
            label: 'Zeta',
        },
        {
            id: 'sub-block:Beta',
            kind: 'sub-block',
            exportName: 'Beta',
            label: 'Beta',
        },
        {
            id: 'block:Alpha',
            kind: 'block',
            exportName: 'Alpha',
            label: 'Alpha',
        },
        {
            id: 'component:Alpha',
            kind: 'component',
            exportName: 'Alpha',
            label: 'Alpha',
        },
    ],
    edges: [{source: 'block:Alpha', target: 'component:Alpha'}],
};

const rectanglesOverlap = (left: LayoutNode, right: LayoutNode) =>
    left.rect.x < right.rect.x + right.rect.width &&
    left.rect.x + left.rect.width > right.rect.x &&
    left.rect.y < right.rect.y + right.rect.height &&
    left.rect.y + left.rect.height > right.rect.y;

describe('layoutComponentMap', () => {
    test('lays out blocks, sub-blocks, and components in strict band order', () => {
        const layout = layoutComponentMap(data);

        expect(layout.bands.map(({kind}) => kind)).toEqual(['block', 'sub-block', 'component']);
        expect(layout.bands.map(({nodes}) => nodes.map(({id}) => id))).toEqual([
            ['block:Alpha'],
            ['sub-block:Beta'],
            ['component:Alpha', 'component:Zeta'],
        ]);
        const [blocks, subBlocks, components] = layout.bands;
        const centers = layout.bands.map(({bounds}) => bounds.y + bounds.height / 2);

        expect(blocks.bounds.x).toBeLessThan(subBlocks.bounds.x);
        expect(subBlocks.bounds.x).toBeLessThan(components.bounds.x);
        expect(centers).toEqual([centers[0], centers[0], centers[0]]);

        for (const band of layout.bands) {
            expect(new Set(band.nodes.map(({rect}) => rect.x))).toEqual(new Set([band.bounds.x]));
            expect(band.nodes.map(({rect}) => rect.y)).toEqual(
                [...band.nodes.map(({rect}) => rect.y)].sort((left, right) => left - right),
            );
        }
    });

    test('does not overlap any node rectangles', () => {
        const {nodes} = layoutComponentMap(data);

        for (let index = 0; index < nodes.length; index += 1) {
            for (let comparedIndex = index + 1; comparedIndex < nodes.length; comparedIndex += 1) {
                expect(rectanglesOverlap(nodes[index], nodes[comparedIndex])).toBe(false);
            }
        }
    });

    test('uses the widest complete label for every node in its group', () => {
        const canvasContextDescriptor = Object.getOwnPropertyDescriptor(
            globalThis,
            'CanvasRenderingContext2D',
        );
        Object.defineProperty(globalThis, 'CanvasRenderingContext2D', {
            configurable: true,
            value: class {},
        });
        const measureText = jest.fn((value: string) => ({width: value.length * 10}));
        const getContext = jest
            .spyOn(HTMLCanvasElement.prototype, 'getContext')
            .mockReturnValue({measureText} as unknown as CanvasRenderingContext2D);
        const longLabel = 'ComponentWithACompletePublicExportNameThatMustNeverBeShortened';
        const layout = layoutComponentMap({
            nodes: [
                data.nodes[0],
                {
                    id: `component:${longLabel}`,
                    kind: 'component',
                    exportName: longLabel,
                    label: longLabel,
                },
                data.nodes[2],
            ],
            edges: [],
        });
        const componentWidths = layout.bands
            .find(({kind}) => kind === 'component')
            ?.nodes.map(({rect}) => rect.width);
        const blockWidth = layout.nodes.find(({id}) => id === 'block:Alpha')?.rect.width;

        expect(measureText).toHaveBeenCalledWith(longLabel);
        expect(new Set(componentWidths)).toEqual(new Set([longLabel.length * 10 + 32]));
        expect(blockWidth).toBe(208);
        expect(componentWidths?.[0]).toBeGreaterThan(blockWidth as number);

        getContext.mockRestore();
        if (canvasContextDescriptor) {
            Object.defineProperty(globalThis, 'CanvasRenderingContext2D', canvasContextDescriptor);
        } else {
            Reflect.deleteProperty(globalThis, 'CanvasRenderingContext2D');
        }
    });

    test('reserves a same-group arc corridor before the next group', () => {
        const layout = layoutComponentMap({
            nodes: [
                {id: 'block:A', kind: 'block', exportName: 'A', label: 'A'},
                {id: 'block:B', kind: 'block', exportName: 'B', label: 'B'},
                {id: 'sub-block:C', kind: 'sub-block', exportName: 'C', label: 'C'},
            ],
            edges: [{source: 'block:A', target: 'block:B'}],
        });
        const [blocks, subBlocks] = layout.bands;
        const edge = layout.edges[0];
        const reservedCorridor = getSameGroupArcOutset(edge.source, edge.target) + ARROW_SIZE;

        expect(subBlocks.bounds.x - (blocks.bounds.x + blocks.bounds.width)).toBe(
            reservedCorridor + GROUP_GAP,
        );
    });

    test('keeps empty groups finite, centered, and horizontally ordered', () => {
        const layout = layoutComponentMap({nodes: [], edges: []});
        const centers = layout.bands.map(({bounds}) => bounds.y + bounds.height / 2);

        expect(layout.bands.map(({kind}) => kind)).toEqual(['block', 'sub-block', 'component']);
        expect(layout.bands.map(({bounds}) => bounds.x)).toEqual(
            [...layout.bands.map(({bounds}) => bounds.x)].sort((left, right) => left - right),
        );
        expect(centers).toEqual([centers[0], centers[0], centers[0]]);
        expect(Number.isFinite(layout.bounds.width)).toBe(true);
        expect(Number.isFinite(layout.bounds.height)).toBe(true);
    });

    test('includes the rightmost same-group arc in world bounds', () => {
        const layout = layoutComponentMap({
            nodes: [
                {id: 'component:A', kind: 'component', exportName: 'A', label: 'A'},
                {id: 'component:B', kind: 'component', exportName: 'B', label: 'B'},
            ],
            edges: [{source: 'component:A', target: 'component:B'}],
        });
        const components = layout.bands[2];
        const edge = layout.edges[0];

        expect(layout.bounds.width).toBe(
            components.bounds.x +
                components.bounds.width +
                getSameGroupArcOutset(edge.source, edge.target) +
                ARROW_SIZE +
                WORLD_PADDING,
        );
    });
});

describe('hitTest', () => {
    test('returns the node containing the point at its center', () => {
        const layout = layoutComponentMap(data);
        const target = layout.nodes.find(({id}) => id === 'component:Alpha') as LayoutNode;

        expect(
            hitTest(layout, {
                x: target.rect.x + target.rect.width / 2,
                y: target.rect.y + target.rect.height / 2,
            }),
        ).toMatchObject({id: 'component:Alpha'});
    });

    test('checks overlapping rectangles in reverse draw order', () => {
        const layout = layoutComponentMap(data);
        const first = layout.nodes[0];
        const last = {...layout.nodes[layout.nodes.length - 1], rect: first.rect};

        expect(
            hitTest([first, last], {
                x: first.rect.x + first.rect.width / 2,
                y: first.rect.y + first.rect.height / 2,
            }),
        ).toMatchObject({id: last.id});
    });
});
