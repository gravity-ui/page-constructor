import {BaseProps} from '../../schema/validators/common';
import {ImageProps} from '../../components/Image/schema';

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
