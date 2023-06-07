import React, {Fragment, ReactElement, useContext} from 'react';

import _ from 'lodash';

import {InnerContext} from '../../../../context/innerContext';
import {Block, ConstructorItem as ConstructorItemType} from '../../../../models';
import {getBlockKey} from '../../../../utils';
import {ConstructorBlock} from '../ConstructorBlock/ConstructorBlock';
import {ConstructorItem} from '../ConstructorItem';
import {ConstructorLoadable} from '../ConstructorLoadable';

interface ConstructorBlocksProps {
    items: ConstructorItemType[];
}

export const ConstructorBlocks: React.FC<ConstructorBlocksProps> = ({items}) => {
    const {blockTypes, loadables, itemMap, shouldRenderBlock} = useContext(InnerContext);

    const renderer = (
        parentId = '',
        item: ConstructorItemType,
        index: number,
    ): ReactElement | null => {
        if (!itemMap[item.type]) {
            return null;
        }

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
            let children;
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
            //TODO: replace ConstructorBlock (and delete it) with BlockBase when all
            // components relying on constructor inner structure like Slider or blog-constructor will be refactored
            <ConstructorBlock data={item as Block} key={blockId} index={index}>
                {itemElement}
            </ConstructorBlock>
        ) : (
            itemElement
        );
    };

    return <Fragment>{items.map(renderer.bind(null, ''))}</Fragment>;
};
