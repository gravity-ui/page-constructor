import {BlockData} from '../../constructor-items';

import ImageCard from './ImageCard';
import {defaultValue, form} from './form';
import icon from './icon';

const ImageCardConfig: BlockData = {
    type: 'image-card',
    component: ImageCard,
    schema: {
        name: 'Image Card',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default ImageCardConfig;
