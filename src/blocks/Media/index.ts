import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import MediaBlock from './Media';
import {MediaBlock as MediaBlockSchema} from './schema';

const MediaBlockConfig = {
    component: MediaBlock,
    schema: {
        name: 'Media Block',
        inputs: generateFromAJV(MediaBlockSchema['media-block'] as unknown as JSONSchemaType<{}>),
        default: {
            type: 'media-block',
            title: 'Media Block',
            additionalInfo: 'Additional info',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
    },
};

export default MediaBlockConfig;
