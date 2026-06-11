import {BlockData} from '../../constructor-items';

import BasicCard from './BasicCard';
import {defaultValue, form} from './form';
import icon from './icon';

const BasicCardConfig: BlockData = {
    type: 'basic-card',
    component: BasicCard,
    schema: {
        name: 'Basic Card',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default BasicCardConfig;
