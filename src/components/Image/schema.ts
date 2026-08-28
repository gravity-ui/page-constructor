import {Device} from '../../models';
import {filteredItem} from '../../schema/validators/utils';

export const imageUrlPattern =
    '^((http[s]?|ftp):\\/)?\\/?([^:\\/\\s]+)((\\/\\w+)*\\/)([\\w\\-\\.]+[^#?\\s]+)(.*)?(#[\\w\\-]+)?$';

const Url = {
    type: 'string',
    pattern: imageUrlPattern,
};

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
                    [Device.Mobile]: {type: 'boolean'},
                    [Device.Tablet]: {type: 'boolean'},
                    [Device.Desktop]: {type: 'boolean'},
                },
            },
        ],
    },
};

const Style = {
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
    required: [Device.Desktop],
    anyOf: [{required: [Device.Tablet]}, {required: [Device.Mobile]}],
    properties: {
        ...ImageBase,
        [Device.Desktop]: Url,
        [Device.Tablet]: Url,
        [Device.Mobile]: Url,
    },
};

export const ImageBaseObjectProps = {
    type: 'object',
    additionalProperties: false,
    properties: {
        ...ImageBase,
        src: Url,
        style: Style,
    },
};

export const ImageObjectProps = {
    ...ImageBaseObjectProps,
    required: ['src'],
};

export const ImageProps = {
    oneOf: [
        {
            ...Url,
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
    oneOf: [
        {
            ...ImageBaseObjectProps,
            optionName: 'options',
        },
        {
            ...ImageDeviceProps,
            properties: {
                ...ImageDeviceProps.properties,
                style: Style,
            },
            optionName: 'device options',
        },
    ],
};
