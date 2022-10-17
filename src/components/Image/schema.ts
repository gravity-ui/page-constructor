import {filteredItem} from '../../schema/validators/utils';
import {urlPattern} from '../../schema/validators/common';

export const ImageDeviceProps = {
    type: 'object',
    additionalProperties: false,
    required: ['desktop', 'mobile'],
    properties: {
        desktop: {type: 'string'},
        tablet: {
            type: 'string',
        },
        mobile: {
            type: 'string',
        },
        alt: {
            type: 'string',
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
