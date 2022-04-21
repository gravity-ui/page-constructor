import {BaseProps, ImageObjectProps} from '../../schema/common';
import {CardBase} from '../CardBase/schema';
import {ContentBase} from '../Content/schema';

export const BackgroundCard = {
    'background-card': {
        additionalProperties: false,
        required: ['title', 'text'],
        properties: {
            ...BaseProps,
            ...CardBase,
            ...ContentBase,
            url: {
                type: 'string',
            },
            background: ImageObjectProps,
            backgroundColor: {
                type: 'string',
            },
            paddingBottom: {
                type: 'string',
                enum: ['s', 'm', 'l', 'xl'],
            },
        },
    },
};
