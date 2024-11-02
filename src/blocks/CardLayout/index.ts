import {JSONSchemaType} from 'ajv';

import {ConfigInput} from '../../common/types';
import {BlockData} from '../../constructor-items';
import {sliderSizesArray, textSize} from '../../schema/validators/common';
import {generateFromAJV} from '../../utils/form-generator';

import CardLayout from './CardLayout';
import {CardLayoutProps} from './schema';

const textSizeEnum = textSize.map((size) => ({value: size, content: size}));

export const blockConfig: ConfigInput[] = [
    {
        type: 'oneOf',
        name: 'title',
        title: 'Title Object',
        options: [
            {
                title: 'Simple',
                value: 'simple',
                properties: [
                    {
                        type: 'text',
                        name: '',
                        title: 'Title',
                    },
                ],
            },
            {
                title: 'Complex',
                value: 'complex',
                properties: [
                    {
                        type: 'text',
                        name: 'text',
                        title: 'Title',
                    },
                    {
                        type: 'select',
                        name: 'textSize',
                        title: 'Text Size',
                        enum: textSizeEnum,
                        view: 'select',
                        mode: 'single',
                    },
                    {
                        type: 'text',
                        name: 'url',
                        title: 'Url',
                    },
                    {
                        type: 'text',
                        name: 'urlTitle',
                        title: 'Url',
                    },
                    {
                        type: 'boolean',
                        name: 'resetMargin',
                        title: 'Reset Margin',
                    },
                ],
            },
        ],
    },
    {
        type: 'textarea',
        name: 'description',
        title: 'Description',
    },
    {
        type: 'boolean',
        name: 'dots',
        title: 'With dots',
    },
    {
        type: 'boolean',
        name: 'arrows',
        title: 'With Arrows',
    },
    {
        type: 'boolean',
        name: 'randomOrder',
        title: 'Random Order',
    },
    {
        type: 'number',
        name: 'autoplay',
        title: 'Autoplay',
    },
    {
        type: 'object',
        name: 'disclaimer',
        title: 'Disclaimer',
        properties: [
            {
                type: 'text',
                name: 'text',
                title: 'Text',
            },
            {
                type: 'select',
                name: 'size',
                title: 'Size',
                enum: textSizeEnum,
                view: 'select',
                mode: 'single',
            },
        ],
    },
    {
        type: 'oneOf',
        name: 'slidesToShow',
        title: 'Slides to Show',
        options: [
            {
                title: 'Simple',
                value: 'simple',
                properties: [
                    {
                        type: 'number',
                        name: '',
                        title: 'Slides',
                    },
                ],
            },
            {
                title: 'Complex',
                value: 'complex',
                properties: sliderSizesArray.reduce((acc, size) => {
                    acc.push({type: 'number', name: size, title: size});
                    return acc;
                }, [] as Array<ConfigInput>),
            },
        ],
    },
    {
        type: 'array',
        name: 'array',
        title: 'Array Properties',
        buttonText: 'Add new',
        arrayType: 'object',
        properties: [
            {
                type: 'text',
                name: 'text',
                title: 'Property',
            },
            {
                type: 'boolean',
                name: 'boolean',
                title: 'Property',
            },
        ],
    },
];

const CardLayoutBlockConfig: BlockData = {
    component: CardLayout,
    schema: {
        name: 'Card Layout Block',
        group: 'card-containers',
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
    },
};

export default CardLayoutBlockConfig;
