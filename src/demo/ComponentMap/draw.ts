import {getEdgeGeometry, orderEdgesForInteraction} from './edgeGeometry';
import {getEdgeKey} from './graph';
import {NODE_LABEL_FONT} from './layout';
import type {
    ComponentMapEmphasis,
    ComponentMapLayout,
    LayoutEdge,
    LayoutNode,
    Point,
    ViewportSize,
    ViewportTransform,
} from './model';

export const PALETTE = {
    bandHeading: '#4d5562',
    edge: '#7d8798',
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
const EDGE_WIDTH = 1.5;
const INTERACTIVE_EDGE_WIDTH = 3;
const INTERACTIVE_EDGE_COLOR = '#ffbe5c';

export interface ComponentMapDrawOptions {
    viewport: ViewportSize;
    devicePixelRatio: number;
    selectedNodeId?: string;
    hoveredEdgeKey?: string;
    selectedEdgeKeys: ReadonlySet<string>;
    emphasis: ComponentMapEmphasis;
}

interface DrawEdgeOptions {
    active: boolean;
    hovered: boolean;
    selected: boolean;
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

function drawArrowhead(context: CanvasRenderingContext2D, arrowhead: [Point, Point, Point]) {
    context.beginPath();
    context.moveTo(arrowhead[0].x, arrowhead[0].y);
    context.lineTo(arrowhead[1].x, arrowhead[1].y);
    context.lineTo(arrowhead[2].x, arrowhead[2].y);
    context.closePath();
    context.fill();
}

function drawEdge(
    canvasContext: CanvasRenderingContext2D,
    source: LayoutNode,
    target: LayoutNode,
    {active, hovered, selected}: DrawEdgeOptions,
) {
    const context = canvasContext;
    const {start, end, firstControl, secondControl, arrowhead} = getEdgeGeometry(source, target);
    const color = selected || hovered ? INTERACTIVE_EDGE_COLOR : PALETTE.edge;

    context.save();
    context.globalAlpha = selected || active ? 1 : EDGE_DIMMED_OPACITY;
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineWidth = selected || hovered ? INTERACTIVE_EDGE_WIDTH : EDGE_WIDTH;
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
    drawArrowhead(context, arrowhead);
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

export function drawComponentMap(
    canvasContext: CanvasRenderingContext2D,
    layout: ComponentMapLayout,
    transform: ViewportTransform,
    options: ComponentMapDrawOptions,
) {
    const context = canvasContext;
    const {viewport, devicePixelRatio, selectedNodeId, hoveredEdgeKey, selectedEdgeKeys, emphasis} =
        options;
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

    const edgeState = ({source, target}: LayoutEdge) => {
        const key = getEdgeKey(source.id, target.id);
        return {
            key,
            selected: selectedEdgeKeys.has(key),
            hovered: key === hoveredEdgeKey,
        };
    };
    const orderedEdges = orderEdgesForInteraction(layout.edges, hoveredEdgeKey, selectedEdgeKeys);

    for (const edge of orderedEdges) {
        const {source, target} = edge;
        const {key, selected, hovered} = edgeState(edge);
        const active =
            emphasis.mode === 'none' ||
            (emphasis.mode === 'selection' && emphasis.activeEdgeIds.has(key));
        drawEdge(context, source, target, {active, hovered, selected});
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
}
