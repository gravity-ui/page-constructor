import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import ShareBlock from './Share';
import {ShareBlock as ShareBlockSchema} from './schema';

const ShareBlockConfig = {
    type: '@gravity-ui/page-constructor/share-block',
    component: ShareBlock,
    schema: {
        name: 'Share Block',
        group: '@gravity-ui/page-constructor/Blocks',
        // TODO: change to custom block schema
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
