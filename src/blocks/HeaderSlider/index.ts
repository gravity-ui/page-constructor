import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import HeaderSliderBlock from './HeaderSlider';
import {HeaderSliderBlock as HeaderSliderBlockSchema} from './schema';

const HeaderSliderBlockConfig = {
    type: '@gravity-ui/page-constructor/header-slider-block',
    component: HeaderSliderBlock,
    schema: {
        name: 'Header Slider Block',
        group: '@gravity-ui/page-constructor/CardContainers',
        // TODO: change to custom block schema
        inputs: generateFormFieldsFromAjvSchema(
            HeaderSliderBlockSchema['header-slider-block'] as unknown as JSONSchemaType<{}>,
        ),
        default: {
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
        },
    },
};

export default HeaderSliderBlockConfig;
