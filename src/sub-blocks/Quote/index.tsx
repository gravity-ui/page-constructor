import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFromAJV} from '../../utils/form-generator';

import Quote from './Quote';
import {Quote as QuoteSchema} from './schema';

const QuoteConfig: BlockData = {
    component: Quote,
    schema: {
        name: 'Quote',
        inputs: generateFromAJV(QuoteSchema['quote'] as unknown as JSONSchemaType<{}>),
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
