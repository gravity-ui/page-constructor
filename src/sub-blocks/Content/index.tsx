import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFromAJV} from '../../utils/form-generator';

import Content from './Content';
import {ContentBlock} from './schema';

const ContentConfig: BlockData = {
    component: Content,
    schema: {
        name: 'Content',
        inputs: generateFromAJV(ContentBlock['content'] as unknown as JSONSchemaType<{}>),
        default: {
            title: 'Content',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
    },
};

export default ContentConfig;
