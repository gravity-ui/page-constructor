import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import FilterBlock from './FilterBlock';
import {FilterProps} from './schema';

const FilterBlockConfig = {
    component: FilterBlock,
    schema: {
        name: 'Filter Block',
        inputs: generateFromAJV(FilterProps as unknown as JSONSchemaType<{}>),
        default: {
            title: 'Filter Block',
        },
    },
};

export default FilterBlockConfig;
