import {JSONSchemaType} from 'ajv';

import {BannerCardProps} from '../../blocks/Banner/schema';
import {BlockData} from '../../constructor-items';
import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import BannerCard from './BannerCard';

const BannerCardConfig: BlockData = {
    type: '@gravity-ui/page-constructor/banner-card',
    component: BannerCard,
    schema: {
        name: 'Banner Card',
        group: '@gravity-ui/page-constructor/Cards',
        // TODO: change to custom block schema
        inputs: generateFormFieldsFromAjvSchema(BannerCardProps as unknown as JSONSchemaType<{}>),
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
