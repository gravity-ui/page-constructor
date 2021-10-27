import _ from 'lodash';

import {TextSize, Block, ShouldRenderBlock, CustomBlock, MenuItem} from '../models';

export function getHeaderTag(size: TextSize) {
    switch (size) {
        case 'l':
            return 'h1';
        case 's':
            return 'h4';
        case 'm':
        default:
            return 'h2';
    }
}

export function getBlockKey(block: Block, index: number) {
    return `${block.type}-${index}`;
}

export const getPageMenuItems = _.memoize(
    (blocks: Block[], shouldRenderBlock?: ShouldRenderBlock) => {
        const items: MenuItem[] = [];

        function getItems(block: Block, index: number) {
            const blockKey = getBlockKey(block, index);

            if (shouldRenderBlock && !shouldRenderBlock(block, blockKey)) {
                return;
            }

            if ('children' in block && block.children) {
                block.children.forEach(getItems);
            }

            //string anchor is used only in old blocks and deprecated
            if ('anchor' in block && block.anchor && typeof block.anchor !== 'string') {
                items.push({...block.anchor, desktopOnly: block.desktopOnly});
            }
        }

        blocks.forEach(getItems);

        return items;
    },
    (...args) => JSON.stringify(args),
);

export const getCustomBlockTypes = (customBlocks: CustomBlock = {}) => {
    const {blocks = {}, headers = {}} = customBlocks;

    return [...Object.keys(blocks), ...Object.keys(headers)];
};

export const getCustomComponents = (customBlocks: CustomBlock = {}) => {
    const {blocks = {}, headers = {}} = customBlocks;

    return {...blocks, ...headers};
};

export const getCustomHeaderTypes = (customBlocks: CustomBlock = {}) => {
    const {headers = {}} = customBlocks;

    return Object.keys(headers);
};
