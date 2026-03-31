import * as React from 'react';

import {generateChildrenPathFromArray} from '../../utils';
import {DragContext, DragItem} from './DragContext';
import {Item} from './TreeItem';
import {editorCn} from '../../utils/cn';

import './TreeContent.scss';

const b = editorCn('tree-content');

interface TreeContentProps {
    blockTree: TreeItem[];
    selectedBlockPath: string;
    reorderBlock(
        selectedBlock: number[],
        destination: number[],
        position?: 'prepend' | 'append',
    ): void;
    onCopy(path: number[]): void;
    onDelete(path: number[]): void;
    onSelect(path: number[]): void;
}

export type TreeItem = {
    type: string;
    children?: TreeItem[];
    treeTitle?: string;
};

export const TreeContent = ({
    blockTree,
    selectedBlockPath,
    reorderBlock,
    onCopy,
    onDelete,
    onSelect,
}: React.PropsWithChildren<TreeContentProps>) => {
    const {draggedItem, setDraggedItem, hidePreview, showPreview} = React.useContext(DragContext);

    const handleFirstPositionDrop = React.useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();

            try {
                const data = e.dataTransfer.getData('application/json');
                if (data) {
                    const dragItem: DragItem = JSON.parse(data);
                    // Reorder to the first position by using [0] as destination
                    // and 'prepend' as position
                    reorderBlock(dragItem.path, [0], 'prepend');

                    // Reset drag context
                    setDraggedItem(null);
                    hidePreview();
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error parsing drag data:', error);
            }
        },
        [reorderBlock, hidePreview, setDraggedItem],
    );

    const handleDragOver = React.useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            // eslint-disable-next-line no-not-accumulator-reassign/no-not-accumulator-reassign, no-param-reassign
            e.dataTransfer.dropEffect = 'move';

            // Show preview element at this position
            const rect = e.currentTarget.getBoundingClientRect();
            if (draggedItem) {
                showPreview(rect, draggedItem);
            }
        },
        [draggedItem, showPreview],
    );

    const renderTree = (items: TreeItem[], parentPathArray?: number[]) => {
        return items.map(({type, treeTitle, children}, index) => {
            let blockPathArray: number[];
            if (parentPathArray) {
                blockPathArray = [...parentPathArray, index];
            } else {
                blockPathArray = [index];
            }
            const blockPath = generateChildrenPathFromArray(blockPathArray);

            return (
                <Item
                    type={type}
                    treeTitle={treeTitle}
                    onCopy={onCopy}
                    onDelete={onDelete}
                    onSelect={onSelect}
                    onReorder={reorderBlock}
                    key={index}
                    path={blockPathArray}
                    selected={selectedBlockPath === blockPath}
                >
                    {children && (
                        <div className={b('children')}>{renderTree(children, blockPathArray)}</div>
                    )}
                </Item>
            );
        });
    };

    return (
        <div className={b()}>
            <div
                className={b('drop-zone')}
                onDragOver={handleDragOver}
                onDragLeave={hidePreview}
                onDrop={handleFirstPositionDrop}
            ></div>
            <div>{renderTree(blockTree)}</div>
        </div>
    );
};
