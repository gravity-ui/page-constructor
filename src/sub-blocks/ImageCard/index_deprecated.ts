import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import ImageCard from './ImageCard';
import {ImageCard as ImageCardSchema} from './schema';

const ImageCardConfig: BlockData = {
    type: 'image-card',
    component: ImageCard,
    schema: {
        name: 'Image Card',
        group: '@deprecated',
        hidden: true,
        inputs: generateFormFieldsFromAjvSchema(
            ImageCardSchema['image-card'] as unknown as JSONSchemaType<{}>,
        ),
        default: {
            title: 'Image Card',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
    },
};

export default ImageCardConfig;
