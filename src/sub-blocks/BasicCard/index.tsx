import {BlockData} from '../../constructor-items';

import BasicCard from './BasicCard';
import {defaultValue, form} from './form';
import icon from './icon';

const BasicCardConfig: BlockData = {
    type: '@gravity-ui/page-constructor/basic-card',
    component: BasicCard,
    schema: {
        name: 'Basic Card',
        group: '@gravity-ui/page-constructor/Cards',
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default BasicCardConfig;
