import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import BannerBlock from './Banner';
import {BannerCardProps} from './schema';

import icon from './icon.svg';

const BannerBlockConfig: BlockData = {
    type: '@gravity-ui/page-constructor/banner-block',
    component: BannerBlock,
    schema: {
        name: 'Banner Block',
        group: '@gravity-ui/page-constructor/Blocks',
        // TODO: change to custom block schema
        inputs: generateFormFieldsFromAjvSchema(BannerCardProps as unknown as JSONSchemaType<{}>),
        default: {
            color: 'rgba(54, 151, 241, 0.4)',
            title: 'Banner Block',
            subtitle: 'Some sort of description.',
            button: {
                text: 'Read more',
            },
        },
        previewImg: icon,
    },
};

export default BannerBlockConfig;
