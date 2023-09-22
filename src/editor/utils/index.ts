import capitalize from 'lodash/capitalize';

import {BlockDecorationProps, BlockDecorator, CustomConfig} from '../../models';
import {ViewModeItem} from '../types';

export const formatBlockName = (name: string) => capitalize(name).replace(/(block|-)/g, ' ');

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

export const getBlockId = ({index, type}: BlockDecorationProps) =>
    `${type}${index === undefined ? '' : `-${index}`}`;

export const checkIsMobile = (viewMode: ViewModeItem) =>
    [ViewModeItem.Mobile, ViewModeItem.Tablet].includes(viewMode);
