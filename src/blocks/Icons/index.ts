import IconsBlock from './Icons';
import {defaultValue, form} from './form';

const IconsBlockConfig = {
    type: '@gravity-ui/page-constructor/icons-block',
    component: IconsBlock,
    schema: {
        name: 'Icons Block',
        group: '@gravity-ui/page-constructor/UnfinishedBlocks',
        inputs: form,
        default: defaultValue,
    },
};

export default IconsBlockConfig;
