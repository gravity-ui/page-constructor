import {HeaderProperties, SliderProps} from '../../schema/validators/blocks';
import {BlockBaseProps} from '../../schema/validators/common';

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
