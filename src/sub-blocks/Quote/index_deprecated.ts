import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import Quote from './Quote';
import {Quote as QuoteSchema} from './schema';

const QuoteConfig: BlockData = {
    type: 'quote',
    component: Quote,
    schema: {
        name: 'Quote',
        group: '@deprecated',
        hidden: true,
        inputs: generateFormFieldsFromAjvSchema(
            QuoteSchema['quote'] as unknown as JSONSchemaType<{}>,
        ),
        default: {
            text: 'A good decision is based on knowledge and not on numbers.',
            author: {
                firstName: ' Plato',
                description: 'Greek philosopher',
            },
        },
    },
};

export default QuoteConfig;
