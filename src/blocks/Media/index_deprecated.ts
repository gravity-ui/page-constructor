import MediaBlock from './Media';
import {defaultValue, form} from './form';
import svgIcon from './icon';

const MediaBlockConfig = {
    type: 'media-block',
    component: MediaBlock,
    schema: {
        name: 'Media Block',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
        previewImg: svgIcon,
    },
};

export default MediaBlockConfig;
