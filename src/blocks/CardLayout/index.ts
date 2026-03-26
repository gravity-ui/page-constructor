import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFromAJV} from '../../utils/form-generator';

import CardLayout from './CardLayout';
import {CardLayoutProps} from './schema';

const CardLayoutBlockConfig: BlockData = {
    type: 'card-layout-block',
    component: CardLayout,
    schema: {
        name: 'Card Layout Block',
        group: '@gravity-ui/page-constructor/CardContainers',
        // TODO: change to custom block schema
        inputs: generateFromAJV(CardLayoutProps as unknown as JSONSchemaType<{}>),
        default: {
            type: 'card-layout-block',
            children: [
                {
                    type: 'background-card',
                    title: 'Tell a story and build a narrative',
                    text: 'We are all storytellers. Stories are a powerful way to communicate ideas and share information. The right story can lead to a better understanding of a situation, make us laugh, or even inspire us to do something in the future.',
                },
                {
                    type: 'background-card',
                    title: 'Tell a story and build a narrative',
                    text: 'We are all storytellers. Stories are a powerful way to communicate ideas and share information. The right story can lead to a better understanding of a situation, make us laugh, or even inspire us to do something in the future.',
                },
                {
                    type: 'background-card',
                    title: 'Tell a story and build a narrative',
                    text: 'We are all storytellers. Stories are a powerful way to communicate ideas and share information. The right story can lead to a better understanding of a situation, make us laugh, or even inspire us to do something in the future.',
                },
            ],
            title: 'Card Layout Block',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        previewImg: 'https://storage.cloud-preprod.yandex.net/qradle-test/card-layout-block.svg',
    },
};

export default CardLayoutBlockConfig;
