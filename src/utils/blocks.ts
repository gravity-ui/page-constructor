import _ from 'lodash';

import {TextSize, CustomConfig, ConstructorBlock} from '../models';

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

export function getBlockKey(block: ConstructorBlock, index: number) {
    return `${block.type}-${index}`;
}

export const getCustomBlockV2Types = (customBlocks: CustomConfig = {}) => {
    const {blocks = {}, headers = {}} = customBlocks;

    return [
        ...Object.keys(blocks).filter(isV2BlockType),
        ...Object.keys(headers).filter(isV2BlockType),
    ];
};

export const getCustomComponents = (customBlocks: CustomConfig = {}) => {
    const {blocks = {}, headers = {}} = customBlocks;

    return {...blocks, ...headers};
};

export const getCustomHeaderTypes = (customBlocks: CustomConfig = {}) => {
    const {headers = {}} = customBlocks;

    return Object.keys(headers);
};
