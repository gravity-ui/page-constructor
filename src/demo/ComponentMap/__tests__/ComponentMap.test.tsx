import {act, fireEvent, render, screen} from '@testing-library/react';

import {ComponentMap} from '../ComponentMap';
import {getCubicBezierPoint, getEdgeGeometry} from '../edgeGeometry';
import {layoutComponentMap} from '../layout';
import type {ComponentMapData, ComponentMapNode} from '../model';

const bannerNode: ComponentMapNode = {
    id: 'block:BannerBlock',
    kind: 'block',
    exportName: 'BannerBlock',
    label: 'BannerBlock',
};

const animateNode: ComponentMapNode = {
    id: 'component:AnimateBlock',
    kind: 'component',
    exportName: 'AnimateBlock',
    label: 'AnimateBlock',
};

const cardNode: ComponentMapNode = {
    id: 'component:Card',
    kind: 'component',
    exportName: 'Card',
    label: 'Card',
};

const data: ComponentMapData = {
    nodes: [bannerNode, animateNode, cardNode],
    edges: [
        {source: bannerNode.id, target: animateNode.id},
        {source: bannerNode.id, target: cardNode.id},
    ],
};

class ResizeObserverMock implements ResizeObserver {
    private readonly callback: ResizeObserverCallback;

    constructor(callback: ResizeObserverCallback) {
        this.callback = callback;
    }

    observe(target: Element) {
        this.callback(
            [
                {
                    target,
                    contentRect: target.getBoundingClientRect(),
                } as ResizeObserverEntry,
            ],
            this,
        );
    }

    unobserve() {}

    disconnect() {}
}

class PointerEventMock extends MouseEvent {
    readonly pointerId: number;

    constructor(type: string, init: PointerEventInit = {}) {
        super(type, init);
        this.pointerId = init.pointerId ?? 0;
    }
}

const clearRect = jest.fn();
const scale = jest.fn();
const translate = jest.fn();
const setLineDash = jest.fn();
const strokeOperations: Array<{
    alpha: number;
    lineWidth: number;
    strokeStyle: string | CanvasGradient | CanvasPattern;
}> = [];
const stroke = jest.fn();
const context = {
    arc: jest.fn(),
    beginPath: jest.fn(),
    bezierCurveTo: jest.fn(),
    clearRect,
    closePath: jest.fn(),
    fill: jest.fn(),
    fillText: jest.fn(),
    lineTo: jest.fn(),
    measureText: jest.fn((value: string) => ({width: value.length * 7})),
    moveTo: jest.fn(),
    quadraticCurveTo: jest.fn(),
    resetTransform: jest.fn(),
    restore: jest.fn(),
    save: jest.fn(),
    scale,
    setLineDash,
    stroke,
    translate,
} as unknown as CanvasRenderingContext2D;

stroke.mockImplementation(() =>
    strokeOperations.push({
        alpha: context.globalAlpha,
        lineWidth: context.lineWidth,
        strokeStyle: context.strokeStyle,
    }),
);

function getScreenPoint(worldPoint: {x: number; y: number}) {
    const [translateX, translateY] = translate.mock.calls.at(-1) as [number, number];
    const cameraScale = scale.mock.calls.at(-1)?.[0] as number;
    return {
        clientX: worldPoint.x * cameraScale + translateX,
        clientY: worldPoint.y * cameraScale + translateY,
    };
}

function getEdgePoint(edgeIndex: number) {
    const edge = layoutComponentMap(data).edges[edgeIndex];
    return getScreenPoint(getCubicBezierPoint(getEdgeGeometry(edge.source, edge.target), 0.5));
}

function clickEdge(
    canvas: HTMLElement,
    edgeIndex: number,
    modifiers: {ctrlKey?: boolean; metaKey?: boolean} = {},
) {
    const point = getEdgePoint(edgeIndex);
    fireEvent.pointerDown(canvas, {pointerId: 1, ...point, ...modifiers});
    fireEvent.pointerUp(canvas, {pointerId: 1, ...point, ...modifiers});
}

function clickNode(canvas: HTMLElement, node: ComponentMapNode) {
    const layoutNode = layoutComponentMap(data).nodes.find(({id}) => id === node.id);
    if (!layoutNode) {
        throw new Error(`Layout node ${node.id} was not found`);
    }

    const {clientX, clientY} = getScreenPoint({
        x: layoutNode.rect.x + layoutNode.rect.width / 2,
        y: layoutNode.rect.y + layoutNode.rect.height / 2,
    });

    fireEvent.pointerDown(canvas, {pointerId: 1, clientX, clientY});
    fireEvent.pointerUp(canvas, {pointerId: 1, clientX, clientY});
}

