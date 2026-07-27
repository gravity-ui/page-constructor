import * as React from 'react';

import {Button, TextInput} from '@gravity-ui/uikit';

import {block} from '../../utils/cn';

import {drawComponentMap} from './draw';
import {getEdgeHitTolerance, hitTestEdge, orderEdgesForInteraction} from './edgeGeometry';
import {getEdgeKey, getEmphasis} from './graph';
import {hitTest, layoutComponentMap} from './layout';
import type {ComponentMapData, Point, ViewportSize, ViewportTransform} from './model';
import {fitToViewport, screenToWorld, zoomAtPoint} from './viewport';

import './ComponentMap.scss';

const b = block('component-map');
const {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} = React;
const TOOLBAR_ZOOM_FACTOR = 1.2;
const WHEEL_ZOOM_SENSITIVITY = 0.002;
const CLICK_MOVEMENT_THRESHOLD = 4;
const NON_PASSIVE_WHEEL_OPTIONS = {passive: false} as const;

interface ComponentMapProps {
    data: ComponentMapData;
}

interface CanvasSize extends ViewportSize {
    devicePixelRatio: number;
}

interface PointerDrag {
    pointerId: number;
    canvas: HTMLCanvasElement;
    start: Point;
    startTransform: ViewportTransform;
    moved: boolean;
}

const EMPTY_SIZE: CanvasSize = {width: 0, height: 0, devicePixelRatio: 1};

