import {BlockData} from '../../constructor-items';

import ExtendedFeaturesBlock from './ExtendedFeatures';
import {defaultValue, form} from './form';
import icon from './icon';

const ExtendedFeaturesBlockConfig: BlockData = {
    type: '@gravity-ui/page-constructor/extended-features-block',
    component: ExtendedFeaturesBlock,
    schema: {
        name: 'Extended Features Block',
        group: '@gravity-ui/page-constructor/Blocks',
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default ExtendedFeaturesBlockConfig;
