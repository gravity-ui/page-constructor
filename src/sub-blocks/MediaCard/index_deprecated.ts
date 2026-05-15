import {BlockData} from '../../constructor-items';

import MediaCard from './MediaCard';
import {defaultValue, form} from './form';
import icon from './icon';

const MediaCardConfig: BlockData = {
    type: 'media-card',
    component: MediaCard,
    schema: {
        name: 'Media Card',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default MediaCardConfig;
