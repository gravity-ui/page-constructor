import _ from 'lodash';

import {BlockDecorator, CustomConfig} from '../../models';

export const formatBlockName = (name: string) => _.capitalize(name).replace(/(block|-)/g, ' ');

export const addCustomDecorator = (decorators: BlockDecorator[], custom = {} as CustomConfig) => {
    const customDecorators = custom.decorators || {};

    return {
        ...custom,
        decorators: {
            ...customDecorators,
            block: [...(customDecorators.block || []), ...decorators],
        },
    };
};
