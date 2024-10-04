import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import HeaderSliderBlock from './HeaderSlider';
import {HeaderSliderBlock as HeaderSliderBlockSchema} from './schema';

const HeaderSliderBlockConfig = {
    component: HeaderSliderBlock,
    schema: {
        name: 'Header Slider Block',
        inputs: generateFromAJV(
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
