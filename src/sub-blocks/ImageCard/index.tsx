import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import ImageCard from './ImageCard';
import icon from './icon';
import {ImageCard as ImageCardSchema} from './schema';

const ImageCardConfig: BlockData = {
    type: '@gravity-ui/page-constructor/image-card',
    component: ImageCard,
    schema: {
        name: 'Image Card',
        group: '@gravity-ui/page-constructor/Cards',
        // TODO: change to custom block schema
        inputs: generateFormFieldsFromAjvSchema(
            ImageCardSchema['image-card'] as unknown as JSONSchemaType<{}>,
        ),
        default: {
            title: 'Image Card',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        previewImg: icon,
    },
};

export default ImageCardConfig;
