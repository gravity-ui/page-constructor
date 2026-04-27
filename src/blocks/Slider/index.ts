import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import SliderBlock from './Slider';
import icon from './icon';
import {SliderBlock as SliderBlockSchema} from './schema';

const SliderBlockConfig = {
    type: '@gravity-ui/page-constructor/slider-block',
    component: SliderBlock,
    schema: {
        name: 'Slider Block',
        group: '@gravity-ui/page-constructor/CardContainers',
        // TODO: change to custom block schema
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
        previewImg: icon,
    },
};

export default SliderBlockConfig;
