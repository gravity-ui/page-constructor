import {BaseProps, ImageProps} from '../../schema/common';

export const PartnerBlock = {
    partner: {
        additionalProperties: false,
        required: ['text', 'logo', 'url'],
        properties: {
            ...BaseProps,
            text: {
                type: 'string',
            },
            logo: ImageProps,
            url: {
                type: 'string',
            },
        },
    },
};
