import type {
    ComponentMapData,
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
export const HORIZONTAL_GAP = 36;
export const VERTICAL_GAP = 32;
export const BAND_GAP = 112;
export const BAND_HEADER_HEIGHT = 36;
export const WORLD_PADDING = 56;
export const KIND_ORDER = ['block', 'sub-block', 'component'] as const;

const BAND_LABELS: Record<ComponentMapNodeKind, string> = {
    block: 'Blocks',
    'sub-block': 'Sub-blocks',
    component: 'Components',
};

function getColumnCount(maxKindSize: number) {
    return Math.min(8, Math.max(1, Math.ceil(Math.sqrt(maxKindSize * 2))));
}

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

interface MeasuredNode {
    node: ComponentMapNode;
    width: number;
}

interface MeasuredRow {
    nodes: MeasuredNode[];
    width: number;
}

function measureRows(
    nodes: ComponentMapNode[],
    columnCount: number,
    measureLabel: (label: string) => number,
): MeasuredRow[] {
    const measuredNodes = sortByLabel(nodes).map((node) => ({
        node,
        width: Math.max(NODE_MIN_WIDTH, measureLabel(node.label) + NODE_LABEL_PADDING * 2),
    }));
    const rows: MeasuredRow[] = [];

    for (let index = 0; index < measuredNodes.length; index += columnCount) {
        const rowNodes = measuredNodes.slice(index, index + columnCount);
        rows.push({
            nodes: rowNodes,
            width:
                rowNodes.reduce((total, measuredNode) => total + measuredNode.width, 0) +
                Math.max(0, rowNodes.length - 1) * HORIZONTAL_GAP,
        });
    }

    return rows;
}

function createBand(
    kind: ComponentMapNodeKind,
    rows: MeasuredRow[],
    gridWidth: number,
    y: number,
): LayoutBand {
    const layoutNodes = rows.flatMap((row, rowIndex) => {
        let nextNodeX = WORLD_PADDING + (gridWidth - row.width) / 2;

        return row.nodes.map(({node, width}) => {
            const layoutNode = {
                ...node,
                rect: {
                    x: nextNodeX,
                    y: y + BAND_HEADER_HEIGHT + rowIndex * (NODE_HEIGHT + VERTICAL_GAP),
                    width,
                    height: NODE_HEIGHT,
                },
            };
            nextNodeX += width + HORIZONTAL_GAP;
            return layoutNode;
        });
    });
    const nodesHeight =
        rows.length === 0 ? 0 : rows.length * NODE_HEIGHT + (rows.length - 1) * VERTICAL_GAP;

    return {
        kind,
        label: BAND_LABELS[kind],
        bounds: {
            x: WORLD_PADDING,
            y,
            width: gridWidth,
            height: BAND_HEADER_HEIGHT + nodesHeight,
        },
        nodes: layoutNodes,
    };
}

export function layoutComponentMap(data: ComponentMapData): ComponentMapLayout {
    const nodesByKind = new Map<ComponentMapNodeKind, ComponentMapNode[]>(
        KIND_ORDER.map((kind) => [kind, []]),
    );
    for (const node of data.nodes) {
        nodesByKind.get(node.kind)?.push(node);
    }

    const maxKindSize = Math.max(...KIND_ORDER.map((kind) => nodesByKind.get(kind)?.length ?? 0));
    const columnCount = getColumnCount(maxKindSize);
    const measureLabel = createLabelMeasurer();
    const rowsByKind = new Map(
        KIND_ORDER.map((kind) => [
            kind,
            measureRows(nodesByKind.get(kind) ?? [], columnCount, measureLabel),
        ]),
    );
    const minimumGridWidth = columnCount * NODE_MIN_WIDTH + (columnCount - 1) * HORIZONTAL_GAP;
    const gridWidth = Math.max(
        minimumGridWidth,
        ...[...rowsByKind.values()].flatMap((rows) => rows.map((row) => row.width)),
    );
    let nextBandY = WORLD_PADDING;
    const bands = KIND_ORDER.map((kind) => {
        const band = createBand(kind, rowsByKind.get(kind) ?? [], gridWidth, nextBandY);
        nextBandY = band.bounds.y + band.bounds.height + BAND_GAP;
        return band;
    });
    const nodes = bands.flatMap((band) => band.nodes);
    const nodeById = new Map(nodes.map((node) => [node.id, node]));
    const edges: LayoutEdge[] = data.edges.map(({source, target}) => {
        const sourceNode = nodeById.get(source);
        const targetNode = nodeById.get(target);
        if (!sourceNode || !targetNode) {
            throw new Error(`Component map edge references unknown node: ${source} -> ${target}`);
        }
        return {source: sourceNode, target: targetNode};
    });
    const lastBand = bands[bands.length - 1];

    return {
        bands,
        nodes,
        edges,
        bounds: {
            x: 0,
            y: 0,
            width: gridWidth + WORLD_PADDING * 2,
            height: lastBand.bounds.y + lastBand.bounds.height + WORLD_PADDING,
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
