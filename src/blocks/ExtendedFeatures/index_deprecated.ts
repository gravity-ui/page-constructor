import ExtendedFeaturesBlock from './ExtendedFeatures';
import {defaultValue, form} from './form';
import icon from './icon';

const ExtendedFeaturesBlockConfig = {
    type: 'extended-features-block',
    component: ExtendedFeaturesBlock,
    schema: {
        name: 'Extended Features Block',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default ExtendedFeaturesBlockConfig;
