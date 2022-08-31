import React, {Fragment, ReactElement, useContext} from 'react';
import {getBlockKey} from '../../../../utils';
import {InnerContext} from '../../../../context/innerContext';

import {
    Block,
    ConstructorItem as ConstructorItemType,
    LoadableConfigItem,
} from '../../../../models';
import _ from 'lodash';
import {ConstructorLoadable} from '../ConstructorLoadable';
import {ConstructorItem} from '../ConstructorItem';
import {ConstructorBlock} from '../ConstructorBlock/ConstructorBlock';

interface ConstructorBlocksProps {
    items: ConstructorItemType[];
}

export const ConstructorBlocks: React.FC<ConstructorBlocksProps> = ({items}) => {
    const {blockTypes, customLoadable, itemMap} = useContext(InnerContext);

    const renderer = (item: ConstructorItemType, index: number): ReactElement | null => {
        if (!itemMap[item.type]) {
            return null;
        }

        let children;
        let itemElement;
        const itemKey = getBlockKey(item, index);

        if ('loadable' in item && item.loadable) {
            const {source, serviceId, params} = item.loadable;
            const config: LoadableConfigItem = _.get(customLoadable, source);
            if (!config) {
                return null;
            }

            itemElement = (
                <ConstructorLoadable
                    block={item}
                    blockKey={itemKey}
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
                <ConstructorItem data={item} key={itemKey}>
                    {children}
                </ConstructorItem>
            );
        }

        return blockTypes.includes(item.type) ? (
            <ConstructorBlock data={item as Block} key={itemKey} Component={itemElement} />
        ) : (
            itemElement
        );
    };

    return <Fragment>{items.map(renderer)}</Fragment>;
};
