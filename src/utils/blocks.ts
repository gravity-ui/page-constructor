import _ from 'lodash';
import {ConstructorBlock} from '../models/constructor';

import {TextSize, CustomConfig} from '../models';

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

export const getCustomBlockTypes = ({blocks = {}, headers = {}}: CustomConfig = {}) => [
    ...Object.keys(blocks),
    ...Object.keys(headers),
];

export const getCustomItems = ({blocks = {}, headers = {}, subBlocks = {}}: CustomConfig = {}) => ({
    ...blocks,
    ...headers,
    ...subBlocks,
});

export const getCustomHeaderTypes = (customBlocks: CustomConfig = {}) => {
    const {headers = {}} = customBlocks;

    return Object.keys(headers);
};
