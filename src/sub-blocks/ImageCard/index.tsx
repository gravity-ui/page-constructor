import {BlockData} from '../../constructor-items';

import ImageCard from './ImageCard';
import {defaultValue, form} from './form';
import icon from './icon';

const ImageCardConfig: BlockData = {
    type: '@gravity-ui/page-constructor/image-card',
    component: ImageCard,
    schema: {
        name: 'Image Card',
        group: '@gravity-ui/page-constructor/Cards',
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default ImageCardConfig;
