import _ from 'lodash';

import {TextSize, CustomConfig, ConstructorItem} from '../models';

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

export function getItemKey(block: ConstructorItem, index: number) {
    return `${block.type}-${index}`;
}

export const getCustomBlockTypes = (customBlocks: CustomConfig = {}) => {
    const {blocks = {}, headers = {}} = customBlocks;

    return [...Object.keys(blocks), ...Object.keys(headers)];
};

export const getCustomComponents = (customBlocks: CustomConfig = {}) => {
    const {blocks = {}, headers = {}, components = {}} = customBlocks;

    return {...blocks, ...headers, ...components};
};

export const getCustomHeaderTypes = (customBlocks: CustomConfig = {}) => {
    const {headers = {}} = customBlocks;

    return Object.keys(headers);
};
