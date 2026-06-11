import FilterBlock from './FilterBlock';
import {defaultValue, form} from './form';

const FilterBlockConfig = {
    type: 'filter-block',
    component: FilterBlock,
    schema: {
        name: 'Filter Block',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
    },
};

export default FilterBlockConfig;
