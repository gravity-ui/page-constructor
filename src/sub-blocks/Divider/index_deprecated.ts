import {BlockData} from '../../constructor-items';

import Divider from './Divider';
import {defaultValue, form} from './form';
import icon from './icon';

const DividerConfig: BlockData = {
    type: 'divider',
    component: Divider,
    schema: {
        name: 'Divider',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default DividerConfig;
