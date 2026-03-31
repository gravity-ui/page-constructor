import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import QuestionsBlock from './Questions';
import {QuestionsBlock as QuestionsBlockSchema} from './schema';

const QuestionsBlockConfig: BlockData = {
    type: '@gravity-ui/page-constructor/questions-block',
    component: QuestionsBlock,
    schema: {
        name: 'Questions Block',
        group: '@gravity-ui/page-constructor/Blocks',
        // TODO: change to custom block schema
        inputs: generateFormFieldsFromAjvSchema(
            QuestionsBlockSchema['questions-block'] as unknown as JSONSchemaType<{}>,
        ),
        default: {
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
        },
    },
};

export default QuestionsBlockConfig;
