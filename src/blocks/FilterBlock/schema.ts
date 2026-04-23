import {
    AnimatableProps,
    BlockBaseProps,
    BlockHeaderProps,
    containerSizesObject,
} from '../../gravity-blocks/schema/validators/common';
import {AnalyticsEventSchema} from '../../gravity-blocks/schema/validators/event';
import {filteredArray} from '../../gravity-blocks/schema/validators/utils';

export const FilterTagProps = {
    type: 'object',
    additionalProperties: false,
    required: ['id', 'label'],
    properties: {
        id: {
            type: 'string',
        },
        label: {
            type: 'string',
        },
        analyticsEvent: AnalyticsEventSchema,
    },
};

export const FilterItemProps = {
    additionalProperties: false,
    required: ['tags', 'card'],
    properties: {
        tags: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
        card: {$ref: 'self#/definitions/cards'},
    },
};

export const FilterProps = {
    additionalProperties: false,
    required: ['tags', 'items'],
    properties: {
        ...BlockBaseProps,
        ...AnimatableProps,
        ...BlockHeaderProps,
        allTag: {
            oneOf: [
                {
                    type: 'boolean',
                    optionName: 'auto',
                },
                {
                    type: 'string',
                    optionName: 'cutom',
                },
                {
                    ...FilterTagProps,
                },
            ],
        },
        colSizes: containerSizesObject,
        tags: filteredArray(FilterTagProps),
        items: filteredArray(FilterItemProps),
        tagButtonSize: {
            type: 'string',
            enum: ['s', 'm', 'l', 'xl'],
        },
        centered: {type: 'boolean'},
    },
};

export const FilterBlock = {
    'filter-block': FilterProps,
};
