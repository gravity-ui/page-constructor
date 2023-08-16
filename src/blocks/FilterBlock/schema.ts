import {
    AnimatableProps,
    BlockBaseProps,
    BlockHeaderProps,
    containerSizesObject,
} from '../../schema/validators/common';
import {filteredArray} from '../../schema/validators/utils';

export const FilterTagProps = {
    additionalProperties: false,
    required: ['id', 'label'],
    properties: {
        id: {
            type: 'string',
        },
        label: {
            type: 'string',
        },
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
        allTag: {oneOf: [{type: 'boolean'}, {type: 'string'}]},
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
