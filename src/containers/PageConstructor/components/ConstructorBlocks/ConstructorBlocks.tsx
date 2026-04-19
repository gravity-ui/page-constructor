import * as React from 'react';

import get from 'lodash/get';

import EmptyBlocksWrapper from '../../../../components/editor/EmptyBlocksWrapper/EmptyBlocksWrapper';
import {InnerContext} from '../../../../context/innerContext';
import {BlockDecoration} from '../../../../customization/BlockDecoration';
import {
    BlockType,
    ConstructorBlock as ConstructorBlockType,
    LoadableProps,
    SubBlock,
} from '../../../../models';
import {getBlockKey} from '../../../../utils';
import {ConstructorBlock} from '../ConstructorBlock/ConstructorBlock';
import {ConstructorItem} from '../ConstructorItem';
import {ConstructorLoadable} from '../ConstructorLoadable';

export interface ConstructorBlocksProps {
    items: ConstructorBlockType[];
}

export const ConstructorBlocks: React.FC<ConstructorBlocksProps> = ({items}) => {
    const {loadables, shouldRenderBlock, blocks} = React.useContext(InnerContext);

    const renderer = (
        parentId = '',
        withoutConstructorBlockWrapper = false,
        item: ConstructorBlockType,
        index: number,
    ): React.ReactElement | null => {
        const blockData = blocks.find(({type}) => item.type === type);

        if (!blockData) {
            return parentId ? null : (
                <BlockDecoration type={item.type as BlockType} index={index}>
                    {null}
                </BlockDecoration>
            );
        }

        let itemElement;
        const key = getBlockKey(item, index);
        const blockId = parentId ? `${parentId}_${key}` : key;
        if (shouldRenderBlock && !shouldRenderBlock(item, blockId)) {
            return null;
        }

        if ('loadable' in item && item.loadable) {
            const {source, serviceId, params} = item.loadable as LoadableProps;
            const config = get(loadables, source);

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
                children = (item.children as SubBlock[]).map(renderer.bind(null, blockId, true));
            }

            itemElement = (
                <ConstructorItem data={item} key={blockId} blockKey={index}>
                    {children}
                </ConstructorItem>
            );
        }

        return withoutConstructorBlockWrapper ? (
            itemElement
        ) : (
            //TODO: replace ConstructorBlock (and delete it) with BlockBase when all
            // components relying on constructor inner structure like Slider or blog-constructor will be refactored
            <ConstructorBlock data={item} key={blockId} index={index}>
                {itemElement}
            </ConstructorBlock>
        );
    };

    // Показываем EmptyBlocksWrapper когда нет блоков (только в режиме редактора)
    if (items.length === 0) {
        return <EmptyBlocksWrapper />;
    }

    return <React.Fragment>{items.map(renderer.bind(null, '', false))}</React.Fragment>;
};
