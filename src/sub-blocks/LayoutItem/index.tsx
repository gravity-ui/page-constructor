import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFromAJV} from '../../utils/form-generator';

import LayoutItem from './LayoutItem';
import {LayoutItem as LayoutItemSchema} from './schema';

const LayoutItemConfig: BlockData = {
    component: LayoutItem,
    schema: {
        name: 'Layout Item',
        inputs: generateFromAJV(LayoutItemSchema as unknown as JSONSchemaType<{}>),
        default: {
            content: {
                title: 'Layout Item',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            },
        },
    },
};

export default LayoutItemConfig;
