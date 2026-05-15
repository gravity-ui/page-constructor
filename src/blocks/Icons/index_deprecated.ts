import IconsBlock from './Icons';
import {defaultValue, form} from './form';

const IconsBlockConfig = {
    type: 'icons-block',
    component: IconsBlock,
    schema: {
        name: 'Icons Block',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
    },
};

export default IconsBlockConfig;
