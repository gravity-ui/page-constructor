import {JSONSchemaType} from 'ajv';

import {BannerCardProps} from '../../blocks/Banner/schema';
import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

// TODO: change to custom block schema
export const form = generateFormFieldsFromAjvSchema(
    BannerCardProps as unknown as JSONSchemaType<{}>,
);

export const defaultValue = {
    color: 'rgba(54, 151, 241, 0.4)',
    title: 'Banner Card',
    subtitle: 'Some sort of description.',
    button: {
        text: 'Read more',
    },
};
