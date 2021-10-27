import _ from 'lodash';

import {TextSize, Block, CustomBlock} from '../models';

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
