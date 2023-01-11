import {omit} from 'lodash';

import {BaseProps, textSize} from '../../schema/validators/common';
import {filteredArray} from '../../schema/validators/utils';
import {ContentBase} from '../../sub-blocks/Content/schema';

const CardWithImageContentProps = omit(ContentBase, ['links', 'size', 'text', 'theme']);

const CardWithImageLinks = {
    type: 'object',
    additionalProperties: false,
    required: ['title', 'link'],
    properties: {
        ...BaseProps,
        title: {
            type: 'string',
            contentType: 'text',
        },
        link: {
            type: 'string',
        },
        arrow: {
            type: 'boolean',
        },
        theme: {
            type: 'string',
            enum: ['back', 'file-link', 'normal'],
        },
        textSize: {
            type: 'string',
            enum: textSize,
        },
    },
};

export const CardWithImageItem = {
    additionalProperties: false,
    required: ['image'],
    properties: {
        ...BaseProps,
        ...CardWithImageContentProps,
        image: {
            type: 'string',
        },
        description: {
            type: 'string',
            contentType: 'yfm',
        },
        disableCompress: {
            type: 'boolean',
        },
        border: {
            type: 'boolean',
        },
        fullScreen: {
            type: 'boolean',
        },
        links: filteredArray(CardWithImageLinks),
    },
};

export const CardWithImage = {
    'card-with-image': CardWithImageItem,
};
