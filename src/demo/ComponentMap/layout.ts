import {ARROW_SIZE, getSameGroupArcOutset} from './edgeGeometry';
import type {
    ComponentMapData,
    ComponentMapEdge,
    ComponentMapLayout,
    ComponentMapNode,
    ComponentMapNodeKind,
    LayoutBand,
    LayoutEdge,
    LayoutNode,
    Point,
} from './model';

export const NODE_MIN_WIDTH = 208;
export const NODE_HEIGHT = 48;
export const NODE_LABEL_FONT = '600 13px sans-serif';
export const NODE_LABEL_PADDING = 16;
export const VERTICAL_GAP = 32;
export const GROUP_GAP = 112;
export const BAND_HEADER_HEIGHT = 36;
export const WORLD_PADDING = 56;
export const KIND_ORDER = ['block', 'sub-block', 'component'] as const;

const BAND_LABELS: Record<ComponentMapNodeKind, string> = {
    block: 'Blocks',
    'sub-block': 'Sub-blocks',
    component: 'Components',
};

function sortByLabel(nodes: ComponentMapNode[]) {
    return [...nodes].sort((left, right) => left.label.localeCompare(right.label));
}

function createLabelMeasurer() {
    if (typeof CanvasRenderingContext2D !== 'undefined' && typeof document !== 'undefined') {
        try {
            const context = document.createElement('canvas').getContext('2d');
            if (context) {
                context.font = NODE_LABEL_FONT;
                return (label: string) => context.measureText(label).width;
            }
        } catch {
            // Use deterministic metrics when Canvas is unavailable (for example during SSR).
        }
    }

    return (label: string) => Array.from(label).length * 7;
}

interface MeasuredGroup {
    kind: ComponentMapNodeKind;
    label: string;
    nodes: ComponentMapNode[];
    nodeWidth: number;
    visibleHeight: number;
}

const getNodesHeight = (count: number) =>
    count === 0 ? 0 : count * NODE_HEIGHT + (count - 1) * VERTICAL_GAP;

function measureGroup(
    kind: ComponentMapNodeKind,
    nodes: ComponentMapNode[],
    measureLabel: (label: string) => number,
): MeasuredGroup {
    const sortedNodes = sortByLabel(nodes);
    const nodeWidth = Math.max(
        NODE_MIN_WIDTH,
        ...sortedNodes.map(({label}) => measureLabel(label) + NODE_LABEL_PADDING * 2),
    );
    return {
        kind,
        label: BAND_LABELS[kind],
        nodes: sortedNodes,
        nodeWidth,
        visibleHeight: BAND_HEADER_HEIGHT + getNodesHeight(sortedNodes.length),
    };
}

function createBand(group: MeasuredGroup, x: number, y: number): LayoutBand {
    return {
        kind: group.kind,
        label: group.label,
        bounds: {
            x,
            y,
            width: group.nodeWidth,
            height: group.visibleHeight,
        },
        nodes: group.nodes.map((node, index) => ({
            ...node,
            rect: {
                x,
                y: y + BAND_HEADER_HEIGHT + index * (NODE_HEIGHT + VERTICAL_GAP),
                width: group.nodeWidth,
                height: NODE_HEIGHT,
            },
        })),
    };
}

function resolveEdges(
    edges: ComponentMapEdge[],
    nodeById: ReadonlyMap<string, LayoutNode>,
): LayoutEdge[] {
    return edges.map(({source, target}) => {
        const sourceNode = nodeById.get(source);
        const targetNode = nodeById.get(target);
        if (!sourceNode || !targetNode) {
            throw new Error(`Component map edge references unknown node: ${source} -> ${target}`);
        }
        return {source: sourceNode, target: targetNode};
    });
}

export function layoutComponentMap(data: ComponentMapData): ComponentMapLayout {
    const nodesByKind = new Map<ComponentMapNodeKind, ComponentMapNode[]>(
        KIND_ORDER.map((kind) => [kind, []]),
    );
    for (const node of data.nodes) {
        nodesByKind.get(node.kind)?.push(node);
    }

    const measureLabel = createLabelMeasurer();
    const measuredGroups = KIND_ORDER.map((kind) =>
        measureGroup(kind, nodesByKind.get(kind) ?? [], measureLabel),
    );
    const maximumGroupHeight = Math.max(...measuredGroups.map(({visibleHeight}) => visibleHeight));
    const commonCenterY = WORLD_PADDING + maximumGroupHeight / 2;
    const provisionalBands = measuredGroups.map((group) =>
        createBand(group, 0, commonCenterY - group.visibleHeight / 2),
    );
    const provisionalNodes = provisionalBands.flatMap(({nodes}) => nodes);
    const provisionalNodeById = new Map(provisionalNodes.map((node) => [node.id, node]));
    const provisionalEdges = resolveEdges(data.edges, provisionalNodeById);
    const corridorByKind = new Map<ComponentMapNodeKind, number>(
        KIND_ORDER.map((kind) => [kind, 0]),
    );
    for (const edge of provisionalEdges) {
        if (edge.source.kind === edge.target.kind) {
            corridorByKind.set(
                edge.source.kind,
                Math.max(
                    corridorByKind.get(edge.source.kind) ?? 0,
                    getSameGroupArcOutset(edge.source, edge.target) + ARROW_SIZE,
                ),
            );
        }
    }

    let nextGroupX = WORLD_PADDING;
    const bands = provisionalBands.map((band, index) => {
        const x = nextGroupX;
        const placedBand: LayoutBand = {
            ...band,
            bounds: {...band.bounds, x},
            nodes: band.nodes.map((node) => ({
                ...node,
                rect: {...node.rect, x},
            })),
        };
        nextGroupX =
            x +
            band.bounds.width +
            (corridorByKind.get(band.kind) ?? 0) +
            (index === provisionalBands.length - 1 ? 0 : GROUP_GAP);
        return placedBand;
    });
    const nodes = bands.flatMap((band) => band.nodes);
    const nodeById = new Map(nodes.map((node) => [node.id, node]));
    const edges = resolveEdges(data.edges, nodeById);
    const rightmostBand = bands[bands.length - 1];
    const rightmost =
        rightmostBand.bounds.x +
        rightmostBand.bounds.width +
        (corridorByKind.get(rightmostBand.kind) ?? 0);

    return {
        bands,
        nodes,
        edges,
        bounds: {
            x: 0,
            y: 0,
            width: rightmost + WORLD_PADDING,
            height: maximumGroupHeight + WORLD_PADDING * 2,
        },
    };
}

export function hitTest(
    layoutOrNodes: ComponentMapLayout | LayoutNode[],
    point: Point,
): LayoutNode | undefined {
    const nodes = Array.isArray(layoutOrNodes) ? layoutOrNodes : layoutOrNodes.nodes;

    for (let index = nodes.length - 1; index >= 0; index -= 1) {
        const node = nodes[index];
        const {x, y, width, height} = node.rect;
        if (point.x >= x && point.x <= x + width && point.y >= y && point.y <= y + height) {
            return node;
        }
    }

    return undefined;
}
