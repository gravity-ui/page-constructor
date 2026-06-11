import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import {CardLayoutProps} from './schema';

// TODO: change to custom block schema
export const form = generateFormFieldsFromAjvSchema(
    CardLayoutProps as unknown as JSONSchemaType<{}>,
);

export const defaultValue = {
    type: 'card-layout-block',
    children: [
        {
            type: 'background-card',
            title: 'Tell a story and build a narrative',
            text: 'We are all storytellers. Stories are a powerful way to communicate ideas and share information. The right story can lead to a better understanding of a situation, make us laugh, or even inspire us to do something in the future.',
        },
        {
            type: 'background-card',
            title: 'Tell a story and build a narrative',
            text: 'We are all storytellers. Stories are a powerful way to communicate ideas and share information. The right story can lead to a better understanding of a situation, make us laugh, or even inspire us to do something in the future.',
        },
        {
            type: 'background-card',
            title: 'Tell a story and build a narrative',
            text: 'We are all storytellers. Stories are a powerful way to communicate ideas and share information. The right story can lead to a better understanding of a situation, make us laugh, or even inspire us to do something in the future.',
        },
    ],
    title: 'Card Layout Block',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};
