import {BlockData} from '../../constructor-items';

import SliderOldBlock from './SliderOld';
import {defaultValue, form} from './form';

const SliderOldBlockConfig: BlockData = {
    type: 'slider-old-block',
    component: SliderOldBlock,
    schema: {
        name: 'Slider Old Block',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
    },
};

export default SliderOldBlockConfig;
