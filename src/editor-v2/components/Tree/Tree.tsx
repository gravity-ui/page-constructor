import React, {PropsWithChildren} from 'react';

import {TrashBin} from '@gravity-ui/icons';
import {Button, Card, Icon} from '@gravity-ui/uikit';

import {ItemConfig} from '../../../common/types';
import {block} from '../../../utils';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';

import './Tree.scss';

const b = block('tree');

export interface TreeProps {
    blocks: ItemConfig[];
}

type TreeItem = {
    type: string;
    children?: TreeItem[];
};

const generateTree = (items: TreeItem[]): TreeItem[] => {
    return items.map((item) => {
        let children;

        if ('children' in item && item.children?.length) {
            children = generateTree(item.children);
        }

        return {
            type: item.type,
            children,
        };
    });
};

const Tree = (_p: PropsWithChildren<TreeProps>) => {
    const {content, resetBlocks} = useMainEditorStore();

    const blockTree = generateTree(content.blocks);

    const renderTree = (items: TreeItem[], deepLevel = 0) => {
        return items.map(({type, children}, index) => (
            <React.Fragment key={index}>
                <Card className={b('item', {deep: deepLevel})}>{type}</Card>
                {children && renderTree(children, deepLevel + 1)}
            </React.Fragment>
        ));
    };

    return (
        <div className={b()}>
            <div className={b('head')}>
                <div className={b('title')}>Tree</div>
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
