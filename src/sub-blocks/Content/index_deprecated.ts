import {BlockData} from '../../constructor-items';

import Content from './Content';
import {defaultValue, form} from './form';
import icon from './icon';

const ContentConfig: BlockData = {
    type: 'content',
    component: Content,
    schema: {
        name: 'Content',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default ContentConfig;
