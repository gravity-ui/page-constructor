import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import ContentLayoutBlock from './ContentLayout';
import {ContentLayoutBlock as ContentLayoutBlockSchema} from './schema';

const ContentLayoutBlockConfig = {
    component: ContentLayoutBlock,
    schema: {
        name: 'Content Layout Block',
        inputs: generateFromAJV(
            ContentLayoutBlockSchema['content-layout-block'] as unknown as JSONSchemaType<{}>,
        ),
        default: {
            title: 'Content Layout Block',
        },
    },
};

export default ContentLayoutBlockConfig;
