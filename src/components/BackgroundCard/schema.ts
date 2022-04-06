import {BaseProps, ImageObjectProps} from '../../schema/common';
import {CardBase} from '../CardBase/schema';
import {ContentBase} from '../Content/schema';

export const BackgroundCard = {
    'background-card': {
        additionalProperties: false,
        required: ['title', 'text', 'background'],
        properties: {
            ...BaseProps,
            ...CardBase,
            ...ContentBase,
            url: {
                type: 'string',
            },
            background: ImageObjectProps,
            paddingBottom: {
                type: 'string',
                enum: ['s', 'm', 'l', 'xl'],
            },
        },
    },
};
