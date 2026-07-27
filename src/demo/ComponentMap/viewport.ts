import type {Point, Rect, ViewportSize, ViewportTransform} from './model';

export const VIEWPORT_PADDING = 24;
export const MINIMUM_VIEWPORT_SCALE = 0.01;

export const worldToScreen = (point: Point, transform: ViewportTransform): Point => ({
    x: point.x * transform.scale + transform.x,
    y: point.y * transform.scale + transform.y,
});

export const screenToWorld = (point: Point, transform: ViewportTransform): Point => ({
    x: (point.x - transform.x) / transform.scale,
    y: (point.y - transform.y) / transform.scale,
});

export function fitToViewport(
    bounds: Rect,
    viewport: ViewportSize,
    padding = VIEWPORT_PADDING,
): ViewportTransform {
    const availableWidth = Math.max(0, viewport.width - padding * 2);
    const availableHeight = Math.max(0, viewport.height - padding * 2);
    const widthScale = bounds.width > 0 ? availableWidth / bounds.width : 1;
    const heightScale = bounds.height > 0 ? availableHeight / bounds.height : 1;
    // React postpones fitting until it has a positive canvas size. Keep this pure fallback
    // invertible as well for callers that receive an empty or padding-sized viewport.
    const scale = Math.max(MINIMUM_VIEWPORT_SCALE, Math.min(1, widthScale, heightScale));

    return {
        scale,
        x: viewport.width / 2 - (bounds.x + bounds.width / 2) * scale,
        y: viewport.height / 2 - (bounds.y + bounds.height / 2) * scale,
    };
}

export function zoomAtPoint(
    transform: ViewportTransform,
    factor: number,
    point: Point,
    minScale: number,
    maxScale: number,
): ViewportTransform {
    const world = screenToWorld(point, transform);
    const scale = Math.min(maxScale, Math.max(minScale, transform.scale * factor));

    return {
        scale,
        x: point.x - world.x * scale,
        y: point.y - world.y * scale,
    };
}
