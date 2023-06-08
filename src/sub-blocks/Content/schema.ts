import {
    ButtonBlock,
    LinkProps,
    TitleProps,
    containerSizesArray,
    contentSizes,
    contentThemes,
    sizeNumber,
} from '../../schema/validators/common';
import {filteredArray} from '../../schema/validators/utils';

export const ContentBase = {
    title: {
        oneOf: [
            {
                type: 'string',
                contentType: 'text',
                optionName: 'text',
            },
            {
                ...TitleProps,
                optionName: 'options',
            },
        ],
    },
    text: {
        type: 'string',
        contentType: 'yfm',
        inputType: 'textarea',
    },
    additionalInfo: {
        type: 'string',
        contentType: 'yfm',
    },
    size: {
        type: 'string',
        enum: contentSizes,
    },
    links: filteredArray(LinkProps),
    buttons: filteredArray(ButtonBlock),
    theme: {
        type: 'string',
        enum: contentThemes,
    },
};

export const ContentBlock = {
    content: {
        additionalProperties: false,
        properties: {
            ...ContentBase,
            colSizes: containerSizesArray.reduce((acc, size) => ({...acc, [size]: sizeNumber}), {}),
            centered: {
                type: 'boolean',
            },
        },
    },
};
