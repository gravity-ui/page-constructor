import * as React from 'react';

import {ChevronDown, ChevronUp, Copy, TrashBin} from '@gravity-ui/icons';
import {Button, Icon} from '@gravity-ui/uikit';
import _ from 'lodash';

import {usePostMessageAPIListener} from '../../../common/postMessage';
import {SerializableRect} from '../../../common/types/rect';
import {getCursorPositionOverElement} from '../../../utils/editor';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {editorCn} from '../../utils/cn';

import './Overlay.scss';

const b = editorCn('overlay');

type InsertPosition = 'top' | 'bottom' | 'left' | 'right';

interface OverlayProps {
    className?: string;
    canvasElement?: HTMLDivElement | null;
}

const findRectByPath = (
    rectMap: Array<{path: number[]; rect: SerializableRect}>,
    path: number[] | null,
): SerializableRect | null => {
    if (!path) return null;
    return rectMap.find((entry) => _.isEqual(entry.path, path))?.rect ?? null;
};

const Overlay = ({className, canvasElement}: OverlayProps) => {
    const {
        rectMap,
        setRectMap,
        selectedBlock,
        setSelectedBlock,
        deleteBlock,
        duplicateBlock,
        manipulateOverlayMode,
        preInsertBlockType,
        preReorderBlockPath,
        insertBlock,
        reorderBlock,
        disableMode,
    } = useMainEditorStore();

    const [hoveredPath, setHoveredPath] = React.useState<number[] | null>(null);
    const [insertPosition, setInsertPosition] = React.useState<InsertPosition | null>(null);

    usePostMessageAPIListener(
        'ON_UPDATE_RECT_MAP',
        ({rects}) => {
            setRectMap(rects);
        },
        [setRectMap],
    );

    const selectedRect = React.useMemo(
        () => findRectByPath(rectMap, selectedBlock),
        [rectMap, selectedBlock],
    );
    const hoveredRect = React.useMemo(
        () => findRectByPath(rectMap, hoveredPath),
        [rectMap, hoveredPath],
    );

    // Auto-scroll to selected block when it changes
    React.useEffect(() => {
        if (selectedRect && canvasElement) {
            const canvasHeight = canvasElement.clientHeight;
            const scrollPosition = selectedRect.top - canvasHeight / 2 + selectedRect.height / 2;
            canvasElement.scrollTo({
                top: Math.max(0, scrollPosition),
                behavior: 'smooth',
            });
        }
        // Intentionally depends on selectedBlock identity (path), not rect value, to avoid scroll jitter on rect updates.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedBlock, canvasElement]);

    const handleClick = React.useCallback(
        (path: number[]) => {
            if (selectedBlock && _.isEqual(selectedBlock, path)) {
                setSelectedBlock(null);
            } else {
                setSelectedBlock(path);
            }
        },
        [selectedBlock, setSelectedBlock],
    );

    const handleMouseEnter = React.useCallback((path: number[]) => {
        setHoveredPath(path);
    }, []);

    const handleMouseLeave = React.useCallback((path: number[]) => {
        setHoveredPath((current) => (_.isEqual(current, path) ? null : current));
    }, []);

    const handleMouseMove = React.useCallback(
        (e: React.MouseEvent) => {
            if (!manipulateOverlayMode) {
                return;
            }

            const domRect = e.currentTarget.getBoundingClientRect();
            const position = getCursorPositionOverElement(domRect, e);
            setInsertPosition(position as InsertPosition);
        },
        [manipulateOverlayMode],
    );

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent, path: number[]) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
                handleClick(path);
            }
        },
        [handleClick],
    );

    const handleMouseUp = React.useCallback(
        (path: number[]) => {
            if (!manipulateOverlayMode) return;

            const position = insertPosition;
            const prepend = position === 'left' || position === 'top';

            if (manipulateOverlayMode === 'insert' && preInsertBlockType) {
                insertBlock(path, preInsertBlockType, prepend ? 'prepend' : 'append');
            } else if (manipulateOverlayMode === 'reorder' && preReorderBlockPath) {
                reorderBlock(preReorderBlockPath, path, prepend ? 'prepend' : 'append');
            }

            disableMode();
            setInsertPosition(null);
        },
        [
            manipulateOverlayMode,
            preInsertBlockType,
            preReorderBlockPath,
            insertBlock,
            reorderBlock,
            disableMode,
            insertPosition,
        ],
    );

    const handleMoveUp = () => {
        if (!selectedBlock) return;
        const destination = [...selectedBlock];
        const newLastDestination = destination[destination.length - 1] - 1;

        if (newLastDestination < 0) {
            return;
        }

        destination[destination.length - 1] = newLastDestination;
        reorderBlock(selectedBlock, destination, 'prepend');
    };

    const handleMoveDown = () => {
        if (!selectedBlock) return;
        const destination = [...selectedBlock];
        const newLastDestination = destination[destination.length - 1] + 1;

        destination[destination.length - 1] = newLastDestination;
        reorderBlock(selectedBlock, destination, 'append');
    };

    const showHoverBorder =
        hoveredRect && (!selectedBlock || !_.isEqual(hoveredPath, selectedBlock));

    return (
        <div className={b(null, className)}>
            {rectMap.map(({path, rect, dropZone}) => {
                const key = path.join('.');
                return (
                    <div
                        key={key}
                        role={dropZone ? 'presentation' : 'button'}
                        tabIndex={dropZone ? -1 : 0}
                        className={b('hit')}
                        style={{
                            top: rect.top,
                            left: rect.left,
                            width: rect.width,
                            height: rect.height,
                            zIndex: 10 * (path.length + (dropZone ? 0 : 1)),
                        }}
                        onClick={
                            dropZone
                                ? undefined
                                : (e) => {
                                      e.stopPropagation();
                                      handleClick(path);
                                  }
                        }
                        onKeyDown={dropZone ? undefined : (e) => handleKeyDown(e, path)}
                        onMouseEnter={() => handleMouseEnter(path)}
                        onMouseLeave={() => handleMouseLeave(path)}
                        onMouseMove={(e) => handleMouseMove(e)}
                        onMouseUp={() => handleMouseUp(path)}
                    />
                );
            })}
            {selectedRect ? (
                <div
                    className={b('border')}
                    style={{
                        top: selectedRect.top,
                        left: selectedRect.left,
                        width: selectedRect.width,
                        height: selectedRect.height,
                    }}
                >
                    <div className={b('actions')}>
                        <div className={b('actions-box', {reorder: true})}>
                            <Button view="flat" size={'m'} onClick={handleMoveUp}>
                                <Icon className={b('reorder-icon')} data={ChevronUp} size={18} />
                            </Button>
                        </div>
                        <div className={b('actions-box', {main: true})}>
                            <Button
                                className={b('action-button')}
                                size={'m'}
                                view={'action'}
                                onClick={() => selectedBlock && duplicateBlock(selectedBlock)}
                            >
                                <Icon data={Copy} size={18} />
                            </Button>
                            <Button
                                className={b('action-button')}
                                size={'m'}
                                view={'action'}
                                onClick={() => selectedBlock && deleteBlock(selectedBlock)}
                            >
                                <Icon data={TrashBin} size={18} />
                            </Button>
                        </div>
                        <div className={b('actions-box', {reorder: true})}>
                            <Button view="flat" size={'m'} onClick={handleMoveDown}>
                                <Icon className={b('reorder-icon')} data={ChevronDown} size={18} />
                            </Button>
                        </div>
                    </div>
                </div>
            ) : null}
            {showHoverBorder ? (
                <div
                    className={b('border', {hover: true})}
                    style={{
                        top: hoveredRect.top,
                        left: hoveredRect.left,
                        width: hoveredRect.width,
                        height: hoveredRect.height,
                    }}
                />
            ) : null}
            {manipulateOverlayMode && hoveredRect && insertPosition ? (
                <div
                    className={b('line', {position: insertPosition})}
                    style={{
                        top: hoveredRect.top,
                        left: hoveredRect.left,
                        width: hoveredRect.width,
                        height: hoveredRect.height,
                    }}
                />
            ) : null}
        </div>
    );
};

export default Overlay;
