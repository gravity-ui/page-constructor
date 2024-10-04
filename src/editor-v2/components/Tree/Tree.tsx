import React, {PropsWithChildren} from 'react';

import {Card} from '@gravity-ui/uikit';

import {ItemConfig} from '../../../common/types';
import {block} from '../../../utils';
import {useContentConfigStore} from '../../context/contentConfig';

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
    const {config} = useContentConfigStore();

    const blockTree = generateTree(config.blocks);

    const renderTree = (items: TreeItem[], deepLevel = 0) => {
        return items.map(({type, children}, index) => (
            <React.Fragment key={index}>
                <Card className={b('item', {deep: deepLevel})}>{type}</Card>
                {children && renderTree(children, deepLevel + 1)}
            </React.Fragment>
        ));
    };

    return <div className={b()}>{renderTree(blockTree)}</div>;
};

export default Tree;
