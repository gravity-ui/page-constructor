import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import {FoldableListBlock} from './schema';

export const form = generateFormFieldsFromAjvSchema(
    FoldableListBlock['foldable-list-block'] as unknown as JSONSchemaType<{}>,
);

export const defaultValue = {
    title: 'Lorem ipsum dolor sit amet',
    items: [
        {
            title: 'Item 1',
            text: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris.',
        },
        {
            title: 'Item 2',
            text: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris.',
        },
    ],
};
