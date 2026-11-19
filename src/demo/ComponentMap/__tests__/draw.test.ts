import {PALETTE, drawComponentMap} from '../draw';
import {getEdgeKey} from '../graph';
import type {ComponentMapEmphasis, ComponentMapLayout} from '../model';

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
const thirdNode = {
    id: 'component:C',
    kind: 'component' as const,
    exportName: 'C',
    label: 'C',
    rect: {x: 200, y: 160, width: 208, height: 56},
};
const layout: ComponentMapLayout = {
    nodes: [firstNode, secondNode, thirdNode],
    bands: [],
    edges: [
        {source: firstNode, target: thirdNode},
        {source: firstNode, target: secondNode},
    ],
    bounds: {x: 0, y: 0, width: 408, height: 216},
};
const emphasis: ComponentMapEmphasis = {
    mode: 'search',
    activeNodeIds: new Set(['block:A', 'component:B']),
    activeEdgeIds: new Set(),
};

interface DrawOperation {
    alpha: number;
    fillStyle?: string | CanvasGradient | CanvasPattern;
    lineWidth: number;
    strokeStyle?: string | CanvasGradient | CanvasPattern;
}

const strokeOperations: DrawOperation[] = [];
const fillOperations: DrawOperation[] = [];
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
    stroke,
    translate: jest.fn(),
} as unknown as CanvasRenderingContext2D;

beforeEach(() => {
    strokeOperations.length = 0;
    fillOperations.length = 0;
    stroke.mockClear();
    fill.mockClear();
    stroke.mockImplementation(() =>
        strokeOperations.push({
            alpha: context.globalAlpha,
            lineWidth: context.lineWidth,
            strokeStyle: context.strokeStyle,
        }),
    );
    fill.mockImplementation(() =>
        fillOperations.push({
            alpha: context.globalAlpha,
            fillStyle: context.fillStyle,
            lineWidth: context.lineWidth,
        }),
    );
});

test('draws hovered and selected edges above ordinary edges', () => {
    drawComponentMap(
        context,
        layout,
        {x: 0, y: 0, scale: 1},
        {
            viewport: {width: 600, height: 400},
            devicePixelRatio: 1,
            emphasis,
            hoveredEdgeKey: getEdgeKey('block:A', 'component:B'),
            selectedEdgeKeys: new Set([getEdgeKey('block:A', 'component:C')]),
        },
    );

    expect(strokeOperations.slice(0, 2)).toEqual([
        expect.objectContaining({
            alpha: 0.1,
            lineWidth: 3,
            strokeStyle: '#ffbe5c',
        }),
        expect.objectContaining({
            alpha: 1,
            lineWidth: 3,
            strokeStyle: '#ffbe5c',
        }),
    ]);
    expect(fillOperations.slice(0, 2)).toEqual([
        expect.objectContaining({alpha: 0.1, fillStyle: '#ffbe5c'}),
        expect.objectContaining({alpha: 1, fillStyle: '#ffbe5c'}),
    ]);
});

test('uses the base width for an ordinary active edge', () => {
    drawComponentMap(
        context,
        layout,
        {x: 0, y: 0, scale: 1},
        {
            viewport: {width: 600, height: 400},
            devicePixelRatio: 1,
            emphasis: {mode: 'none', activeNodeIds: new Set(), activeEdgeIds: new Set()},
            selectedEdgeKeys: new Set(),
        },
    );

    expect(strokeOperations[0]).toEqual(
        expect.objectContaining({alpha: 1, lineWidth: 1.5, strokeStyle: PALETTE.edge}),
    );
});
