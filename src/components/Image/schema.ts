import {filteredItem} from '../../schema/validators/utils';

export const imageUrlPattern =
    '^((http[s]?|ftp):\\/)?\\/?([^:\\/\\s]+)((\\/\\w+)*\\/)([\\w\\-\\.]+[^#?\\s]+)(.*)?(#[\\w\\-]+)?$';

const ImageBase = {
    alt: {
        type: 'string',
        contentType: 'text',
    },
    disableCompress: {
        type: 'boolean',
    },
    loading: {
        type: 'string',
        enum: ['eager', 'lazy'],
    },
    fetchPriority: {
        type: 'string',
        enum: ['high', 'low', 'auto'],
    },
    hide: {
        oneOf: [
            {
                type: 'boolean',
            },
            {
                type: 'object',
                properties: {
                    mobile: {type: 'boolean'},
                    tablet: {type: 'boolean'},
                    desktop: {type: 'boolean'},
                },
            },
        ],
    },
};

const StyleBase = {
    type: 'object',
    additionalProperties: false,
    required: [],
    properties: {
        backgroundColor: {type: 'string'},
        height: {type: ['string', 'number']},
        width: {type: ['string', 'number']},
        color: {type: 'string'},
    },
};

export const ImageDeviceProps = {
    type: 'object',
    additionalProperties: false,
    required: ['desktop', 'mobile'],
    properties: {
        ...ImageBase,
        desktop: {type: 'string', pattern: imageUrlPattern},
        tablet: {
            type: 'string',
            pattern: imageUrlPattern,
        },
        mobile: {
            type: 'string',
            pattern: imageUrlPattern,
        },
    },
};

export const ImageBaseObjectProps = {
    type: 'object',
    additionalProperties: false,
    properties: {
        ...ImageBase,
        src: {
            type: 'string',
            pattern: imageUrlPattern,
        },
        style: StyleBase,
    },
};

export const ImageObjectProps = {
    ...ImageBaseObjectProps,
    required: ['src'],
};

export const ImageProps = {
    oneOf: [
        {
            type: 'string',
            pattern: imageUrlPattern,
            optionName: 'url',
        },
        filteredItem({
            ...ImageObjectProps,
            optionName: 'options',
        }),
        filteredItem({
            ...ImageDeviceProps,
            optionName: 'device options',
        }),
        {
            type: 'array',
            items: filteredItem({
                ...ImageObjectProps,
            }),
            optionName: 'options list',
        },
        {
            type: 'array',
            items: filteredItem({
                ...ImageDeviceProps,
            }),
            optionName: 'device options list',
        },
    ],
};

export const BackgroundImageProps = {
    anyOf: [
        {
            ...ImageBaseObjectProps,
            optionName: 'options',
        },
        {
            ...ImageDeviceProps,
            optionName: 'device options',
        },
    ],
};
