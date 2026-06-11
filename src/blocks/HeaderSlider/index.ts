import HeaderSliderBlock from './HeaderSlider';
import {defaultValue, form} from './form';

const HeaderSliderBlockConfig = {
    type: '@gravity-ui/page-constructor/header-slider-block',
    component: HeaderSliderBlock,
    schema: {
        name: 'Header Slider Block',
        group: '@gravity-ui/page-constructor/UnfinishedBlocks',
        inputs: form,
        default: defaultValue,
    },
};

export default HeaderSliderBlockConfig;
