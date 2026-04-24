import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import TabsBlock from './Tabs';
import icon from './icon';
import {TabsBlock as TabsBlockSchema} from './schema';

const TabsBlockConfig = {
    type: '@gravity-ui/page-constructor/tabs-block',
    component: TabsBlock,
    schema: {
        name: 'Tabs Block',
        group: '@gravity-ui/page-constructor/Blocks',
        inputs: generateFormFieldsFromAjvSchema(
            TabsBlockSchema['tabs-block'] as unknown as JSONSchemaType<{}>,
        ),
        default: {
            title: 'Tabs Block',
            items: [
                {
                    tabName: 'First Tab',
                    text: 'First Tab Content',
                    title: 'First Tab Title',
                },
                {
                    text: 'Second Tab Content',
                    title: 'Second Tab Title',
                    tabName: 'Second Tab',
                },
            ],
        },
        previewImg: icon,
    },
};

export default TabsBlockConfig;
