import {dividerEnum, BaseProps} from '../../schema/common';

export const dividerBlock = {
    divider: {
        additionalProperties: false,
        properties: {
            ...BaseProps,
            border: {
                type: 'boolean',
            },
            size: dividerEnum,
        },
    },
};
