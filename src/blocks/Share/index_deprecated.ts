import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import ShareBlock from './Share';
import {ShareBlock as ShareBlockSchema} from './schema';

const ShareBlockConfig = {
    type: 'share-block',
    component: ShareBlock,
    schema: {
        name: 'Share Block',
        group: '@deprecated',
        hidden: true,
        inputs: generateFromAJV(ShareBlockSchema['share-block'] as unknown as JSONSchemaType<{}>),
        default: {
            items: ['vk', 'telegram', 'facebook'],
            title: 'Share Block',
        },
    },
};

export default ShareBlockConfig;
