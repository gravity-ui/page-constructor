import {MapProps} from '../../schema/validators/common';
import {MediaBlockBaseProps} from '../Media/schema';

export const Map = {
    type: 'object',
    additionalProperties: false,
    required: [],
    properties: MapProps,
};

export const MapBlock = {
    'map-block': {
        additionalProperties: false,
        required: ['title', 'map'],
        properties: {
            ...MediaBlockBaseProps,
            map: Map,
        },
    },
};
