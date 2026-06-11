import SliderBlock from './Slider';
import {defaultValue, form} from './form';
import icon from './icon';

const SliderBlockConfig = {
    type: 'slider-block',
    component: SliderBlock,
    schema: {
        name: 'Slider Block',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default SliderBlockConfig;
