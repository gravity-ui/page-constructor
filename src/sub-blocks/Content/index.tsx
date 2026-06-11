import {BlockData} from '../../constructor-items';

import Content from './Content';
import {defaultValue, form} from './form';
import icon from './icon';

const ContentConfig: BlockData = {
    type: '@gravity-ui/page-constructor/content',
    component: Content,
    schema: {
        name: 'Content',
        group: '@gravity-ui/page-constructor/Cards',
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default ContentConfig;
