import ContentLayoutBlock from './ContentLayout';
import {defaultValue, form} from './form';

const ContentLayoutBlockConfig = {
    type: 'content-layout-block',
    component: ContentLayoutBlock,
    schema: {
        name: 'Content Layout Block',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
    },
};

export default ContentLayoutBlockConfig;
