import ShareBlock from './Share';
import {defaultValue, form} from './form';

const ShareBlockConfig = {
    type: 'share-block',
    component: ShareBlock,
    schema: {
        name: 'Share Block',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
    },
};

export default ShareBlockConfig;
