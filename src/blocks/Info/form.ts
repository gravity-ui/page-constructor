import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import {InfoBlock as InfoBlockSchema} from './schema';

// TODO: change to custom block schema
export const form = generateFormFieldsFromAjvSchema(
    InfoBlockSchema['info-block'] as unknown as JSONSchemaType<{}>,
);

export const defaultValue = {
    type: 'info-block',
    title: 'Info Block',
    backgroundColor: '#2c2c2c',
    sectionsTitle: 'Other links',
    links: [
        {
            text: 'Link 1',
        },
        {
            text: 'Link 2',
        },
        {
            text: 'Link 3',
        },
    ],
    buttons: [
        {
            text: 'Read more',
            theme: 'outlined-contrast',
        },
        {
            text: 'Go back',
            theme: 'action',
        },
    ],
};
