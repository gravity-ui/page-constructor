import {
    fitToViewport,
    screenToWorld,
    worldToScreen,
    zoomAtPoint,
} from '../../../../.storybook/component-map/viewport';

describe('fitToViewport', () => {
    test('fits world bounds inside the viewport with 24 CSS-pixel padding', () => {
        const transform = fitToViewport(
            {x: 0, y: 0, width: 400, height: 200},
            {width: 248, height: 200},
        );

        expect(transform.scale).toBeCloseTo(0.5);
        expect(transform.x).toBeCloseTo(24);
        expect(transform.y).toBeCloseTo(50);
    });

    test('does not enlarge a graph beyond its world scale', () => {
        expect(
            fitToViewport({x: 0, y: 0, width: 100, height: 100}, {width: 1000, height: 1000}).scale,
        ).toBe(1);
    });

    test('returns a finite, invertible transform for a zero-sized viewport', () => {
        const transform = fitToViewport(
            {x: 0, y: 0, width: 400, height: 200},
            {width: 0, height: 0},
        );
        const screenPoint = {x: 0, y: 0};

        expect(transform.scale).toBeGreaterThan(0);
        expect(Object.values(transform).every(Number.isFinite)).toBe(true);
        expect(worldToScreen(screenToWorld(screenPoint, transform), transform)).toEqual(
            screenPoint,
        );
        expect(
            Object.values(zoomAtPoint(transform, 1.5, screenPoint, 0.5, 2)).every(Number.isFinite),
        ).toBe(true);
    });

    test('returns a finite, invertible transform when the viewport is smaller than its padding', () => {
        const transform = fitToViewport(
            {x: 0, y: 0, width: 400, height: 200},
            {width: 20, height: 30},
        );
        const screenPoint = {x: 10, y: 15};

        expect(transform.scale).toBeGreaterThan(0);
        expect(Object.values(transform).every(Number.isFinite)).toBe(true);
        expect(worldToScreen(screenToWorld(screenPoint, transform), transform)).toEqual(
            screenPoint,
        );
        expect(
            Object.values(zoomAtPoint(transform, 1.5, screenPoint, 0.5, 2)).every(Number.isFinite),
        ).toBe(true);
    });
});

describe('world and screen coordinate conversion', () => {
    test('round-trips a point through the viewport transform', () => {
        const point = {x: 19, y: -7};
        const transform = {x: 130, y: 46, scale: 1.75};

        expect(screenToWorld(worldToScreen(point, transform), transform)).toEqual(point);
    });
});

describe('zoomAtPoint', () => {
    test('keeps the world point under the pointer stable while zooming', () => {
        const pointer = {x: 180, y: 95};
        const transform = {x: 50, y: 20, scale: 1};
        const before = screenToWorld(pointer, transform);
        const afterTransform = zoomAtPoint(transform, 1.5, pointer, 0.5, 2);

        expect(worldToScreen(before, afterTransform)).toEqual(pointer);
    });

    test('clamps zoom to the provided scale range', () => {
        expect(zoomAtPoint({x: 0, y: 0, scale: 1}, 10, {x: 100, y: 100}, 0.5, 2).scale).toBe(2);
    });
});
