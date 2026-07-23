import {act, fireEvent, render, screen} from '@testing-library/react';

import {ComponentMap} from '../../../../.storybook/component-map/ComponentMap';
import {layoutComponentMap} from '../../../../.storybook/component-map/layout';
import type {ComponentMapData, ComponentMapNode} from '../../../../.storybook/component-map/model';

const bannerNode: ComponentMapNode = {
    id: 'block:BannerBlock',
    kind: 'block',
    exportName: 'BannerBlock',
    label: 'BannerBlock',
};

const data: ComponentMapData = {
    nodes: [
        bannerNode,
        {
            id: 'component:AnimateBlock',
            kind: 'component',
            exportName: 'AnimateBlock',
            label: 'AnimateBlock',
        },
    ],
    edges: [{source: 'block:BannerBlock', target: 'component:AnimateBlock'}],
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
    stroke: jest.fn(),
    translate,
} as unknown as CanvasRenderingContext2D;

function clickNode(canvas: HTMLElement, node: ComponentMapNode) {
    const layoutNode = layoutComponentMap(data).nodes.find(({id}) => id === node.id);
    if (!layoutNode) {
        throw new Error(`Layout node ${node.id} was not found`);
    }

    const [translateX, translateY] = translate.mock.calls.at(-1) as [number, number];
    const cameraScale = scale.mock.calls.at(-1)?.[0] as number;
    const clientX = (layoutNode.rect.x + layoutNode.rect.width / 2) * cameraScale + translateX;
    const clientY = (layoutNode.rect.y + layoutNode.rect.height / 2) * cameraScale + translateY;

    fireEvent.pointerDown(canvas, {pointerId: 1, clientX, clientY});
    fireEvent.pointerUp(canvas, {pointerId: 1, clientX, clientY});
}

describe('ComponentMap', () => {
    beforeEach(() => {
        jest.clearAllMocks();
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

    test('coordinates accessible controls and keyboard selection', () => {
        render(<ComponentMap data={data} />);

        expect(screen.getByRole('textbox', {name: 'Search components'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Zoom in'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Zoom out'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Fit graph'})).toBeInTheDocument();

        const canvas = screen.getByRole('img', {
            name: 'Significant component dependency map',
        });
        expect(canvas).toHaveAttribute('tabindex', '0');

        fireEvent.focus(canvas);
        fireEvent.keyDown(canvas, {key: 'Enter'});
        expect(screen.getByRole('status')).toHaveTextContent('Selected BannerBlock');

        fireEvent.keyDown(canvas, {key: 'Escape'});
        expect(screen.getByRole('status')).toBeEmptyDOMElement();
    });

    test('does not draw a vertex focus outline until the canvas has DOM focus', () => {
        render(<ComponentMap data={data} />);
        const canvas = screen.getByRole('img', {name: 'Significant component dependency map'});

        expect(setLineDash).not.toHaveBeenCalled();
        fireEvent.focus(canvas);
        expect(setLineDash).toHaveBeenCalledWith([6, 4]);

        setLineDash.mockClear();
        fireEvent.blur(canvas);
        expect(setLineDash).not.toHaveBeenCalled();
    });

    test('keeps search and selection modes mutually exclusive', () => {
        render(<ComponentMap data={data} />);
        const canvas = screen.getByRole('img', {
            name: 'Significant component dependency map',
        });
        const searchInput = screen.getByRole('textbox', {name: 'Search components'});

        fireEvent.focus(canvas);
        fireEvent.keyDown(canvas, {key: 'ArrowDown'});
        fireEvent.keyDown(canvas, {key: 'Enter'});
        expect(screen.getByRole('status')).toHaveTextContent('Selected AnimateBlock');

        fireEvent.focus(searchInput);
        expect(screen.getByRole('status')).toBeEmptyDOMElement();

        fireEvent.focus(canvas);
        fireEvent.keyDown(canvas, {key: 'Enter'});
        expect(screen.getByRole('status')).toHaveTextContent('Selected BannerBlock');

        fireEvent.focus(searchInput);
        fireEvent.change(searchInput, {target: {value: '  animate  '}});
        expect(searchInput).toHaveValue('  animate  ');

        clickNode(canvas, bannerNode);
        expect(searchInput).toHaveValue('');
        expect(screen.getByRole('status')).toHaveTextContent('Selected BannerBlock');
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
