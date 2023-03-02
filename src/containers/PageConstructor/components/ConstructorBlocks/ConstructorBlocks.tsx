import _ from 'lodash';
import React, {Fragment, ReactElement, useContext} from 'react';

import {getBlockKey} from '../../../../utils';
import {InnerContext} from '../../../../context/innerContext';
import {BlockIdContext} from '../../../../context/blockIdContext';
import {Block, ConstructorItem as ConstructorItemType, ShouldRenderBlock} from '../../../../models';
import {ConstructorLoadable} from '../ConstructorLoadable';
import {ConstructorItem} from '../ConstructorItem';
import {ConstructorBlock} from '../ConstructorBlock/ConstructorBlock';

interface ConstructorBlocksProps {
    items: ConstructorItemType[];
    shouldRenderBlock?: ShouldRenderBlock;
}

export const ConstructorBlocks = ({items, shouldRenderBlock}: ConstructorBlocksProps) => {
    const {blockTypes, loadables, itemMap} = useContext(InnerContext);

    const renderer = (
        parentId = '',
        item: ConstructorItemType,
        index: number,
    ): ReactElement | null => {
        if (!itemMap[item.type]) {
            return null;
        }

        let children;
        let itemElement;
        const key = getBlockKey(item, index);
        const blockId = parentId ? `${parentId}_${key}` : key;
        if (shouldRenderBlock && !shouldRenderBlock(item, blockId)) {
            return null;
        }

        if ('loadable' in item && item.loadable) {
            const {source, serviceId, params} = item.loadable;
            const config = _.get(loadables, source);
            if (!config) {
                return null;
            }

            itemElement = (
                <ConstructorLoadable
                    block={item}
                    key={blockId}
                    blockKey={blockId}
                    config={config}
                    serviceId={serviceId}
                    params={params}
                />
            );
        } else {
            if ('children' in item && item.children) {
                children = item.children.map(renderer.bind(null, blockId));
            }

            itemElement = (
                <BlockIdContext.Provider value={blockId}>
                    <ConstructorItem data={item} key={blockId}>
                        {children}
                    </ConstructorItem>
                </BlockIdContext.Provider>
            );
        }

        return blockTypes.includes(item.type) ? (
            <ConstructorBlock data={item as Block} key={key} Component={itemElement} />
        ) : (
            itemElement
        );
    };

    return <Fragment>{items.map(renderer.bind(null, ''))}</Fragment>;
};
