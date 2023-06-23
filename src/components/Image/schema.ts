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

export const ImageObjectProps = {
    type: 'object',
    additionalProperties: false,
    required: ['src'],
    properties: {
        ...ImageBase,
        src: {
            type: 'string',
            pattern: imageUrlPattern,
        },
    },
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
    ],
};
