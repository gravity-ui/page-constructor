import {ImageProps} from '../../components/Image/schema';
import {BaseProps} from '../../schema/validators/common';

export const PartnerBlock = {
    partner: {
        additionalProperties: false,
        required: ['text', 'logo', 'url'],
        properties: {
            ...BaseProps,
            text: {
                type: 'string',
                contentType: 'text',
            },
            logo: ImageProps,
            url: {
                type: 'string',
            },
        },
    },
};
