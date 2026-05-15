import SliderBlock from './Slider';
import {defaultValue, form} from './form';
import icon from './icon';

const SliderBlockConfig = {
    type: '@gravity-ui/page-constructor/slider-block',
    component: SliderBlock,
    schema: {
        name: 'Slider Block',
        group: '@gravity-ui/page-constructor/CardContainers',
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default SliderBlockConfig;
