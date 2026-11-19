import {
    ARROW_SIZE,
    EDGE_CURVE_SEGMENTS,
    SAME_GROUP_ARC_MIN_OUTSET,
    SAME_GROUP_ARC_SPAN_FACTOR,
    getCubicBezierPoint,
    getEdgeDistance,
    getEdgeGeometry,
    getEdgeHitTolerance,
    getSameGroupArcOutset,
    hitTestEdge,
    orderEdgesForInteraction,
} from '../edgeGeometry';
import {getEdgeKey} from '../graph';
import type {ComponentMapNodeKind, LayoutEdge, LayoutNode} from '../model';

const node = (
    id: string,
    x: number,
    y: number,
    kind: ComponentMapNodeKind = 'component',
    width = 100,
): LayoutNode => ({
    id,
    kind,
    exportName: id,
    label: id,
    rect: {x, y, width, height: 40},
});

const forward: LayoutEdge = {
    source: node('forward-source', 0, 0, 'block'),
    target: node('forward-target', 300, 100),
};
const reverse: LayoutEdge = {
    source: node('reverse-source', 300, 100),
    target: node('reverse-target', 0, 0, 'block'),
};
const sameGroup: LayoutEdge = {
    source: node('same-source', 500, 0),
    target: node('same-target', 500, 120),
};

test('routes inter-group edges between facing horizontal sides', () => {
    expect(getEdgeGeometry(forward.source, forward.target)).toMatchObject({
        start: {x: 100, y: 20},
        end: {x: 300, y: 120},
        firstControl: {x: 200, y: 20},
        secondControl: {x: 200, y: 120},
    });
    expect(getEdgeGeometry(reverse.source, reverse.target)).toMatchObject({
        start: {x: 300, y: 120},
        end: {x: 100, y: 20},
        firstControl: {x: 200, y: 120},
        secondControl: {x: 200, y: 20},
    });
});

test('routes same-group edges as arcs on the right side', () => {
    expect(SAME_GROUP_ARC_MIN_OUTSET).toBe(64);
    expect(SAME_GROUP_ARC_SPAN_FACTOR).toBe(0.25);
    expect(getSameGroupArcOutset(sameGroup.source, sameGroup.target)).toBe(64);
    expect(getEdgeGeometry(sameGroup.source, sameGroup.target)).toMatchObject({
        start: {x: 600, y: 20},
        end: {x: 600, y: 140},
        firstControl: {x: 664, y: 20},
        secondControl: {x: 664, y: 140},
    });
});

test('widens a same-group arc for a longer vertical span', () => {
    const longTarget = node('long-target', 500, 400);

    expect(getSameGroupArcOutset(sameGroup.source, longTarget)).toBe(100);
    expect(getEdgeGeometry(sameGroup.source, longTarget).firstControl.x).toBe(700);
});

test('approaches a same-group target from the right', () => {
    const geometry = getEdgeGeometry(sameGroup.source, sameGroup.target);
    const [, left, right] = geometry.arrowhead;

    expect(left.x).toBeGreaterThan(geometry.end.x);
    expect(right.x).toBeGreaterThan(geometry.end.x);
});

test('uses a 12-pixel arrowhead and 24 curve segments', () => {
    const geometry = getEdgeGeometry(sameGroup.source, sameGroup.target);
    const [, left, right] = geometry.arrowhead;

    expect(ARROW_SIZE).toBe(12);
    expect(EDGE_CURVE_SEGMENTS).toBe(24);
    expect(Math.hypot(left.x - geometry.end.x, left.y - geometry.end.y)).toBeCloseTo(ARROW_SIZE);
    expect(Math.hypot(right.x - geometry.end.x, right.y - geometry.end.y)).toBeCloseTo(ARROW_SIZE);
});

test('measures points on the curve and inside the arrow as edge hits', () => {
    const geometry = getEdgeGeometry(sameGroup.source, sameGroup.target);
    const curvePoint = getCubicBezierPoint(geometry, 0.5);
    const arrowCenter = {
        x: geometry.arrowhead.reduce((sum, point) => sum + point.x, 0) / 3,
        y: geometry.arrowhead.reduce((sum, point) => sum + point.y, 0) / 3,
    };

    expect(getEdgeDistance(curvePoint, geometry)).toBeCloseTo(0);
    expect(getEdgeDistance(arrowCenter, geometry)).toBe(0);
});

test('keeps a six-CSS-pixel hit tolerance at every scale', () => {
    expect(getEdgeHitTolerance(0.5)).toBe(12);
    expect(getEdgeHitTolerance(1)).toBe(6);
    expect(getEdgeHitTolerance(3)).toBe(2);
});

test('returns the closest edge and uses reverse order for equal distances', () => {
    const nearby: LayoutEdge = {
        source: node('near-source', 0, 0),
        target: node('near-target', 0, 120),
    };
    const overlapping: LayoutEdge = {
        source: node('overlap-source', 0, 0),
        target: node('overlap-target', 0, 120),
    };
    const distant: LayoutEdge = {
        source: node('far-source', 100, 0),
        target: node('far-target', 100, 120),
    };

    expect(hitTestEdge([distant, nearby], {x: 148, y: 80}, 6)).toBe(nearby);
    expect(hitTestEdge([nearby, overlapping], {x: 148, y: 80}, 6)).toBe(overlapping);
    expect(hitTestEdge([nearby, distant], {x: 350, y: 80}, 6)).toBeUndefined();
});

test('orders ordinary, hovered, and selected edges while preserving each priority order', () => {
    const ordinaryFirst: LayoutEdge = {
        source: node('ordinary-first-source', 0, 0),
        target: node('ordinary-first-target', 0, 120),
    };
    const selectedFirst: LayoutEdge = {
        source: node('selected-first-source', 100, 0),
        target: node('selected-first-target', 100, 120),
    };
    const hovered: LayoutEdge = {
        source: node('hovered-source', 200, 0),
        target: node('hovered-target', 200, 120),
    };
    const ordinarySecond: LayoutEdge = {
        source: node('ordinary-second-source', 300, 0),
        target: node('ordinary-second-target', 300, 120),
    };
    const selectedSecond: LayoutEdge = {
        source: node('selected-second-source', 400, 0),
        target: node('selected-second-target', 400, 120),
    };

    expect(
        orderEdgesForInteraction(
            [ordinaryFirst, selectedFirst, hovered, ordinarySecond, selectedSecond],
            getEdgeKey(hovered.source.id, hovered.target.id),
            new Set([
                getEdgeKey(selectedFirst.source.id, selectedFirst.target.id),
                getEdgeKey(selectedSecond.source.id, selectedSecond.target.id),
            ]),
        ),
    ).toEqual([ordinaryFirst, ordinarySecond, hovered, selectedFirst, selectedSecond]);
});
