import {
    AnimatableProps,
    BlockBaseProps,
    BlockHeaderProps,
    containerSizesObject,
} from '../../schema/validators/common';
import {AnalyticsEventSchema} from '../../schema/validators/event';
import {filteredArray} from '../../schema/validators/utils';

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
        collapsible: {type: 'boolean'},
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
        visibleRowsCount: {
            type: 'object',
            additionalProperties: false,
            properties: Object.fromEntries(
                ['all', 'sm', 'md', 'lg', 'xl'].map((size) => [
                    size,
                    {type: 'integer', minimum: 1},
                ]),
            ),
        },
        expandButtonText: {type: 'string'},
        collapseButtonText: {type: 'string'},
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
