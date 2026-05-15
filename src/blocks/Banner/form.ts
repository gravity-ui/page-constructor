import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import {BannerCardProps} from './schema';

// TODO: change to custom block schema
export const form = generateFormFieldsFromAjvSchema(
    BannerCardProps as unknown as JSONSchemaType<{}>,
);

export const defaultValue = {
    color: 'rgba(54, 151, 241, 0.4)',
    title: 'Banner Block',
    subtitle: 'Some sort of description.',
    button: {
        text: 'Read more',
    },
};
