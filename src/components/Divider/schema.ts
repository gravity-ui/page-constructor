import {dividerEnum, BaseProps} from '../../schema/validators/common';

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
