import {BlockData} from '../../constructor-items';

import CardLayout from './CardLayout';
import {defaultValue, form} from './form';
import icon from './icon';

const CardLayoutBlockConfig: BlockData = {
    type: 'card-layout-block',
    component: CardLayout,
    schema: {
        name: 'Card Layout Block',
        group: '@gravity-ui/page-constructor/CardContainers',
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default CardLayoutBlockConfig;
