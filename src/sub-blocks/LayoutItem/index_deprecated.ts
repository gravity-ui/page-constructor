import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import LayoutItem from './LayoutItem';
import {LayoutItem as LayoutItemSchema} from './schema';

const LayoutItemConfig: BlockData = {
    type: 'layout-item',
    component: LayoutItem,
    schema: {
        name: 'Layout Item',
        group: '@deprecated',
        hidden: true,
        inputs: generateFormFieldsFromAjvSchema(LayoutItemSchema as unknown as JSONSchemaType<{}>),
        default: {
            type: 'layout-item',
            content: {
                title: 'Lorem ipsum',
                text: 'Dolor sit amet',
            },
            media: {
                image: 'https://storage.yandexcloud.net/yc-www-community-images/event_ecaf1ef1-bc3a-40fa-adef-827b0959e6c3.jpg',
            },
        },
    },
};

export default LayoutItemConfig;
