import {BaseProps, textSize, ButtonBlock, TitleProps} from '../../schema/validators/common';
import {filteredArray} from '../../schema/validators/utils';

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
        image: {
            type: 'string',
        },
        title: {
            oneOf: [{type: 'string'}, TitleProps],
        },
        description: {
            type: 'string',
        },
        additionalInfo: {
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
        links: filteredArray(CardWithImageLinks),
        buttons: filteredArray(ButtonBlock),
    },
};

export const CardWithImage = {
    'card-with-image': CardWithImageItem,
};
