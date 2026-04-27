import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import ShareBlock from './Share';
import {ShareBlock as ShareBlockSchema} from './schema';

const ShareBlockConfig = {
    type: 'share-block',
    component: ShareBlock,
    schema: {
        name: 'Share Block',
        group: '@deprecated',
        hidden: true,
        inputs: generateFormFieldsFromAjvSchema(
            ShareBlockSchema['share-block'] as unknown as JSONSchemaType<{}>,
        ),
        default: {
            items: ['vk', 'telegram', 'facebook'],
            title: 'Share Block',
        },
    },
};

export default ShareBlockConfig;
