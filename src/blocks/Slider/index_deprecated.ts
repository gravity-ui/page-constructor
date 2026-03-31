import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import SliderBlock from './Slider';
import {SliderBlock as SliderBlockSchema} from './schema';

const SliderBlockConfig = {
    type: 'slider-block',
    component: SliderBlock,
    schema: {
        name: 'Slider Block',
        group: '@deprecated',
        hidden: true,
        inputs: generateFormFieldsFromAjvSchema(
            SliderBlockSchema['slider-block'] as unknown as JSONSchemaType<{}>,
        ),
        default: {
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
        },
        previewImg: 'https://storage.cloud-preprod.yandex.net/qradle-test/card-layout-block.svg',
    },
};

export default SliderBlockConfig;
