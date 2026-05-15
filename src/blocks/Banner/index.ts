import {BlockData} from '../../constructor-items';

import BannerBlock from './Banner';
import {defaultValue, form} from './form';
import icon from './icon';

const BannerBlockConfig: BlockData = {
    type: '@gravity-ui/page-constructor/banner-block',
    component: BannerBlock,
    schema: {
        name: 'Banner Block',
        group: '@gravity-ui/page-constructor/Blocks',
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default BannerBlockConfig;
