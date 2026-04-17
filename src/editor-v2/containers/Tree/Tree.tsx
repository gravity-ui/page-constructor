/* eslint-disable no-negated-condition */
import {TrashBin} from '@gravity-ui/icons';
import {Button, Icon} from '@gravity-ui/uikit';
import type {DragDropEvents} from '@dnd-kit/abstract';
import type {DragDropManager, Draggable, Droppable} from '@dnd-kit/dom';
import {isKeyboardEvent} from '@dnd-kit/dom/utilities';
import {DragDropProvider, DragOverlay} from '@dnd-kit/react';
import {move} from '@dnd-kit/helpers';
import _ from 'lodash';
import * as React from 'react';

import type {ClassNameProps} from '../../../models';
import {useMainEditorStore} from '../../hooks';
import {editorCn} from '../../utils/cn';
import {generateChildrenPathFromArray, getItemTitle} from '../../utils';

import {
    blocksToTreeItems,
    getBlockTypeLabel,
    idToBlockPath,
    treeItemsToBlocks,
} from './utils/blocksBridge';
import {sanitizeProjectionForChildrenCapability} from './utils/treeDragGuards';
import {TreeItem} from './TreeItem';
import {TreeItemOverlay} from './TreeItemOverlay';
import type {FlattenedTreeItem} from './types';
import {buildTree, flattenTree, getDescendants, getDragDepth} from './utils/common';

import './Tree.scss';

type TreeDnd = DragDropEvents<Draggable, Droppable, DragDropManager>;
type TreeDragStartEvent = Parameters<TreeDnd['dragstart']>[0];
type TreeDragOverEvent = Parameters<TreeDnd['dragover']>[0];
type TreeDragMoveEvent = Parameters<TreeDnd['dragmove']>[0];
type TreeDragEndEvent = Parameters<TreeDnd['dragend']>[0];

const b = editorCn('tree');

const INDENTATION = 24;

interface TreeProps extends ClassNameProps {}

