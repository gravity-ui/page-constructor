import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import {SliderBlock as SliderBlockSchema} from './schema';

// TODO: change to custom block schema
export const form = generateFormFieldsFromAjvSchema(
    SliderBlockSchema['slider-block'] as unknown as JSONSchemaType<{}>,
);

export const defaultValue = {
    dots: true,
    type: 'slider-block',
    title: 'Slider Block with Quote Cards',
    description: 'You can insert any card inside block',
    slidesToShow: 1,
    arrows: true,
    children: [
        {
            type: 'quote',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            url: 'https://example.com',
            author: {
                firstName: 'Lorem',
                secondName: 'ipsum',
                description: 'Lorem ipsum',
            },
        },
        {
            type: 'quote',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            url: 'https://example.com',
            author: {
                firstName: 'Lorem',
                secondName: 'ipsum',
                description: 'Lorem ipsum',
            },
        },
    ],
};
