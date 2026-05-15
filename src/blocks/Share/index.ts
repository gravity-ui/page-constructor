import ShareBlock from './Share';
import {defaultValue, form} from './form';

const ShareBlockConfig = {
    type: '@gravity-ui/page-constructor/share-block',
    component: ShareBlock,
    schema: {
        name: 'Share Block',
        group: '@gravity-ui/page-constructor/UnfinishedBlocks',
        inputs: form,
        default: defaultValue,
    },
};

export default ShareBlockConfig;
