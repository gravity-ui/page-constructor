import {filteredItem} from '../../schema/validators/utils';

export const urlPattern =
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
        desktop: {type: 'string', pattern: urlPattern},
        tablet: {
            type: 'string',
            pattern: urlPattern,
        },
        mobile: {
            type: 'string',
            pattern: urlPattern,
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
            pattern: urlPattern,
        },
    },
};

export const ImageProps = {
    oneOf: [
        {
            type: 'string',
            pattern: urlPattern,
        },
        filteredItem({
            ...ImageObjectProps,
        }),
        filteredItem({
            ...ImageDeviceProps,
        }),
    ],
};
