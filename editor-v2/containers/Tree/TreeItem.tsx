import {Copy, TrashBin} from '@gravity-ui/icons';
import {Button, Card, Icon} from '@gravity-ui/uikit';
import * as React from 'react';

import {editorCn} from '../../utils/cn';
import {DragContext, DragItem} from './DragContext';

import './TreeItem.scss';

const b = editorCn('tree-item');

export interface ItemProps {
    type: string;
    treeTitle?: string;
    path: number[];
    selected: boolean;
    onCopy(path: number[]): void;
    onDelete(path: number[]): void;
    onSelect(path: number[]): void;
    onReorder(
        sourcePath: number[],
        destinationPath: number[],
        position?: 'prepend' | 'append',
    ): void;
    children?: React.ReactNode;
}

export const Item = ({
    type,
    children,
    treeTitle,
    path,
    selected,
    onCopy,
    onDelete,
    onSelect,
    onReorder,
}: ItemProps) => {
    const {draggedItem, setDraggedItem, showPreview, hidePreview} = React.useContext(DragContext);
    const [isDragging, setIsDragging] = React.useState(false);
    const [isDragOver, setIsDragOver] = React.useState(false);
    const [mouseDownPos, setMouseDownPos] = React.useState<{x: number; y: number} | null>(null);
    const itemRef = React.useRef<HTMLDivElement>(null);

    // Scroll into view when selected
    React.useEffect(() => {
        if (selected && itemRef.current) {
            itemRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [selected]);

    const handleCopy = React.useCallback(() => {
        onCopy(path);
    }, [onCopy, path]);

    const handleDelete = React.useCallback(() => {
        onDelete(path);
    }, [onDelete, path]);

    const handleMouseDown = React.useCallback((e: any) => {
        setMouseDownPos({x: e.clientX, y: e.clientY});
    }, []);

    const handleMouseUp = React.useCallback(
        (e: any) => {
            if (mouseDownPos) {
                // Check if the mouse has moved significantly (dragging) or just a click
                const dx = Math.abs(e.clientX - mouseDownPos.x);
                const dy = Math.abs(e.clientY - mouseDownPos.y);

                // If the mouse hasn't moved much, consider it a click for selection
                if (dx < 5 && dy < 5) {
                    e.stopPropagation();
                    onSelect(path);
                }
            }
            setMouseDownPos(null);
        },
        [mouseDownPos, onSelect, path],
    );

    const handleDragStart = React.useCallback(
        (e: any) => {
            e.stopPropagation();
            const dragData: DragItem = {
                path,
                type,
                treeTitle,
            };
            e.dataTransfer.setData('application/json', JSON.stringify(dragData));
            e.dataTransfer.effectAllowed = 'move';
            setIsDragging(true);

            // Update drag context
            setDraggedItem(dragData);
        },
        [path, type, treeTitle, setDraggedItem],
    );

    const handleDragEnd = React.useCallback(() => {
        setIsDragging(false);

        // Reset drag context
        setDraggedItem(null);
        hidePreview();
    }, [setDraggedItem, hidePreview, path]);

    const handleDragOver = React.useCallback(
        (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            e.dataTransfer.dropEffect = 'move';
            setIsDragOver(true);

            // Show preview element at this position
            const rect = e.currentTarget.getBoundingClientRect();
            if (draggedItem) {
                showPreview(rect, draggedItem);
            }
        },
        [showPreview, draggedItem],
    );

    const handleDragLeave = React.useCallback(() => {
        setIsDragOver(false);
        hidePreview();
    }, [hidePreview]);

    const handleDrop = React.useCallback(
        (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragOver(false);

            try {
                const data = e.dataTransfer.getData('application/json');
                if (data) {
                    const dragItem: DragItem = JSON.parse(data);
                    if (dragItem.path.join(',') !== path.join(',')) {
                        onReorder(dragItem.path, path);

                        // Reset drag context
                        setDraggedItem(null);
                        hidePreview();
                    }
                }
            } catch (error) {
                console.error('Error parsing drag data:', error);
            }
        },
        [onReorder, path, setDraggedItem, hidePreview],
    );

    const handleChildrenFirstPositionDrop = React.useCallback(
        (e: any) => {
            e.preventDefault();
            e.stopPropagation();

            try {
                const data = e.dataTransfer.getData('application/json');
                if (data) {
                    const dragItem: DragItem = JSON.parse(data);
                    // Create a path for the first child position
                    const firstChildPath = [...path, 0];
                    // Reorder to the first position within children
                    onReorder(dragItem.path, firstChildPath, 'prepend');

                    // Reset drag context
                    setDraggedItem(null);
                    hidePreview();
                }
            } catch (error) {
                console.error('Error parsing drag data:', error);
            }
        },
        [onReorder, path, setDraggedItem, hidePreview],
    );

    const handleDropZoneDragOver = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'move';

        // Show preview element at this position
        const rect = e.currentTarget.getBoundingClientRect();
        if (draggedItem) {
            showPreview(rect, draggedItem);
        }
    };

    return (
        <Card
            ref={itemRef}
            className={b({
                selected,
                dragging: isDragging,
                'drag-over': isDragOver,
            })}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className={b('main')}>
                <div className={b('text')}>
                    <div className={b('type')}>{type}</div>
                    <div className={b('title')}>{treeTitle}</div>
                </div>
                <div className={b('buttons')}>
                    <Button view="flat" size="xs" onClick={handleCopy}>
                        <Icon size={12} data={Copy} />
                    </Button>
                    <Button view="flat" size="xs" onClick={handleDelete}>
                        <Icon size={12} data={TrashBin} />
                    </Button>
                </div>
            </div>
            {children && (
                <React.Fragment>
                    <div
                        className={b('children-drop-zone')}
                        onDragOver={handleDropZoneDragOver}
                        onDragLeave={hidePreview}
                        onDrop={handleChildrenFirstPositionDrop}
                    ></div>
                    {children}
                </React.Fragment>
            )}
        </Card>
    );
};