const Tree = ({className}: TreeProps) => {
    const {
        content,
        setContent,
        selectedBlock,
        setSelectedBlock,
        resetBlocks,
        duplicateBlock,
        deleteBlock,
    } = useMainEditorStore();

    const [flattenedItems, setFlattenedItems] = React.useState(() =>
        flattenTree(blocksToTreeItems(content.blocks)),
    );

    const initialDepth = React.useRef(0);
    const sourceChildren = React.useRef<FlattenedTreeItem[]>([]);

    React.useEffect(() => {
        setFlattenedItems(flattenTree(blocksToTreeItems(content.blocks)));
    }, [content.blocks]);

    const selectedBlockPathStr = React.useMemo(
        () => generateChildrenPathFromArray(selectedBlock || []),
        [selectedBlock],
    );

    const handleDragStart = React.useCallback(
        (event: TreeDragStartEvent) => {
            const {source} = event.operation;
            if (!source) {
                return;
            }

            const row = flattenedItems.find(({id}) => id === source.id);
            if (!row) {
                return;
            }

            initialDepth.current = row.depth;

            setFlattenedItems((flatItems) => {
                sourceChildren.current = [];
                const descendants = getDescendants(flatItems, source.id);
                return flatItems.filter((item) => {
                    if (descendants.has(item.id)) {
                        sourceChildren.current = [...sourceChildren.current, item];
                        return false;
                    }
                    return true;
                });
            });
        },
        [flattenedItems],
    );

    const handleDragOver = React.useCallback(
        (event: TreeDragOverEvent, manager: DragDropManager) => {
            event.preventDefault();
            const {source, target} = event.operation;

            if (source && target && source.id !== target.id) {
                setFlattenedItems((flat) => {
                    const offsetLeft = manager.dragOperation.transform.x;
                    const dragDepth = getDragDepth(offsetLeft, INDENTATION);
                    const projectedDepth = initialDepth.current + dragDepth;

                    const {depth, parentId} = sanitizeProjectionForChildrenCapability(
                        flat,
                        target.id,
                        projectedDepth,
                    );

                    const sortedItems = move(flat, event);
                    return sortedItems.map((item) =>
                        item.id === source.id ? {...item, depth, parentId} : item,
                    );
                });
            }
        },
        [],
    );

    const handleDragMove = React.useCallback(
        (event: TreeDragMoveEvent, manager: DragDropManager) => {
            if (event.defaultPrevented) {
                return;
            }

            const {source, target} = event.operation;

            if (source && target) {
                const keyboard = isKeyboardEvent(event.operation.activatorEvent);
                const currentDepth = source.data?.depth ?? 0;
                let keyboardDepth: number | undefined;

                if (keyboard) {
                    const isHorizontal = event.by?.x !== 0 && event.by?.y === 0;

                    if (isHorizontal) {
                        event.preventDefault();
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        keyboardDepth = currentDepth + Math.sign(event.by!.x);
                    }
                }

                const offsetLeft = manager.dragOperation.transform.x;
                const dragDepth = getDragDepth(offsetLeft, INDENTATION);

                const projectedDepth = keyboardDepth ?? initialDepth.current + dragDepth;

                const {depth, parentId} = sanitizeProjectionForChildrenCapability(
                    flattenedItems,
                    source.id,
                    projectedDepth,
                );

                if (keyboard) {
                    if (currentDepth !== depth) {
                        const offset = INDENTATION * (depth - currentDepth);

                        manager.actions.move({
                            by: {x: offset, y: 0},
                            propagate: false,
                        });
                    }
                }

                if (source.data?.depth !== depth || source.data?.parentId !== parentId) {
                    setFlattenedItems((flat) =>
                        flat.map((item) =>
                            item.id === source.id ? {...item, depth, parentId} : item,
                        ),
                    );
                }
            }
        },
        [flattenedItems],
    );

    const handleDragEnd = React.useCallback(
        (event: TreeDragEndEvent) => {
            if (event.canceled) {
                setFlattenedItems(flattenTree(blocksToTreeItems(content.blocks)));
                return;
            }

            const merged = [...flattenedItems, ...sourceChildren.current];

            const updatedTree = buildTree(merged);
            const nextFlat = flattenTree(updatedTree);
            const newBlocks = treeItemsToBlocks(updatedTree);

            setFlattenedItems(nextFlat);
            setContent({...content, blocks: newBlocks});

            const draggedId = event.operation.source?.id;
            const pathToDragged =
                draggedId !== null ? idToBlockPath(nextFlat, String(draggedId)) : [];
            setSelectedBlock(pathToDragged.length ? pathToDragged : null);
        },
        [setContent, setSelectedBlock, content, flattenedItems],
    );

    return (
        <div className={b(null, className)}>
            <div className={b('head')}>
                <Button view="outlined-danger" onClick={() => resetBlocks()}>
                    <Icon data={TrashBin} />
                    Clear all
                </Button>
            </div>
            <DragDropProvider
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
            >
                <div className={b('list')}>
                    {flattenedItems.map((row, index) => {
                        const path = idToBlockPath(flattenedItems, row.id);
                        const pathKey = generateChildrenPathFromArray(path);
                        const blockType = getBlockTypeLabel(row.block);

                        return (
                            <TreeItem
                                key={row.id}
                                item={row}
                                sortableIndex={index}
                                indentLeft={row.depth * INDENTATION}
                                path={path}
                                selected={selectedBlockPathStr === pathKey}
                                type={blockType}
                                treeTitle={getItemTitle(row.block)}
                                onCopy={duplicateBlock}
                                onDelete={deleteBlock}
                                onSelect={setSelectedBlock}
                            />
                        );
                    })}
                </div>
                <DragOverlay className={b('dnd-overlay')} dropAnimation={null}>
                    {(source) => {
                        if (!source) {
                            return null;
                        }
                        const sourceId = String(source.id);
                        const rowNow = flattenedItems.find(({id}) => String(id) === sourceId);
                        const overlayBlock = rowNow?.block;
                        if (!overlayBlock) {
                            return null;
                        }
                        const indentLeft = (rowNow?.depth ?? 0) * INDENTATION;
                        return (
                            <TreeItemOverlay
                                block={overlayBlock}
                                count={sourceChildren.current.length}
                                indentLeft={indentLeft}
                            />
                        );
                    }}
                </DragOverlay>
            </DragDropProvider>
        </div>
    );
};

export default Tree;
