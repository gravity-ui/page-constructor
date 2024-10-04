import {JSONSchemaType} from 'ajv';

import {BannerCardProps} from '../../blocks/Banner/schema';
import {BlockData} from '../../constructor-items';
import {generateFromAJV} from '../../utils/form-generator';

import BannerCard from './BannerCard';

const BannerCardConfig: BlockData = {
    component: BannerCard,
    schema: {
        name: 'Banner Card',
        inputs: generateFromAJV(BannerCardProps as unknown as JSONSchemaType<{}>),
        default: {
            color: 'rgba(54, 151, 241, 0.4)',
            title: 'Banner Card',
            subtitle: 'Some sort of description.',
            button: {
                text: 'Read more',
            },
        },
    },
};

export default BannerCardConfig;
