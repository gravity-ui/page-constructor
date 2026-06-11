import FilterBlock from './FilterBlock';
import {defaultValue, form} from './form';

const FilterBlockConfig = {
    type: '@gravity-ui/page-constructor/filter-block',
    component: FilterBlock,
    schema: {
        name: 'Filter Block',
        group: '@gravity-ui/page-constructor/UnfinishedBlocks',
        inputs: form,
        default: defaultValue,
    },
};

export default FilterBlockConfig;
