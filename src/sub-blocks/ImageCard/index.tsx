import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFromAJV} from '../../utils/form-generator';

import ImageCard from './ImageCard';
import {ImageCard as ImageCardSchema} from './schema';

const ImageCardConfig: BlockData = {
    component: ImageCard,
    schema: {
        name: 'Image Card',
        inputs: generateFromAJV(ImageCardSchema['image-card'] as unknown as JSONSchemaType<{}>),
        default: {
            title: 'Image Card',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
    },
};

export default ImageCardConfig;
