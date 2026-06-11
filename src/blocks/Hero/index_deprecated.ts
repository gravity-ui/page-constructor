import {BlockData} from '../../constructor-items';

import HeroBlock from './Hero';
import {defaultValue, form} from './form';

const HeroBlockConfig: BlockData = {
    type: 'hero-block',
    component: HeroBlock,
    schema: {
        name: 'Hero Block',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
    },
};

export default HeroBlockConfig;
