import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import HeaderBlock from './Header';
import {HeaderBlock as HeaderBlockSchema} from './schema';

const HeaderBlockConfig = {
    component: HeaderBlock,
    schema: {
        name: 'Header Block',
        inputs: generateFromAJV(HeaderBlockSchema['header-block'] as unknown as JSONSchemaType<{}>),
    },
};

export default HeaderBlockConfig;
