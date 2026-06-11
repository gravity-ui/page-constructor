import {BlockData} from '../../constructor-items';

import HeaderBlock from './Header';
import {defaultValue, form} from './form';

const HeaderBlockConfig: BlockData = {
    type: 'header-block',
    component: HeaderBlock,
    schema: {
        name: 'Header Block',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
        previewImg: 'https://storage.cloud-preprod.yandex.net/qradle-test/header-block.svg',
    },
};

export default HeaderBlockConfig;
