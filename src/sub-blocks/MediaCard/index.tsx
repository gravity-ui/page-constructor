import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFromAJV} from '../../utils/form-generator';

import MediaCard from './MediaCard';
import {MediaCardBlock as MediaCardSchema} from './schema';

const MediaCardConfig: BlockData = {
    component: MediaCard,
    schema: {
        name: 'Media Card',
        inputs: generateFromAJV(MediaCardSchema['media-card'] as unknown as JSONSchemaType<{}>),
        default: {
            content: {
                title: 'Media Card',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            },
        },
    },
};

export default MediaCardConfig;
