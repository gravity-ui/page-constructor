import {BlockData} from '../../constructor-items';

import Quote from './Quote';
import {defaultValue, form} from './form';
import icon from './icon';

const QuoteConfig: BlockData = {
    type: '@gravity-ui/page-constructor/quote',
    component: Quote,
    schema: {
        name: 'Quote',
        group: '@gravity-ui/page-constructor/Cards',
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default QuoteConfig;
