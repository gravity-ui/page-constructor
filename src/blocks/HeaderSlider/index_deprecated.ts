import HeaderSliderBlock from './HeaderSlider';
import {defaultValue, form} from './form';

const HeaderSliderBlockConfig = {
    type: 'header-slider-block',
    component: HeaderSliderBlock,
    schema: {
        name: 'Header Slider Block',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
    },
};

export default HeaderSliderBlockConfig;
