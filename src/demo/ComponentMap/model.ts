export type ComponentMapNodeKind = 'block' | 'sub-block' | 'component';

export interface ComponentMapNode {
    id: string;
    kind: ComponentMapNodeKind;
    exportName: string;
    label: string;
}

export interface ComponentMapEdge {
    source: string;
    target: string;
}

export interface ComponentMapData {
    nodes: ComponentMapNode[];
    edges: ComponentMapEdge[];
}

export interface Point {
    x: number;
    y: number;
}

export interface Rect extends Point {
    width: number;
    height: number;
}

export interface LayoutNode extends ComponentMapNode {
    rect: Rect;
}

export interface LayoutBand {
    kind: ComponentMapNodeKind;
    label: string;
    bounds: Rect;
    nodes: LayoutNode[];
}

export interface LayoutEdge {
    source: LayoutNode;
    target: LayoutNode;
}

export interface ComponentMapLayout {
    nodes: LayoutNode[];
    bands: LayoutBand[];
    edges: LayoutEdge[];
    bounds: Rect;
}

export interface ViewportSize {
    width: number;
    height: number;
}

export interface ViewportTransform extends Point {
    scale: number;
}

export type ComponentMapEmphasisMode = 'none' | 'selection' | 'search';

export interface ComponentMapEmphasis {
    mode: ComponentMapEmphasisMode;
    activeNodeIds: Set<string>;
    activeEdgeIds: Set<string>;
}
