import {
    containerSizesArray,
    contentSizes,
    contentThemes,
    LinkProps,
    sizeNumber,
    ButtonBlock,
    TitleProps,
} from '../../schema/validators/common';
import {filteredArray} from '../../schema/validators/utils';

export const ContentBase = {
    title: {
        oneOf: [{type: 'string'}, TitleProps],
    },
    text: {
        type: 'string',
    },
    additionalInfo: {
        type: 'string',
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
