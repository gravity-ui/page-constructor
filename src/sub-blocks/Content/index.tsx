import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import Content from './Content';
import {ContentBlock} from './schema';

const ContentConfig: BlockData = {
    type: '@gravity-ui/page-constructor/content',
    component: Content,
    schema: {
        name: 'Content',
        group: '@gravity-ui/page-constructor/Cards',
        // TODO: change to custom block schema
        inputs: generateFormFieldsFromAjvSchema(
            ContentBlock['content'] as unknown as JSONSchemaType<{}>,
        ),
        default: {
            title: 'Content',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
    },
};

export default ContentConfig;
