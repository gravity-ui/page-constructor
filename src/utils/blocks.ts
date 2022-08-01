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

export const getCustomBlockTypes = ({blocks = {}, headers = {}}: CustomConfig = {}) => [
    ...Object.keys(blocks),
    ...Object.keys(headers),
];

export const getCustomComponents = ({
    blocks = {},
    headers = {},
    components = {},
}: CustomConfig = {}) => ({
    ...blocks,
    ...headers,
    ...components,
});

export const getCustomHeaderTypes = (customBlocks: CustomConfig = {}) => {
    const {headers = {}} = customBlocks;

    return Object.keys(headers);
};
