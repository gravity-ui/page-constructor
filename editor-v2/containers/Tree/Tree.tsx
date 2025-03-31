import {Copy, TrashBin} from '@gravity-ui/icons';
import {Button, Card, Icon} from '@gravity-ui/uikit';
import * as React from 'react';

import {ItemConfig} from '../../../common/types';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {generateChildrenPathFromArray, getItemTitle} from '../../utils';
import {editorCn} from '../../utils/cn';

import './Tree.scss';

const b = editorCn('tree');

export interface TreeProps {
    blocks: ItemConfig[];
}

type TreeItem = {
    type: string;
    children?: TreeItem[];
    treeTitle?: string;
};

interface ItemProps {
    type: string;
    treeTitle?: string;
    path: number[];
    selected: boolean;
    onCopy(path: number[]): void;
    onDelete(path: number[]): void;
    onSelect(path: number[]): void;
}

const generateTree = (items: TreeItem[]): TreeItem[] => {
    return items.map((item) => {
        let children;

        if ('children' in item && item.children?.length) {
            children = generateTree(item.children);
        }

        return {
            type: item.type,
            children,
            treeTitle: getItemTitle(item),
        };
    });
};

const Item = ({
    type,
    children,
    treeTitle,
    path,
    selected,
    onCopy,
    onDelete,
    onSelect,
}: React.PropsWithChildren<ItemProps>) => {
    const handleCopy = React.useCallback(() => {
        onCopy(path);
    }, [onCopy, path]);

    const handleDelete = React.useCallback(() => {
        onDelete(path);
    }, [onDelete, path]);

    const handleSelect = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            onSelect(path);
        },
        [onSelect, path],
    );

    return (
        <Card className={b('item')} selected={selected} onClick={handleSelect} type="selection">
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
            {children}
        </Card>
    );
};

const Tree = (_p: React.PropsWithChildren<TreeProps>) => {
    const {content, resetBlocks, selectedBlock, duplicateBlock, deleteBlock, setSelectedBlock} =
        useMainEditorStore();

    const selectedBlockPath = React.useMemo(() => {
        return generateChildrenPathFromArray(selectedBlock || []);
    }, [selectedBlock]);

    const blockTree = generateTree(content.blocks);

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
                    onCopy={duplicateBlock}
                    onDelete={deleteBlock}
                    onSelect={setSelectedBlock}
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
            <div className={b('head')}>
                <div className={b('actions')}>
                    <Button view="outlined-danger" onClick={() => resetBlocks()}>
                        <Icon data={TrashBin} />
                        Clear all
                    </Button>
                </div>
            </div>
            <div className={b('cards')}>{renderTree(blockTree)}</div>
        </div>
    );
};

export default Tree;
