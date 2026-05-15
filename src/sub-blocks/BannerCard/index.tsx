import {BlockData} from '../../constructor-items';

import BannerCard from './BannerCard';
import {defaultValue, form} from './form';
import icon from './icon';

const BannerCardConfig: BlockData = {
    type: '@gravity-ui/page-constructor/banner-card',
    component: BannerCard,
    schema: {
        name: 'Banner Card',
        group: '@gravity-ui/page-constructor/Cards',
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default BannerCardConfig;
