import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import SliderBlock from './Slider';
import {SliderBlock as SliderBlockSchema} from './schema';

const SliderBlockConfig = {
    component: SliderBlock,
    schema: {
        name: 'Slider Block',
        inputs: generateFromAJV(SliderBlockSchema['slider-block'] as unknown as JSONSchemaType<{}>),
    },
};

export default SliderBlockConfig;
