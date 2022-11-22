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
        image: {
            type: 'string',
        },
        title: {
            oneOf: [{type: 'string', contentType: 'text'}, TitleProps],
        },
        description: {
            type: 'string',
            contentType: 'yfm',
        },
        additionalInfo: {
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
        buttons: filteredArray(ButtonBlock),
    },
};

export const CardWithImage = {
    'card-with-image': CardWithImageItem,
};
