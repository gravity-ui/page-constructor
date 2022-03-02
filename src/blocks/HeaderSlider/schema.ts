import {HeaderProperties, SliderProps} from '../../schema/v2';
import {BlockBaseProps} from '../../schema/v2/common';

export const HeaderSliderBlock = {
    'header-slider-block': {
        additionalProperties: false,
        required: ['items'],
        properties: {
            ...BlockBaseProps,
            ...SliderProps,
            items: {
                type: 'array',
                items: {
                    type: 'object',
                    additionalProperties: false,
                    required: ['title'],
                    properties: HeaderProperties,
                },
            },
        },
    },
};
