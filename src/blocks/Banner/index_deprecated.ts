import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFromAJV} from '../../utils/form-generator';

import BannerBlock from './Banner';
import {BannerCardProps} from './schema';

const BannerBlockConfig: BlockData = {
    type: 'banner-block',
    component: BannerBlock,
    schema: {
        name: 'Banner Block',
        group: '@deprecated',
        hidden: true,
        inputs: generateFromAJV(BannerCardProps as unknown as JSONSchemaType<{}>),
        default: {
            color: 'rgba(54, 151, 241, 0.4)',
            title: 'Banner Block',
            subtitle: 'Some sort of description.',
            button: {
                text: 'Read more',
            },
        },
    },
};

export default BannerBlockConfig;
