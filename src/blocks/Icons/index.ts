import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import IconsBlock from './Icons';
import {IconsProps} from './schema';

const IconsBlockConfig = {
    component: IconsBlock,
    schema: {
        name: 'Icons Block',
        inputs: generateFromAJV(IconsProps as unknown as JSONSchemaType<{}>),
        default: {
            type: 'icons-block',
            title: 'Icons Block',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
    },
};

export default IconsBlockConfig;
