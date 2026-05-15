import {BlockData} from '../../constructor-items';

import Quote from './Quote';
import {defaultValue, form} from './form';
import icon from './icon';

const QuoteConfig: BlockData = {
    type: 'quote',
    component: Quote,
    schema: {
        name: 'Quote',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default QuoteConfig;
