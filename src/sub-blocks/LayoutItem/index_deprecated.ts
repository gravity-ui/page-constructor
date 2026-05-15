import {BlockData} from '../../constructor-items';

import LayoutItem from './LayoutItem';
import {defaultValue, form} from './form';
import icon from './icon';

const LayoutItemConfig: BlockData = {
    type: 'layout-item',
    component: LayoutItem,
    schema: {
        name: 'Layout Item',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default LayoutItemConfig;
