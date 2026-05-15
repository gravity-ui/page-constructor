import {BlockData} from '../../constructor-items';

import MediaCard from './MediaCard';
import {defaultValue, form} from './form';
import icon from './icon';

const MediaCardConfig: BlockData = {
    type: '@gravity-ui/page-constructor/media-card',
    component: MediaCard,
    schema: {
        name: 'Media Card',
        group: '@gravity-ui/page-constructor/Cards',
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default MediaCardConfig;
