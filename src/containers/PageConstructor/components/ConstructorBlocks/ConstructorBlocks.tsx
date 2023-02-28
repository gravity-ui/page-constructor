import _ from 'lodash';
import React, {Fragment, ReactElement, useContext} from 'react';

import {getBlockKey} from '../../../../utils';
import {InnerContext, InnerContextType} from '../../../../context/innerContext';
import {ConstructorItem as ConstructorItemType, ShouldRenderBlock} from '../../../../models';
import {ConstructorLoadable} from '../ConstructorLoadable';
import {ConstructorItem} from '../ConstructorItem';

interface ConstructorBlocksProps {
    items: ConstructorItemType[];
    shouldRenderBlock?: ShouldRenderBlock;
}

const withItemWrappers = (
    item: React.ReactElement,
    key: string,
    data: ConstructorItemType,
    context: InnerContextType,
): React.ReactElement => {
    const {itemWrappers} = context;
    let wrappedItem = item;
    itemWrappers.forEach((wrapper) => {
        wrappedItem = wrapper(wrappedItem, key, data, context);
    });
    return wrappedItem;
};

export const ConstructorBlocks = ({items, shouldRenderBlock}: ConstructorBlocksProps) => {
    const context = useContext(InnerContext);
    const {loadables, itemMap} = context;

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
                <ConstructorItem data={item} key={blockId} blockKey={blockId}>
                    {children}
                </ConstructorItem>
            );
        }

        return blockTypes.includes(item.type) ? (
            <ConstructorBlock data={item as Block} key={blockId} Component={itemElement} />
        ) : (
            itemElement
        );
    };

    return <Fragment>{items.map(renderer.bind(null, ''))}</Fragment>;
};
