import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import {HeaderSliderBlock as HeaderSliderBlockSchema} from './schema';

// TODO: change to custom block schema
export const form = generateFormFieldsFromAjvSchema(
    HeaderSliderBlockSchema['header-slider-block'] as unknown as JSONSchemaType<{}>,
);

export const defaultValue = {
    type: 'header-slider-block',
    items: [
        {
            title: 'Header Slide 1',
            overtitle: 'Header Slider Block presents',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            image: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/header-bg-video_light.png',
            mediaView: 'fit',
            title: 'Header Slide 2',
            overtitle: 'Header Slider Block presents',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            width: 'm',
            buttons: [
                {
                    text: 'Button',
                    theme: 'action',
                },
            ],
        },
    ],
};
