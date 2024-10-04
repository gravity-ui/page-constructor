import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import TabsBlock from './Tabs';
import {TabsBlock as TabsBlockSchema} from './schema';

const TabsBlockConfig = {
    component: TabsBlock,
    schema: {
        name: 'Tabs Block',
        inputs: generateFromAJV(TabsBlockSchema['tabs-block'] as unknown as JSONSchemaType<{}>),
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
    },
};

export default TabsBlockConfig;
