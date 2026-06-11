import {BlockData} from '../../constructor-items';

import BackgroundCard from './BackgroundCard';
import {defaultValue, form} from './form';
import icon from './icon';

const BackgroundCardConfig: BlockData = {
    type: '@gravity-ui/page-constructor/background-card',
    component: BackgroundCard,
    schema: {
        name: 'Background Card',
        group: '@gravity-ui/page-constructor/Cards',
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default BackgroundCardConfig;
