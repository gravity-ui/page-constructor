import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import {TabsBlock as TabsBlockSchema} from './schema';

export const form = generateFormFieldsFromAjvSchema(
    TabsBlockSchema['tabs-block'] as unknown as JSONSchemaType<{}>,
);

export const defaultValue = {
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
};
