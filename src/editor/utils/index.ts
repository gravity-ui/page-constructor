import _ from 'lodash';

import {BlockDecorator, CustomConfig} from '../../models';

export const formatBlockName = (name: string) => _.capitalize(name).replace(/(block|-)/g, ' ');

export const getBlockIndexFromId = (blockId?: string) => Number(blockId?.split('-')?.at(-1));

export const addCustomDecorator = (decorator: BlockDecorator, custom = {} as CustomConfig) => {
    const decorators = custom.decorators || {};

    return {
        ...custom,
        decorators: {
            ...decorators,
            block: [...(decorators.block || []), decorator],
        },
    };
};
