import {BaseProps} from '../../schema/common';
import {filteredArray} from '../../schema/utils';

const CardWithImageLinks = {
    type: 'object',
    additionalProperties: false,
    required: ['title', 'link'],
    properties: {
        ...BaseProps,
        title: {
            type: 'string',
        },
        link: {
            type: 'string',
        },
    },
};

export const CardWithImageItem = {
    additionalProperties: false,
    required: ['image'],
    properties: {
        ...BaseProps,
        image: {
            type: 'string',
        },
        title: {
            type: 'string',
        },
        description: {
            type: 'string',
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
        links: {
            type: 'array',
            items: filteredArray(CardWithImageLinks),
        },
    },
};

export const CardWithImage = {
    'card-with-image': CardWithImageItem,
};
