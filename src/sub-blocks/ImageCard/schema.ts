import pick from 'lodash/pick';

import {BaseProps, CardBase} from '../../schema/validators/common';
import {ImageProps} from '../../schema/validators/components';
import {ContentBase} from '../Content/schema';

const ImageCardBlockContentProps = pick(ContentBase, ['title', 'text']);

export const ImageCard = {
    'image-card': {
        additionalProperties: false,
        required: ['image'],
        properties: {
            ...BaseProps,
            ...CardBase,
            ...ImageCardBlockContentProps,
            image: ImageProps,
            direction: {
                type: 'string',
                enum: ['direct', 'reverse'],
            },
            margins: {
                type: 'string',
                enum: ['s', 'm'],
            },
            backgroundColor: {
                type: 'string',
            },
        },
    },
};
