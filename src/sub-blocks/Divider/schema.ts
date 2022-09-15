import {dividerEnum, BaseProps} from '../../schema/validators/common';

export const Divider = {
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
