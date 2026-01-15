import {ImageProps} from '../../components/Image/schema';
import {
    ButtonBlock,
    GravityIconProps,
    LinkProps,
    TitleProps,
    containerSizesArray,
    contentSizes,
    contentThemes,
    sizeNumber,
    withTheme,
} from '../../schema/validators/common';
import {filteredArray} from '../../schema/validators/utils';

export const ContentItem = {
    additionalProperties: false,
    oneOf: [
        {
            required: ['icon'],
        },
        {
            required: ['gravityIcon'],
        },
    ],
    properties: {
        title: {
            type: 'string',
            contentType: 'text',
        },
        text: {
            type: 'string',
            contentType: 'yfm',
        },
        icon: withTheme(ImageProps),
        gravityIcon: withTheme(GravityIconProps),
    },
};

export const ContentLabel = {
    additionalProperties: false,
    required: ['text'],
    properties: {
        text: {
            type: 'string',
            contentType: 'text',
        },
        icon: withTheme(ImageProps),
        gravityIcon: withTheme(GravityIconProps),
    },
};

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
    list: filteredArray(ContentItem),
    labels: filteredArray(ContentLabel),
    controlPosition: {
        type: 'string',
        enum: ['default', 'bottom'],
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
