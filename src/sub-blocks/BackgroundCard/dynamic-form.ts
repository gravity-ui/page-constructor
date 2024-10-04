import {contentThemes, textSize} from '../../schema/validators/common';
import {BlockFormSchema} from '../../types/dynamic-form';

const textSizeEnum = textSize.map((size) => ({value: size, content: size}));
const contentThemesEnum = contentThemes.map((size) => ({value: size, content: size}));

export const blockConfig: BlockFormSchema = {
    name: 'Background Card',
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
            name: 'text',
            title: 'Description',
        },
        {
            type: 'textarea',
            name: 'additionalInfo',
            title: 'Additional Info',
        },
        {
            type: 'select',
            name: 'size',
            title: 'Size',
            enum: contentThemesEnum,
            view: 'select',
            mode: 'single',
        },
    ],
};
