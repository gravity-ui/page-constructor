import {BlockData} from '../../constructor-items';

import BackgroundCard from './BackgroundCard';
import {defaultValue, form} from './form';
import icon from './icon';

const BackgroundCardConfig: BlockData = {
    type: 'background-card',
    component: BackgroundCard,
    schema: {
        name: 'Background Card',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default BackgroundCardConfig;