describe('ComponentMap', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        strokeOperations.length = 0;
        window.ResizeObserver = ResizeObserverMock;
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
            callback(0);
            return 1;
        });
        jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined);
        jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context);
        jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
            x: 0,
            y: 0,
            top: 0,
            right: 800,
            bottom: 600,
            left: 0,
            width: 800,
            height: 600,
            toJSON: () => ({}),
        });
        Object.defineProperties(HTMLCanvasElement.prototype, {
            setPointerCapture: {configurable: true, value: jest.fn()},
            hasPointerCapture: {configurable: true, value: jest.fn(() => true)},
            releasePointerCapture: {configurable: true, value: jest.fn()},
        });
        Object.defineProperty(window, 'PointerEvent', {
            configurable: true,
            value: PointerEventMock,
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('coordinates accessible controls and Escape selection reset', () => {
        render(<ComponentMap data={data} />);

        expect(screen.getByRole('textbox', {name: 'Search components'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Zoom in'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Zoom out'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Fit graph'})).toBeInTheDocument();

        const canvas = screen.getByRole('img', {
            name: 'Significant component dependency map',
        });
        expect(canvas).toHaveAttribute('tabindex', '0');

        clickNode(canvas, bannerNode);
        expect(screen.getByRole('status')).toHaveTextContent('Selected BannerBlock');

        fireEvent.keyDown(canvas, {key: 'Escape'});
        expect(screen.getByRole('status')).toBeEmptyDOMElement();
    });

    test('keeps search and selection modes mutually exclusive', () => {
        render(<ComponentMap data={data} />);
        const canvas = screen.getByRole('img', {
            name: 'Significant component dependency map',
        });
        const searchInput = screen.getByRole('textbox', {name: 'Search components'});

        clickNode(canvas, animateNode);
        expect(screen.getByRole('status')).toHaveTextContent('Selected AnimateBlock');

        fireEvent.focus(searchInput);
        expect(screen.getByRole('status')).toBeEmptyDOMElement();

        clickNode(canvas, bannerNode);
        expect(screen.getByRole('status')).toHaveTextContent('Selected BannerBlock');

        fireEvent.focus(searchInput);
        fireEvent.change(searchInput, {target: {value: '  animate  '}});
        expect(searchInput).toHaveValue('  animate  ');

        clickNode(canvas, bannerNode);
        expect(searchInput).toHaveValue('');
        expect(screen.getByRole('status')).toHaveTextContent('Selected BannerBlock');
    });

    test('uses pointer cursor for vertices and edges and clears it on leave', () => {
        render(<ComponentMap data={data} />);
        const canvas = screen.getByRole('img', {name: 'Significant component dependency map'});
        const firstNode = layoutComponentMap(data).nodes[0];

        fireEvent.pointerMove(canvas, {
            pointerId: 1,
            ...getScreenPoint({
                x: firstNode.rect.x + firstNode.rect.width / 2,
                y: firstNode.rect.y + firstNode.rect.height / 2,
            }),
        });
        expect(canvas.className).toContain('pc-component-map__canvas_interactive');

        fireEvent.pointerMove(canvas, {pointerId: 1, ...getEdgePoint(0)});
        expect(canvas.className).toContain('pc-component-map__canvas_interactive');

        fireEvent.pointerLeave(canvas);
        expect(canvas.className).not.toContain('pc-component-map__canvas_interactive');
    });

    test('replaces and toggles selected edges with Ctrl or Cmd', () => {
        render(<ComponentMap data={data} />);
        const canvas = screen.getByRole('img', {name: 'Significant component dependency map'});

        strokeOperations.length = 0;
        clickEdge(canvas, 0);
        expect(strokeOperations.filter(({strokeStyle}) => strokeStyle === '#ffbe5c')).toHaveLength(
            1,
        );

        strokeOperations.length = 0;
        clickEdge(canvas, 1, {ctrlKey: true});
        expect(strokeOperations.filter(({strokeStyle}) => strokeStyle === '#ffbe5c')).toHaveLength(
            2,
        );

        strokeOperations.length = 0;
        clickEdge(canvas, 0, {metaKey: true});
        expect(strokeOperations.filter(({strokeStyle}) => strokeStyle === '#ffbe5c')).toHaveLength(
            1,
        );

        strokeOperations.length = 0;
        clickEdge(canvas, 0);
        expect(strokeOperations.filter(({strokeStyle}) => strokeStyle === '#ffbe5c')).toHaveLength(
            1,
        );
    });

    test('keeps vertex and search state when selecting an edge', () => {
        render(<ComponentMap data={data} />);
        const canvas = screen.getByRole('img', {name: 'Significant component dependency map'});
        const search = screen.getByRole('textbox', {name: 'Search components'});

        clickNode(canvas, bannerNode);
        expect(screen.getByRole('status')).toHaveTextContent('Selected BannerBlock');
        fireEvent.focus(search);
        fireEvent.change(search, {target: {value: 'animate'}});
        clickEdge(canvas, 0);

        expect(search).toHaveValue('animate');
        expect(screen.getByRole('status')).toBeEmptyDOMElement();

        clickNode(canvas, bannerNode);
        expect(screen.getByRole('status')).toHaveTextContent('Selected BannerBlock');
        clickEdge(canvas, 0);
        expect(screen.getByRole('status')).toHaveTextContent('Selected BannerBlock');
    });

    test.each([
        ['a vertex click', (canvas: HTMLElement) => clickNode(canvas, bannerNode)],
        [
            'an empty canvas click',
            (canvas: HTMLElement) => {
                fireEvent.pointerDown(canvas, {pointerId: 1, clientX: 5, clientY: 5});
                fireEvent.pointerUp(canvas, {pointerId: 1, clientX: 5, clientY: 5});
            },
        ],
        [
            'search input focus',
            () => fireEvent.focus(screen.getByRole('textbox', {name: 'Search components'})),
        ],
        ['Escape', (canvas: HTMLElement) => fireEvent.keyDown(canvas, {key: 'Escape'})],
    ])('clears edge selection after %s', (_label, resetSelection) => {
        render(<ComponentMap data={data} />);
        const canvas = screen.getByRole('img', {name: 'Significant component dependency map'});

        clickEdge(canvas, 0);
        strokeOperations.length = 0;
        resetSelection(canvas);
        fireEvent.pointerMove(canvas, {pointerId: 1, clientX: 5, clientY: 5});

        expect(strokeOperations.some(({strokeStyle}) => strokeStyle === '#ffbe5c')).toBe(false);
    });

    test('gives a vertex hit priority over an edge endpoint', () => {
        render(<ComponentMap data={data} />);
        const canvas = screen.getByRole('img', {name: 'Significant component dependency map'});
        const firstEdge = layoutComponentMap(data).edges[0];
        const point = getScreenPoint(getEdgeGeometry(firstEdge.source, firstEdge.target).start);

        strokeOperations.length = 0;
        fireEvent.pointerDown(canvas, {pointerId: 1, ...point});
        fireEvent.pointerUp(canvas, {pointerId: 1, ...point});

        expect(screen.getByRole('status')).toHaveTextContent(`Selected ${firstEdge.source.label}`);
        expect(strokeOperations.some(({strokeStyle}) => strokeStyle === '#ffbe5c')).toBe(false);
    });

    test('ignores removed keyboard commands', () => {
        render(<ComponentMap data={data} />);
        const canvas = screen.getByRole('img', {name: 'Significant component dependency map'});
        scale.mockClear();

        for (const key of ['ArrowDown', 'ArrowUp', 'Enter', ' ', '+', '=', '-', '_', '0']) {
            fireEvent.keyDown(canvas, {key});
        }

        expect(screen.getByRole('status')).toBeEmptyDOMElement();
        expect(scale).not.toHaveBeenCalled();
    });

    test('renders a message instead of a canvas for empty data', () => {
        render(<ComponentMap data={{nodes: [], edges: []}} />);

        expect(screen.getByText('No significant components found')).toBeInTheDocument();
        expect(
            screen.queryByRole('img', {name: 'Significant component dependency map'}),
        ).not.toBeInTheDocument();
    });

    test('draws the complete label without an ellipsis', () => {
        const longLabel = 'ComponentWithACompletePublicExportNameThatMustNeverBeShortened';

        render(
            <ComponentMap
                data={{
                    nodes: [
                        {
                            id: `component:${longLabel}`,
                            kind: 'component',
                            exportName: longLabel,
                            label: longLabel,
                        },
                    ],
                    edges: [],
                }}
            />,
        );

        expect(context.fillText).toHaveBeenCalledWith(
            longLabel,
            expect.any(Number),
            expect.any(Number),
        );
    });

    test('uses a non-passive native wheel listener for zoom and removes it on cleanup', () => {
        const addEventListener = jest.spyOn(HTMLCanvasElement.prototype, 'addEventListener');
        const removeEventListener = jest.spyOn(HTMLCanvasElement.prototype, 'removeEventListener');
        const {unmount} = render(<ComponentMap data={data} />);
        const canvas = screen.getByRole('img', {
            name: 'Significant component dependency map',
        });
        const wheelRegistration = addEventListener.mock.calls
            .filter(([type]) => type === 'wheel')
            .at(-1);

        expect(wheelRegistration?.[2]).toEqual({passive: false});
        const listener = wheelRegistration?.[1];
        const initialScale = scale.mock.calls.at(-1)?.[0];
        scale.mockClear();
        const wheelEvent = new WheelEvent('wheel', {
            bubbles: true,
            cancelable: true,
            clientX: 400,
            clientY: 300,
            deltaY: -100,
        });

        act(() => canvas.dispatchEvent(wheelEvent));

        expect(wheelEvent.defaultPrevented).toBe(true);
        expect(scale.mock.calls.at(-1)?.[0]).toBeGreaterThan(initialScale);

        unmount();
        expect(removeEventListener).toHaveBeenCalledWith('wheel', listener, false);
    });

    test('does not pan for sub-threshold pointer movement followed by a click', () => {
        render(<ComponentMap data={data} />);
        const canvas = screen.getByRole('img', {
            name: 'Significant component dependency map',
        });
        translate.mockClear();

        fireEvent.pointerDown(canvas, {pointerId: 1, clientX: 20, clientY: 20});
        fireEvent.pointerMove(canvas, {pointerId: 1, clientX: 22, clientY: 20});
        fireEvent.pointerUp(canvas, {pointerId: 1, clientX: 22, clientY: 20});

        expect(translate).not.toHaveBeenCalled();
    });

    test('pans after pointer movement crosses the drag threshold', () => {
        render(<ComponentMap data={data} />);
        const canvas = screen.getByRole('img', {
            name: 'Significant component dependency map',
        });
        const initialTranslation = translate.mock.calls.at(-1) as [number, number];
        translate.mockClear();

        fireEvent.pointerDown(canvas, {pointerId: 1, clientX: 20, clientY: 20});
        fireEvent.pointerMove(canvas, {pointerId: 1, clientX: 30, clientY: 20});

        expect(translate).toHaveBeenLastCalledWith(
            initialTranslation[0] + 10,
            initialTranslation[1],
        );

        fireEvent.pointerUp(canvas, {pointerId: 1, clientX: 30, clientY: 20});
    });

    test('pans when pointer release first crosses the drag threshold', () => {
        render(<ComponentMap data={data} />);
        const canvas = screen.getByRole('img', {
            name: 'Significant component dependency map',
        });
        const initialTranslation = translate.mock.calls.at(-1) as [number, number];
        translate.mockClear();

        fireEvent.pointerDown(canvas, {pointerId: 1, clientX: 20, clientY: 20});
        fireEvent.pointerUp(canvas, {pointerId: 1, clientX: 30, clientY: 20});

        expect(translate).toHaveBeenLastCalledWith(
            initialTranslation[0] + 10,
            initialTranslation[1],
        );
    });

    test('includes the final pointer release delta after an earlier drag move', () => {
        render(<ComponentMap data={data} />);
        const canvas = screen.getByRole('img', {
            name: 'Significant component dependency map',
        });
        const initialTranslation = translate.mock.calls.at(-1) as [number, number];

        fireEvent.pointerDown(canvas, {pointerId: 1, clientX: 20, clientY: 20});
        fireEvent.pointerMove(canvas, {pointerId: 1, clientX: 30, clientY: 20});
        translate.mockClear();
        fireEvent.pointerUp(canvas, {pointerId: 1, clientX: 35, clientY: 20});

        expect(translate).toHaveBeenLastCalledWith(
            initialTranslation[0] + 15,
            initialTranslation[1],
        );
    });

    test('hit-tests a sub-threshold release against the unchanged camera', () => {
        render(<ComponentMap data={data} />);
        const canvas = screen.getByRole('img', {
            name: 'Significant component dependency map',
        });
        const [translateX, translateY] = translate.mock.calls.at(-1) as [number, number];
        const cameraScale = scale.mock.calls.at(-1)?.[0] as number;
        const firstNode = layoutComponentMap(data).nodes[0];
        const rightEdge = (firstNode.rect.x + firstNode.rect.width) * cameraScale + translateX;
        const centerY = (firstNode.rect.y + firstNode.rect.height / 2) * cameraScale + translateY;

        fireEvent.pointerDown(canvas, {
            pointerId: 1,
            clientX: rightEdge - 1,
            clientY: centerY,
        });
        fireEvent.pointerUp(canvas, {
            pointerId: 1,
            clientX: rightEdge + 1,
            clientY: centerY,
        });

        expect(screen.getByRole('status')).toBeEmptyDOMElement();
    });

    test('starts observing and drawing when empty data becomes populated', () => {
        const {rerender} = render(<ComponentMap data={{nodes: [], edges: []}} />);
        clearRect.mockClear();

        rerender(<ComponentMap data={data} />);

        const canvas = screen.getByRole('img', {
            name: 'Significant component dependency map',
        });
        expect(canvas).toHaveAttribute('width', '800');
        expect(canvas).toHaveAttribute('height', '600');
        expect(clearRect).toHaveBeenCalled();
    });
});
