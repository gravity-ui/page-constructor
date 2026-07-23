import {getEdgeKey} from './graph';
import {NODE_LABEL_FONT} from './layout';
import type {
    ComponentMapEmphasis,
    ComponentMapLayout,
    LayoutNode,
    Point,
    ViewportSize,
    ViewportTransform,
} from './model';

export const PALETTE = {
    bandHeading: '#4d5562',
    edge: '#7d8798',
    focusOutline: '#225ad6',
    label: '#1f2733',
    nodeFill: {
        block: '#d9e8ff',
        'sub-block': '#e5ddff',
        component: '#e4ebf2',
    },
    nodeOutline: '#748094',
    selectedFill: '#ffbe5c',
    selectedOutline: '#9a5700',
} as const;

const NODE_RADIUS = 10;
const NODE_DIMMED_OPACITY = 0.16;
const EDGE_DIMMED_OPACITY = 0.1;
const ARROW_SIZE = 8;

export interface ComponentMapDrawOptions {
    viewport: ViewportSize;
    devicePixelRatio: number;
    selectedNodeId?: string;
    focusedNodeId?: string;
    emphasis: ComponentMapEmphasis;
}

function roundedRect(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
) {
    const right = x + width;
    const bottom = y + height;

    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(right - radius, y);
    context.quadraticCurveTo(right, y, right, y + radius);
    context.lineTo(right, bottom - radius);
    context.quadraticCurveTo(right, bottom, right - radius, bottom);
    context.lineTo(x + radius, bottom);
    context.quadraticCurveTo(x, bottom, x, bottom - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
}

function getEdgePoints(source: LayoutNode, target: LayoutNode) {
    const sourceCenter = {
        x: source.rect.x + source.rect.width / 2,
        y: source.rect.y + source.rect.height / 2,
    };
    const targetCenter = {
        x: target.rect.x + target.rect.width / 2,
        y: target.rect.y + target.rect.height / 2,
    };

    if (Math.abs(targetCenter.y - sourceCenter.y) >= Math.abs(targetCenter.x - sourceCenter.x)) {
        const direction = targetCenter.y >= sourceCenter.y ? 1 : -1;
        return {
            start: {
                x: sourceCenter.x,
                y: sourceCenter.y + (source.rect.height / 2) * direction,
            },
            end: {
                x: targetCenter.x,
                y: targetCenter.y - (target.rect.height / 2) * direction,
            },
            vertical: true,
        };
    }

    const direction = targetCenter.x >= sourceCenter.x ? 1 : -1;
    return {
        start: {
            x: sourceCenter.x + (source.rect.width / 2) * direction,
            y: sourceCenter.y,
        },
        end: {
            x: targetCenter.x - (target.rect.width / 2) * direction,
            y: targetCenter.y,
        },
        vertical: false,
    };
}

function drawArrowhead(context: CanvasRenderingContext2D, end: Point, previousControl: Point) {
    const angle = Math.atan2(end.y - previousControl.y, end.x - previousControl.x);

    context.beginPath();
    context.moveTo(end.x, end.y);
    context.lineTo(
        end.x - ARROW_SIZE * Math.cos(angle - Math.PI / 6),
        end.y - ARROW_SIZE * Math.sin(angle - Math.PI / 6),
    );
    context.lineTo(
        end.x - ARROW_SIZE * Math.cos(angle + Math.PI / 6),
        end.y - ARROW_SIZE * Math.sin(angle + Math.PI / 6),
    );
    context.closePath();
    context.fill();
}

function drawEdge(
    canvasContext: CanvasRenderingContext2D,
    source: LayoutNode,
    target: LayoutNode,
    active: boolean,
) {
    const context = canvasContext;
    const {start, end, vertical} = getEdgePoints(source, target);
    const firstControl = vertical
        ? {x: start.x, y: (start.y + end.y) / 2}
        : {x: (start.x + end.x) / 2, y: start.y};
    const secondControl = vertical
        ? {x: end.x, y: (start.y + end.y) / 2}
        : {x: (start.x + end.x) / 2, y: end.y};

    context.save();
    context.globalAlpha = active ? 1 : EDGE_DIMMED_OPACITY;
    context.strokeStyle = PALETTE.edge;
    context.fillStyle = PALETTE.edge;
    context.lineWidth = 1.5;
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.bezierCurveTo(
        firstControl.x,
        firstControl.y,
        secondControl.x,
        secondControl.y,
        end.x,
        end.y,
    );
    context.stroke();
    drawArrowhead(context, end, secondControl);
    context.restore();
}

function drawNode(
    canvasContext: CanvasRenderingContext2D,
    node: LayoutNode,
    active: boolean,
    selected: boolean,
) {
    const context = canvasContext;
    const {x, y, width, height} = node.rect;

    context.save();
    context.globalAlpha = active ? 1 : NODE_DIMMED_OPACITY;
    context.fillStyle = selected ? PALETTE.selectedFill : PALETTE.nodeFill[node.kind];
    context.strokeStyle = selected ? PALETTE.selectedOutline : PALETTE.nodeOutline;
    context.lineWidth = selected ? 3 : 1.5;
    roundedRect(context, x, y, width, height, NODE_RADIUS);
    context.fill();
    context.stroke();
    context.restore();
}

function drawLabel(canvasContext: CanvasRenderingContext2D, node: LayoutNode, active: boolean) {
    const context = canvasContext;
    const {x, y, width, height} = node.rect;

    context.save();
    context.globalAlpha = active ? 1 : NODE_DIMMED_OPACITY;
    context.fillStyle = PALETTE.label;
    context.font = NODE_LABEL_FONT;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(node.label, x + width / 2, y + height / 2);
    context.restore();
}

function drawFocusOutline(canvasContext: CanvasRenderingContext2D, node: LayoutNode) {
    const context = canvasContext;
    const offset = 5;
    const {x, y, width, height} = node.rect;

    context.save();
    context.strokeStyle = PALETTE.focusOutline;
    context.lineWidth = 2;
    context.setLineDash([6, 4]);
    roundedRect(
        context,
        x - offset,
        y - offset,
        width + offset * 2,
        height + offset * 2,
        NODE_RADIUS + offset,
    );
    context.stroke();
    context.restore();
}

export function drawComponentMap(
    canvasContext: CanvasRenderingContext2D,
    layout: ComponentMapLayout,
    transform: ViewportTransform,
    options: ComponentMapDrawOptions,
) {
    const context = canvasContext;
    const {viewport, devicePixelRatio, selectedNodeId, focusedNodeId, emphasis} = options;
    const hasEmphasis = emphasis.mode !== 'none';

    context.resetTransform();
    context.scale(devicePixelRatio, devicePixelRatio);
    context.clearRect(0, 0, viewport.width, viewport.height);
    context.translate(transform.x, transform.y);
    context.scale(transform.scale, transform.scale);

    context.save();
    context.fillStyle = PALETTE.bandHeading;
    context.font = '700 18px sans-serif';
    context.textAlign = 'left';
    context.textBaseline = 'top';
    for (const band of layout.bands) {
        context.fillText(band.label, band.bounds.x, band.bounds.y);
    }
    context.restore();

    for (const {source, target} of layout.edges) {
        const active =
            emphasis.mode === 'none' ||
            (emphasis.mode === 'selection' &&
                emphasis.activeEdgeIds.has(getEdgeKey(source.id, target.id)));
        drawEdge(context, source, target, active);
    }

    for (const node of layout.nodes) {
        const active = !hasEmphasis || emphasis.activeNodeIds.has(node.id);
        drawNode(
            context,
            node,
            active,
            emphasis.mode === 'selection' && node.id === selectedNodeId,
        );
    }

    for (const node of layout.nodes) {
        const active = !hasEmphasis || emphasis.activeNodeIds.has(node.id);
        drawLabel(context, node, active);
    }

    const focusedNode = layout.nodes.find(({id}) => id === focusedNodeId);
    if (focusedNode) {
        drawFocusOutline(context, focusedNode);
    }
}
