import {sliderSizesArray, textSize} from '../../schema/validators/common';
import {BlockFormSchema, ConfigInput} from '../../types/dynamic-form';

const textSizeEnum = textSize.map((size) => ({value: size, content: size}));

export const blockConfig: BlockFormSchema = {
    name: 'Slider Block',
    inputs: [
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
    ],
};

export const exampleConfig: BlockFormSchema = {
    name: 'Slider Block',
    inputs: [
        {
            type: 'text',
            name: 'title',
            title: 'Text Property',
        },
        {
            type: 'boolean',
            name: '<ID>',
            title: 'Boolean Property',
        },
        {
            type: 'number',
            name: '<ID>',
            title: 'Number Property',
        },
        {
            type: 'textarea',
            name: '<ID>',
            title: 'TextArea Property',
            showIf: `block.description === 'Test'`,
        },
        {
            type: 'select',
            name: 'select',
            title: 'Select Property',
            enum: [
                {content: 'Option 1', value: 'option-1'},
                {content: 'Option 2', value: 'option-2'},
            ],
            mode: 'single',
            view: 'select',
        },
        {
            type: 'object',
            name: 'object_data',
            title: 'Object Property',
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
    ],
};
