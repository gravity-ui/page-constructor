import _ from 'lodash';
import React, {Fragment, ReactElement, useContext} from 'react';

import {getBlockKey} from '../../../../utils';
import {InnerContext} from '../../../../context/innerContext';
import {Block, ConstructorItem as ConstructorItemType, ShouldRenderBlock} from '../../../../models';
import {ConstructorLoadable} from '../ConstructorLoadable';
import {ConstructorItem} from '../ConstructorItem';
import {ConstructorBlock} from '../ConstructorBlock/ConstructorBlock';

interface ConstructorBlocksProps {
    items: ConstructorItemType[];
    shouldRenderBlock?: ShouldRenderBlock;
}

export const ConstructorBlocks: React.FC<ConstructorBlocksProps> = ({items, shouldRenderBlock}) => {
    const {blockTypes, customLoadable, itemMap} = useContext(InnerContext);

    const renderer = (item: ConstructorItemType, index: number): ReactElement | null => {
        if (!itemMap[item.type]) {
            return null;
        }

        let children;
        let itemElement;
        const key = getBlockKey(item, index);

        if (shouldRenderBlock && !shouldRenderBlock(item, key)) {
            return null;
        }

        if ('loadable' in item && item.loadable) {
            const {source, serviceId, params} = item.loadable;
            const config = _.get(customLoadable, source);
            if (!config) {
                return null;
            }

            itemElement = (
                <ConstructorLoadable
                    block={item}
                    key={key}
                    blockKey={key}
                    config={config}
                    serviceId={serviceId}
                    params={params}
                />
            );
        } else {
            if ('children' in item && item.children) {
                children = item.children.map(renderer);
            }

            itemElement = (
                <ConstructorItem data={item} key={key}>
                    {children}
                </ConstructorItem>
            );
        }

        return blockTypes.includes(item.type) ? (
            <ConstructorBlock data={item as Block} key={key} Component={itemElement} />
        ) : (
            itemElement
        );
    };

    return <Fragment>{items.map(renderer)}</Fragment>;
};
