import {TrashBin} from '@gravity-ui/icons';
import {Button, Card, Icon} from '@gravity-ui/uikit';
import React, {PropsWithChildren, useMemo} from 'react';

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

interface ItemOptions {
    deepLevel?: number;
    parentIndex?: number;
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

const Tree = (_p: PropsWithChildren<TreeProps>) => {
    const {content, resetBlocks, selectedBlock} = useMainEditorStore();

    const selectedBlockPath = useMemo(() => {
        return generateChildrenPathFromArray(selectedBlock || []);
    }, [selectedBlock]);

    const blockTree = generateTree(content.blocks);

    const renderTree = (items: TreeItem[], {parentIndex}: ItemOptions = {}) => {
        return items.map(({type, children, treeTitle}, index) => {
            let blockPathArray: number[];
            if (parentIndex) {
                blockPathArray = [parentIndex, index];
            } else {
                blockPathArray = [index];
            }
            const blockPath = generateChildrenPathFromArray(blockPathArray);
            return (
                <React.Fragment key={index}>
                    <Card
                        className={b('item', {
                            selected: blockPath === selectedBlockPath,
                        })}
                    >
                        <div className={b('type')}>{type}</div>
                        <div className={b('title')}>{treeTitle}</div>
                        {children && (
                            <div className={b('children')}>
                                {renderTree(children, {parentIndex: index})}
                            </div>
                        )}
                    </Card>
                </React.Fragment>
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
