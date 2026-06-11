import {BlockData} from '../../constructor-items';

import HeaderBlock from './Header';
import {defaultValue, form} from './form';
import icon from './icon';

const HeaderBlockConfig: BlockData = {
    type: '@gravity-ui/page-constructor/header-block',
    component: HeaderBlock,
    schema: {
        name: 'Header Block',
        group: '@gravity-ui/page-constructor/Blocks',
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default HeaderBlockConfig;
