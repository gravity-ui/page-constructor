import _ from 'lodash';

import {TextSize, Block, CustomBlock} from '../models';

export const isV2BlockType = (type: string) => type.includes('-block');

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

export const getCustomBlockV2Types = (customBlocks: CustomBlock = {}) => {
    const {blocks = {}, headers = {}} = customBlocks;

    return [
        ...Object.keys(blocks).filter(isV2BlockType),
        ...Object.keys(headers).filter(isV2BlockType),
    ];
};

export const getCustomComponents = (customBlocks: CustomBlock = {}) => {
    const {blocks = {}, headers = {}} = customBlocks;

    return {...blocks, ...headers};
};

export const getCustomHeaderTypes = (customBlocks: CustomBlock = {}) => {
    const {headers = {}} = customBlocks;

    return Object.keys(headers);
};
