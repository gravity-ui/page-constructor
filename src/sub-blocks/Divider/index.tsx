import {BlockData} from '../../constructor-items';

import Divider from './Divider';
import {defaultValue, form} from './form';
import icon from './icon';

const DividerConfig: BlockData = {
    type: '@gravity-ui/page-constructor/divider',
    component: Divider,
    schema: {
        name: 'Divider',
        group: '@gravity-ui/page-constructor/Cards',
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default DividerConfig;
