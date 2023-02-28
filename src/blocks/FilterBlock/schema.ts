import {AnimatableProps, BlockBaseProps, BlockHeaderProps} from '../../schema/validators/common';
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

export const FilterProps = {
    additionalProperties: false,
    required: ['filterTags', 'block'],
    properties: {
        ...BlockBaseProps,
        ...AnimatableProps,
        ...BlockHeaderProps,
        filterTags: filteredArray(FilterTagProps),
        tagSize: {
            type: 'string',
            enum: ['s', 'm', 'l', 'xl'],
        },
        allTag: {oneOf: [{type: 'boolean'}, {type: 'string'}]},
        child: {$ref: 'self#/definitions/children'},
    },
};

export const FilterBlock = {
    'filterable-block': FilterProps,
};
