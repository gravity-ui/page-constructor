export interface SerializableRect {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    left: number;
    right: number;
    bottom: number;
}

export interface RectMapEntry {
    path: number[];
    rect: SerializableRect;
    dropZone?: boolean;
}

export function toSerializableRect(rect: DOMRect): SerializableRect {
    return {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
    };
}