export function ComponentMap({data}: ComponentMapProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number | null>(null);
    const pointerDragRef = useRef<PointerDrag | null>(null);
    const layout = useMemo(() => layoutComponentMap(data), [data]);
    const [size, setSize] = useState<CanvasSize>(EMPTY_SIZE);
    const [transform, setTransform] = useState<ViewportTransform | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedNodeId, setSelectedNodeId] = useState<string>();
    const [selectedEdgeKeys, setSelectedEdgeKeys] = useState<Set<string>>(() => new Set());
    const [hoveredNodeId, setHoveredNodeId] = useState<string>();
    const [hoveredEdgeKey, setHoveredEdgeKey] = useState<string>();
    const [dragging, setDragging] = useState(false);
    const fit = useMemo(
        () => (size.width > 0 && size.height > 0 ? fitToViewport(layout.bounds, size) : undefined),
        [layout, size],
    );
    const emphasis = useMemo(
        () => getEmphasis(data, {selectedNodeId, searchQuery}),
        [data, searchQuery, selectedNodeId],
    );
    const selectedNode = layout.nodes.find(({id}) => id === selectedNodeId);
    const validEdgeKeys = useMemo(
        () => new Set(layout.edges.map(({source, target}) => getEdgeKey(source.id, target.id))),
        [layout],
    );

    useEffect(() => {
        const root = rootRef.current;
        if (!root) {
            return undefined;
        }

        const updateSize = ({width, height}: Pick<DOMRectReadOnly, 'width' | 'height'>) => {
            setSize({
                width,
                height,
                devicePixelRatio: window.devicePixelRatio || 1,
            });
        };
        const observer = new ResizeObserver(([entry]) => updateSize(entry.contentRect));
        observer.observe(root);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (fit) {
            setTransform(fit);
        }
    }, [fit]);

    useEffect(() => {
        setSelectedNodeId((current) =>
            current && layout.nodes.some(({id}) => id === current) ? current : undefined,
        );
        setSelectedEdgeKeys((current) => {
            const next = new Set([...current].filter((key) => validEdgeKeys.has(key)));
            return next.size === current.size ? current : next;
        });
        setHoveredNodeId((current) =>
            current && layout.nodes.some(({id}) => id === current) ? current : undefined,
        );
        setHoveredEdgeKey((current) =>
            current && validEdgeKeys.has(current) ? current : undefined,
        );
    }, [layout, validEdgeKeys]);

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || size.width <= 0 || size.height <= 0) {
            return;
        }

        canvas.width = Math.max(1, Math.round(size.width * size.devicePixelRatio));
        canvas.height = Math.max(1, Math.round(size.height * size.devicePixelRatio));
    }, [data.nodes.length, size]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !transform || size.width <= 0 || size.height <= 0) {
            return undefined;
        }

        if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = -1;
        const frame = requestAnimationFrame(() => {
            animationFrameRef.current = null;
            const context = canvas.getContext('2d');
            if (context) {
                drawComponentMap(context, layout, transform, {
                    viewport: size,
                    devicePixelRatio: size.devicePixelRatio,
                    selectedNodeId,
                    hoveredEdgeKey,
                    selectedEdgeKeys,
                    emphasis,
                });
            }
        });
        if (animationFrameRef.current !== null) {
            animationFrameRef.current = frame;
        }

        return () => {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
        };
    }, [emphasis, hoveredEdgeKey, layout, selectedEdgeKeys, selectedNodeId, size, transform]);

    const getCanvasPoint = useCallback((clientX: number, clientY: number) => {
        const bounds = canvasRef.current?.getBoundingClientRect();
        return {
            x: clientX - (bounds?.left ?? 0),
            y: clientY - (bounds?.top ?? 0),
        };
    }, []);

    const zoom = useCallback(
        (factor: number, point: Point) => {
            if (!fit) {
                return;
            }
            setTransform((current) =>
                current
                    ? zoomAtPoint(current, factor, point, fit.scale * 0.5, fit.scale * 8)
                    : current,
            );
        },
        [fit],
    );

    const zoomFromToolbar = useCallback(
        (factor: number) => zoom(factor, {x: size.width / 2, y: size.height / 2}),
        [size, zoom],
    );

    const selectNode = useCallback((nodeId?: string) => {
        if (nodeId) {
            setSearchQuery('');
        }
        setSelectedNodeId(nodeId);
        setSelectedEdgeKeys((current) => (current.size ? new Set() : current));
    }, []);

    const selectEdge = useCallback((edgeKey: string, additive: boolean) => {
        setSelectedEdgeKeys((current) => {
            if (!additive) {
                return new Set([edgeKey]);
            }
            const next = new Set(current);
            if (next.has(edgeKey)) {
                next.delete(edgeKey);
            } else {
                next.add(edgeKey);
            }
            return next;
        });
    }, []);

    const getHitTarget = useCallback(
        (point: Point, camera: ViewportTransform) => {
            const worldPoint = screenToWorld(point, camera);
            const node = hitTest(layout, worldPoint);
            if (node) {
                return {node, edge: undefined};
            }
            const orderedEdges = orderEdgesForInteraction(
                layout.edges,
                hoveredEdgeKey,
                selectedEdgeKeys,
            );
            return {
                node: undefined,
                edge: hitTestEdge(orderedEdges, worldPoint, getEdgeHitTolerance(camera.scale)),
            };
        },
        [hoveredEdgeKey, layout, selectedEdgeKeys],
    );

    const updateHover = useCallback(
        (point: Point, camera: ViewportTransform) => {
            const {node, edge} = getHitTarget(point, camera);
            setHoveredNodeId(node?.id);
            setHoveredEdgeKey(edge ? getEdgeKey(edge.source.id, edge.target.id) : undefined);
        },
        [getHitTarget],
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return undefined;
        }

        const handleWheel = (event: WheelEvent) => {
            event.preventDefault();
            const factor = Math.exp(-event.deltaY * WHEEL_ZOOM_SENSITIVITY);
            zoom(factor, getCanvasPoint(event.clientX, event.clientY));
        };
        canvas.addEventListener('wheel', handleWheel, NON_PASSIVE_WHEEL_OPTIONS);

        return () => canvas.removeEventListener('wheel', handleWheel, false);
    }, [data.nodes.length, getCanvasPoint, zoom]);

    const handlePointerDown = useCallback(
        (event: React.PointerEvent<HTMLCanvasElement>) => {
            if (!transform) {
                return;
            }
            const point = getCanvasPoint(event.clientX, event.clientY);
            pointerDragRef.current = {
                pointerId: event.pointerId,
                canvas: event.currentTarget,
                start: point,
                startTransform: transform,
                moved: false,
            };
            event.currentTarget.setPointerCapture(event.pointerId);
        },
        [getCanvasPoint, transform],
    );

    const handlePointerMove = useCallback(
        (event: React.PointerEvent<HTMLCanvasElement>) => {
            const point = getCanvasPoint(event.clientX, event.clientY);
            const drag = pointerDragRef.current;
            if (!drag || drag.pointerId !== event.pointerId) {
                if (transform) {
                    updateHover(point, transform);
                }
                return;
            }

            const deltaX = point.x - drag.start.x;
            const deltaY = point.y - drag.start.y;
            const moved = drag.moved || Math.hypot(deltaX, deltaY) >= CLICK_MOVEMENT_THRESHOLD;
            if (!moved) {
                return;
            }
            if (!drag.moved) {
                drag.moved = true;
                setHoveredNodeId(undefined);
                setHoveredEdgeKey(undefined);
                setDragging(true);
            }
            setTransform({
                ...drag.startTransform,
                x: drag.startTransform.x + deltaX,
                y: drag.startTransform.y + deltaY,
            });
        },
        [getCanvasPoint, transform, updateHover],
    );

    const releasePointer = useCallback((canvas: HTMLCanvasElement, pointerId: number) => {
        if (canvas.hasPointerCapture(pointerId)) {
            canvas.releasePointerCapture(pointerId);
        }
    }, []);

    const finishPointer = useCallback(
        (event: React.PointerEvent<HTMLCanvasElement>, cancelled: boolean) => {
            const drag = pointerDragRef.current;
            if (!drag || drag.pointerId !== event.pointerId) {
                return;
            }

            const point = getCanvasPoint(event.clientX, event.clientY);
            const deltaX = point.x - drag.start.x;
            const deltaY = point.y - drag.start.y;
            const moved = drag.moved || Math.hypot(deltaX, deltaY) >= CLICK_MOVEMENT_THRESHOLD;
            if (!cancelled) {
                if (moved) {
                    setTransform({
                        ...drag.startTransform,
                        x: drag.startTransform.x + deltaX,
                        y: drag.startTransform.y + deltaY,
                    });
                } else {
                    const {node, edge} = getHitTarget(point, drag.startTransform);
                    if (node) {
                        selectNode(node.id);
                    } else if (edge) {
                        selectEdge(
                            getEdgeKey(edge.source.id, edge.target.id),
                            event.ctrlKey || event.metaKey,
                        );
                    } else {
                        selectNode(undefined);
                    }
                }
            }

            releasePointer(event.currentTarget, event.pointerId);
            pointerDragRef.current = null;
            setDragging(false);
        },
        [getCanvasPoint, getHitTarget, releasePointer, selectEdge, selectNode],
    );

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLCanvasElement>) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            setSelectedNodeId(undefined);
            setSelectedEdgeKeys(new Set());
        }
    }, []);

    useEffect(
        () => () => {
            const drag = pointerDragRef.current;
            if (drag) {
                releasePointer(drag.canvas, drag.pointerId);
            }
            pointerDragRef.current = null;
        },
        [releasePointer],
    );

    if (!data.nodes.length) {
        return (
            <div ref={rootRef} className={b()}>
                <p className={b('empty')}>No significant components found</p>
            </div>
        );
    }

    return (
        <div ref={rootRef} className={b()}>
            <canvas
                ref={canvasRef}
                className={b('canvas', {
                    dragging,
                    interactive: Boolean(hoveredNodeId || hoveredEdgeKey),
                })}
                role="img"
                aria-label="Significant component dependency map"
                tabIndex={0}
                onKeyDown={handleKeyDown}
                onPointerCancel={(event) => finishPointer(event, true)}
                onPointerDown={handlePointerDown}
                onPointerLeave={() => {
                    setHoveredNodeId(undefined);
                    setHoveredEdgeKey(undefined);
                }}
                onPointerMove={handlePointerMove}
                onPointerUp={(event) => finishPointer(event, false)}
            />
            <div className={b('toolbar')}>
                <TextInput
                    className={b('search')}
                    size="l"
                    hasClear
                    placeholder="Search components"
                    value={searchQuery}
                    controlProps={{'aria-label': 'Search components'}}
                    onUpdate={setSearchQuery}
                    onFocus={() => {
                        setSelectedNodeId(undefined);
                        setSelectedEdgeKeys(new Set());
                    }}
                />
                <Button
                    className={b('control')}
                    size="l"
                    view="outlined"
                    aria-label="Zoom in"
                    onClick={() => zoomFromToolbar(TOOLBAR_ZOOM_FACTOR)}
                >
                    +
                </Button>
                <Button
                    className={b('control')}
                    size="l"
                    view="outlined"
                    aria-label="Zoom out"
                    onClick={() => zoomFromToolbar(1 / TOOLBAR_ZOOM_FACTOR)}
                >
                    −
                </Button>
                <Button
                    className={b('control')}
                    size="l"
                    view="outlined"
                    aria-label="Fit graph"
                    onClick={() => setTransform(fit ?? null)}
                >
                    Fit
                </Button>
            </div>
            <output className={b('live')} aria-live="polite">
                {selectedNode ? `Selected ${selectedNode.label}` : ''}
            </output>
        </div>
    );
}
