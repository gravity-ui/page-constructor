import {BaseProps, dividerEnum} from '../../gravity-blocks/schema/validators/common';

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
