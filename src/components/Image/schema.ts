import {filteredItem} from '../../schema/validators/utils';

export const urlPattern =
    '^((http[s]?|ftp):\\/)?\\/?([^:\\/\\s]+)((\\/\\w+)*\\/)([\\w\\-\\.]+[^#?\\s]+)(.*)?(#[\\w\\-]+)?$';

export const ImageDeviceProps = {
    type: 'object',
    additionalProperties: false,
    required: ['desktop', 'mobile'],
    properties: {
        desktop: {type: 'string', pattern: urlPattern},
        tablet: {
            type: 'string',
            pattern: urlPattern,
        },
        mobile: {
            type: 'string',
            pattern: urlPattern,
        },
        alt: {
            type: 'string',
            contentType: 'text',
        },
        disableCompress: {
            type: 'boolean',
        },
    },
};

export const ImageObjectProps = {
    type: 'object',
    additionalProperties: false,
    required: ['src'],
    properties: {
        src: {
            type: 'string',
            pattern: urlPattern,
        },
        alt: {
            type: 'string',
            contentType: 'text',
        },
        disableCompress: {
            type: 'boolean',
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
