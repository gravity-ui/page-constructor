import {BlockData} from '../../constructor-items';

import HeroBlock from './Hero';
import {defaultValue, form} from './form';

const HeroBlockConfig: BlockData = {
    type: '@gravity-ui/page-constructor/hero-block',
    component: HeroBlock,
    schema: {
        name: 'Hero Block',
        group: '@gravity-ui/page-constructor/UnfinishedBlocks',
        inputs: form,
        default: defaultValue,
    },
};

export default HeroBlockConfig;
