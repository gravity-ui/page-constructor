import {BlockData} from '../../constructor-items';

import SliderOldBlock from './SliderOld';
import {defaultValue, form} from './form';

const SliderOldBlockConfig: BlockData = {
    type: '@gravity-ui/page-constructor/slider-old-block',
    component: SliderOldBlock,
    schema: {
        name: 'Slider Old Block',
        group: '@gravity-ui/page-constructor/UnfinishedBlocks',
        inputs: form,
        default: defaultValue,
    },
};

export default SliderOldBlockConfig;
