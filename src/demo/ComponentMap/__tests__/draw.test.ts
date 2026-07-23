import {drawComponentMap} from '../../../../.storybook/component-map/draw';
import type {
    ComponentMapEmphasis,
    ComponentMapLayout,
} from '../../../../.storybook/component-map/model';

const firstNode = {
    id: 'block:A',
    kind: 'block' as const,
    exportName: 'A',
    label: 'A',
    rect: {x: 0, y: 40, width: 208, height: 56},
};
const secondNode = {
    id: 'component:B',
    kind: 'component' as const,
    exportName: 'B',
    label: 'B',
    rect: {x: 0, y: 160, width: 208, height: 56},
};
const layout: ComponentMapLayout = {
    nodes: [firstNode, secondNode],
    bands: [],
    edges: [{source: firstNode, target: secondNode}],
    bounds: {x: 0, y: 0, width: 208, height: 216},
};
const emphasis: ComponentMapEmphasis = {
    mode: 'search',
    activeNodeIds: new Set(['block:A', 'component:B']),
    activeEdgeIds: new Set(),
};

test('dims every edge in search mode when both endpoint nodes match', () => {
    const strokeAlphas: number[] = [];
    const fillAlphas: number[] = [];
    const stroke = jest.fn();
    const fill = jest.fn();
    const context = {
        globalAlpha: 1,
        arc: jest.fn(),
        beginPath: jest.fn(),
        bezierCurveTo: jest.fn(),
        clearRect: jest.fn(),
        closePath: jest.fn(),
        fill,
        fillText: jest.fn(),
        lineTo: jest.fn(),
        moveTo: jest.fn(),
        quadraticCurveTo: jest.fn(),
        resetTransform: jest.fn(),
        restore: jest.fn(),
        save: jest.fn(),
        scale: jest.fn(),
        setLineDash: jest.fn(),
        stroke,
        translate: jest.fn(),
    } as unknown as CanvasRenderingContext2D;
    stroke.mockImplementation(() => strokeAlphas.push(context.globalAlpha));
    fill.mockImplementation(() => fillAlphas.push(context.globalAlpha));

    drawComponentMap(
        context,
        layout,
        {x: 0, y: 0, scale: 1},
        {
            viewport: {width: 400, height: 300},
            devicePixelRatio: 1,
            emphasis,
        },
    );

    expect(strokeAlphas).toEqual([0.1, 1, 1]);
    expect(fillAlphas).toEqual([0.1, 1, 1]);
});
