import {hitTest, layoutComponentMap} from '../../../../.storybook/component-map/layout';
import type {ComponentMapData, LayoutNode} from '../../../../.storybook/component-map/model';

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
        expect(layout.bands[0].bounds.y).toBeLessThan(layout.bands[1].bounds.y);
        expect(layout.bands[1].bounds.y).toBeLessThan(layout.bands[2].bounds.y);
    });

    test('does not overlap any node rectangles', () => {
        const {nodes} = layoutComponentMap(data);

        for (let index = 0; index < nodes.length; index += 1) {
            for (let comparedIndex = index + 1; comparedIndex < nodes.length; comparedIndex += 1) {
                expect(rectanglesOverlap(nodes[index], nodes[comparedIndex])).toBe(false);
            }
        }
    });

    test('expands long-label nodes while retaining the minimum node width', () => {
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
            ],
            edges: [],
        });

        expect(measureText).toHaveBeenCalledWith(longLabel);
        expect(layout.nodes.find(({id}) => id === 'component:Zeta')?.rect.width).toBe(208);
        expect(
            layout.nodes.find(({id}) => id === `component:${longLabel}`)?.rect.width,
        ).toBeGreaterThan(208);

        getContext.mockRestore();
        if (canvasContextDescriptor) {
            Object.defineProperty(globalThis, 'CanvasRenderingContext2D', canvasContextDescriptor);
        } else {
            Reflect.deleteProperty(globalThis, 'CanvasRenderingContext2D');
        }
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
