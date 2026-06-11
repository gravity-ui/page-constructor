import {BlockData} from '../../constructor-items';

import BannerBlock from './Banner';
import {defaultValue, form} from './form';
import icon from './icon';

const BannerBlockConfig: BlockData = {
    type: 'banner-block',
    component: BannerBlock,
    schema: {
        name: 'Banner Block',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default BannerBlockConfig;
