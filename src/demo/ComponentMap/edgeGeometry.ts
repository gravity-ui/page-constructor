import {getEdgeKey} from './graph';
import type {LayoutEdge, LayoutNode, Point} from './model';

export const ARROW_SIZE = 12;
export const EDGE_CURVE_SEGMENTS = 24;
export const EDGE_HIT_TOLERANCE = 6;
export const SAME_GROUP_ARC_MIN_OUTSET = 64;
export const SAME_GROUP_ARC_SPAN_FACTOR = 0.25;

export interface EdgeGeometry {
    start: Point;
    end: Point;
    firstControl: Point;
    secondControl: Point;
    arrowhead: [Point, Point, Point];
}

const distance = (left: Point, right: Point) => Math.hypot(left.x - right.x, left.y - right.y);

const getNodeCenter = (node: LayoutNode): Point => ({
    x: node.rect.x + node.rect.width / 2,
    y: node.rect.y + node.rect.height / 2,
});

export function getSameGroupArcOutset(source: LayoutNode, target: LayoutNode): number {
    const sourceCenter = getNodeCenter(source);
    const targetCenter = getNodeCenter(target);
    return Math.max(
        SAME_GROUP_ARC_MIN_OUTSET,
        Math.abs(targetCenter.y - sourceCenter.y) * SAME_GROUP_ARC_SPAN_FACTOR,
    );
}

function distanceToSegment(point: Point, start: Point, end: Point) {
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    const lengthSquared = deltaX * deltaX + deltaY * deltaY;
    if (lengthSquared === 0) {
        return distance(point, start);
    }
    const ratio = Math.max(
        0,
        Math.min(1, ((point.x - start.x) * deltaX + (point.y - start.y) * deltaY) / lengthSquared),
    );
    return distance(point, {x: start.x + ratio * deltaX, y: start.y + ratio * deltaY});
}

function triangleSign(point: Point, first: Point, second: Point) {
    return (
        (point.x - second.x) * (first.y - second.y) - (first.x - second.x) * (point.y - second.y)
    );
}

function isInsideTriangle(point: Point, [first, second, third]: [Point, Point, Point]) {
    const firstSign = triangleSign(point, first, second);
    const secondSign = triangleSign(point, second, third);
    const thirdSign = triangleSign(point, third, first);
    const hasNegative = firstSign < 0 || secondSign < 0 || thirdSign < 0;
    const hasPositive = firstSign > 0 || secondSign > 0 || thirdSign > 0;
    return !(hasNegative && hasPositive);
}

export function getEdgeGeometry(source: LayoutNode, target: LayoutNode): EdgeGeometry {
    const sourceCenter = getNodeCenter(source);
    const targetCenter = getNodeCenter(target);
    let start: Point;
    let end: Point;
    let firstControl: Point;
    let secondControl: Point;

    if (source.kind === target.kind) {
        start = {x: source.rect.x + source.rect.width, y: sourceCenter.y};
        end = {x: target.rect.x + target.rect.width, y: targetCenter.y};
        const arcX = Math.max(start.x, end.x) + getSameGroupArcOutset(source, target);
        firstControl = {x: arcX, y: start.y};
        secondControl = {x: arcX, y: end.y};
    } else {
        const direction = targetCenter.x >= sourceCenter.x ? 1 : -1;
        start = {
            x: sourceCenter.x + (source.rect.width / 2) * direction,
            y: sourceCenter.y,
        };
        end = {
            x: targetCenter.x - (target.rect.width / 2) * direction,
            y: targetCenter.y,
        };
        const controlX = (start.x + end.x) / 2;
        firstControl = {x: controlX, y: start.y};
        secondControl = {x: controlX, y: end.y};
    }
    const angle = Math.atan2(end.y - secondControl.y, end.x - secondControl.x);
    const arrowhead: [Point, Point, Point] = [
        end,
        {
            x: end.x - ARROW_SIZE * Math.cos(angle - Math.PI / 6),
            y: end.y - ARROW_SIZE * Math.sin(angle - Math.PI / 6),
        },
        {
            x: end.x - ARROW_SIZE * Math.cos(angle + Math.PI / 6),
            y: end.y - ARROW_SIZE * Math.sin(angle + Math.PI / 6),
        },
    ];

    return {start, end, firstControl, secondControl, arrowhead};
}

export function getCubicBezierPoint(geometry: EdgeGeometry, ratio: number): Point {
    const inverse = 1 - ratio;
    return {
        x:
            inverse ** 3 * geometry.start.x +
            3 * inverse ** 2 * ratio * geometry.firstControl.x +
            3 * inverse * ratio ** 2 * geometry.secondControl.x +
            ratio ** 3 * geometry.end.x,
        y:
            inverse ** 3 * geometry.start.y +
            3 * inverse ** 2 * ratio * geometry.firstControl.y +
            3 * inverse * ratio ** 2 * geometry.secondControl.y +
            ratio ** 3 * geometry.end.y,
    };
}

export function getEdgeDistance(point: Point, geometry: EdgeGeometry): number {
    if (isInsideTriangle(point, geometry.arrowhead)) {
        return 0;
    }

    let minimum = Number.POSITIVE_INFINITY;
    let previous = geometry.start;
    for (let index = 1; index <= EDGE_CURVE_SEGMENTS; index += 1) {
        const current = getCubicBezierPoint(geometry, index / EDGE_CURVE_SEGMENTS);
        minimum = Math.min(minimum, distanceToSegment(point, previous, current));
        previous = current;
    }

    for (let index = 0; index < geometry.arrowhead.length; index += 1) {
        minimum = Math.min(
            minimum,
            distanceToSegment(
                point,
                geometry.arrowhead[index],
                geometry.arrowhead[(index + 1) % geometry.arrowhead.length],
            ),
        );
    }
    return minimum;
}

export const getEdgeHitTolerance = (scale: number) =>
    EDGE_HIT_TOLERANCE / Math.max(scale, Number.EPSILON);

export function orderEdgesForInteraction(
    edges: LayoutEdge[],
    hoveredEdgeKey: string | undefined,
    selectedEdgeKeys: ReadonlySet<string>,
): LayoutEdge[] {
    const priority = (edge: LayoutEdge) => {
        const key = getEdgeKey(edge.source.id, edge.target.id);
        if (selectedEdgeKeys.has(key)) {
            return 2;
        }
        return key === hoveredEdgeKey ? 1 : 0;
    };

    return edges
        .map((edge, index) => ({edge, index, priority: priority(edge)}))
        .sort((left, right) => left.priority - right.priority || left.index - right.index)
        .map(({edge}) => edge);
}

export function hitTestEdge(
    edges: LayoutEdge[],
    point: Point,
    tolerance: number,
): LayoutEdge | undefined {
    let closest: LayoutEdge | undefined;
    let closestDistance = Number.POSITIVE_INFINITY;
    for (let index = edges.length - 1; index >= 0; index -= 1) {
        const edge = edges[index];
        const edgeDistance = getEdgeDistance(point, getEdgeGeometry(edge.source, edge.target));
        if (edgeDistance <= tolerance && (!closest || edgeDistance < closestDistance)) {
            closest = edge;
            closestDistance = edgeDistance;
        }
    }
    return closest;
}
