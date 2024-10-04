import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import LayoutItem from './LayoutItem';
import {LayoutItem as LayoutItemSchema} from './schema';

const LayoutItemConfig = {
    component: LayoutItem,
    schema: {
        name: 'Layout Item',
        inputs: generateFromAJV(LayoutItemSchema as unknown as JSONSchemaType<{}>),
    },
};

export default LayoutItemConfig;
