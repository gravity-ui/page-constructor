import _ from 'lodash';

import {HeaderProperties, SliderProps} from '../../schema/validators/blocks';
import {BlockBaseProps} from '../../schema/validators/common';

export const HeaderSliderBlock = {
    'header-slider-block': {
        additionalProperties: false,
        required: ['items'],
        properties: {
            ...BlockBaseProps,
            ..._.omit(SliderProps, ['loadable', 'children']),
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
