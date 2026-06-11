import {BlockData} from '../../constructor-items';

import LayoutItem from './LayoutItem';
import {defaultValue, form} from './form';
import icon from './icon';

const LayoutItemConfig: BlockData = {
    type: '@gravity-ui/page-constructor/layout-item',
    component: LayoutItem,
    schema: {
        name: 'Layout Item',
        group: '@gravity-ui/page-constructor/Cards',
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default LayoutItemConfig;
