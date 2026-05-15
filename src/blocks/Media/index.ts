import MediaBlock from './Media';
import {defaultValue, form} from './form';
import icon from './icon';

const MediaBlockConfig = {
    type: '@gravity-ui/page-constructor/media-block',
    component: MediaBlock,
    schema: {
        name: 'Media Block',
        group: '@gravity-ui/page-constructor/Blocks',
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default MediaBlockConfig;
