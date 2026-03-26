import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFromAJV} from '../../utils/form-generator';

import BackgroundCard from './BackgroundCard';
import {BackgroundCard as BackgroundCardSchema} from './schema';

const BackgroundCardConfig: BlockData = {
    type: 'background-card',
    component: BackgroundCard,
    schema: {
        name: 'Background Card',
        group: '@deprecated',
        hidden: true,
        inputs: generateFromAJV(
            BackgroundCardSchema['background-card'] as unknown as JSONSchemaType<{}>,
        ),
        default: {
            title: 'Background Card',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            additionalInfo: 'Additional info',
            backgroundColor: '#F0F0F0',
        },
    },
};

export default BackgroundCardConfig;
