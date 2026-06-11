import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import {QuestionsBlock as QuestionsBlockSchema} from './schema';

// TODO: change to custom block schema
export const form = generateFormFieldsFromAjvSchema(
    QuestionsBlockSchema['questions-block'] as unknown as JSONSchemaType<{}>,
);

export const defaultValue = {
    type: 'questions-block',
    title: 'Questions Block',
    text: 'Here you can find answers.',
    links: [
        {
            text: 'Report for 2024',
            url: 'file.doc',
        },
    ],
    buttons: [
        {
            text: 'Get more',
            theme: 'outlined-info',
        },
    ],
    list: [
        {
            title: 'Report for 2024',
            text: 'Some advice here',
        },
    ],
    items: [
        {
            title: 'Question 1',
            text: 'Answer for question 1',
        },
        {
            title: 'Question 2',
            text: 'Answer for question 2',
        },
    ],
};
