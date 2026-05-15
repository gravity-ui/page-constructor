import {BlockData} from '../../constructor-items';

import BannerCard from './BannerCard';
import {defaultValue, form} from './form';
import icon from './icon';

const BannerCardConfig: BlockData = {
    type: 'banner-card',
    component: BannerCard,
    schema: {
        name: 'Banner Card',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default BannerCardConfig;
