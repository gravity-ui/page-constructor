import {Copy, TrashBin} from '@gravity-ui/icons';
import {Button, Card, Icon} from '@gravity-ui/uikit';
import * as React from 'react';

import {useSortable} from '@dnd-kit/react/sortable';

import {editorCn} from '../../utils/cn';

import type {FlattenedTreeItem} from './types';
import {HTML} from '../../../components';

import './TreeItem.scss';

const b = editorCn('tree-item');

const sortableConfig = {
    alignment: {
        x: 'start' as const,
        y: 'center' as const,
    },
    transition: null,
} as const;

export interface TreeItemProps {
    item: FlattenedTreeItem;
    sortableIndex: number;
    indentLeft: number;
    selected: boolean;
    type: string;
    treeTitle?: string;
    path: number[];
    onCopy(path: number[]): void;
    onDelete(path: number[]): void;
    onSelect(path: number[]): void;
}

export function TreeItem({
    item,
    sortableIndex,
    indentLeft,
    selected,
    type,
    treeTitle,
    path,
    onCopy,
    onDelete,
    onSelect,
}: TreeItemProps) {
    const {depth, parentId, id} = item;

    const {ref, isDragSource, isDropTarget} = useSortable({
        ...sortableConfig,
        id,
        index: sortableIndex,
        data: {
            depth,
            parentId,
        },
    });

    const [mouseDownPos, setMouseDownPos] = React.useState<{x: number; y: number} | null>(null);
    const itemRef = React.useRef<HTMLDivElement>(null);

    React.useLayoutEffect(() => {
        if (selected && itemRef.current) {
            itemRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [selected]);

    const setNodeRef = React.useCallback(
        (node: Element | null) => {
            ref(node);
            (itemRef as React.MutableRefObject<HTMLDivElement | null>).current =
                node as HTMLDivElement | null;
        },
        [ref],
    );

    const handleMouseDown = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        setMouseDownPos({x: e.clientX, y: e.clientY});
    }, []);

    const handleMouseUp = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (mouseDownPos) {
                const dx = Math.abs(e.clientX - mouseDownPos.x);
                const dy = Math.abs(e.clientY - mouseDownPos.y);

                if (dx < 5 && dy < 5) {
                    e.stopPropagation();
                    onSelect(path);
                }
            }
            setMouseDownPos(null);
        },
        [mouseDownPos, onSelect, path],
    );

    return (
        <Card
            ref={setNodeRef}
            className={b({
                selected,
                dragging: isDragSource,
                'drag-over': isDropTarget,
            })}
            style={{marginLeft: indentLeft}}
            onMouseDown={handleMouseDown as unknown as React.MouseEventHandler<'div'>}
            onMouseUp={handleMouseUp as unknown as React.MouseEventHandler<'div'>}
        >
            <div className={b('main')}>
                <div className={b('text')}>
                    <div className={b('type')}>{type}</div>
                    <HTML className={b('title')}>{treeTitle}</HTML>
                </div>
                <div className={b('buttons')}>
                    <Button view="flat" size="xs" onClick={() => onCopy(path)}>
                        <Icon size={12} data={Copy} />
                    </Button>
                    <Button view="flat" size="xs" onClick={() => onDelete(path)}>
                        <Icon size={12} data={TrashBin} />
                    </Button>
                </div>
            </div>
        </Card>
    );
}
