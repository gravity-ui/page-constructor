import ContentLayoutBlock from './ContentLayout';
import {defaultValue, form} from './form';
import icon from './icon';

const ContentLayoutBlockConfig = {
    type: '@gravity-ui/page-constructor/content-layout-block',
    component: ContentLayoutBlock,
    schema: {
        name: 'Content Layout Block',
        group: '@gravity-ui/page-constructor/Blocks',
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default ContentLayoutBlockConfig;
