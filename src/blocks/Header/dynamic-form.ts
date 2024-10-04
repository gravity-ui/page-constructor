import {imageInputs} from '../../components/Image/dynamic-form';
import {Theme} from '../../models';
import {BlockFormSchema, ConfigInput} from '../../types/dynamic-form';

const mediaInputs: ConfigInput[] = [
    {
        type: 'oneOf',
        name: '',
        key: 'mediaType',
        title: 'Media Type',
        options: [
            {
                title: 'Empty',
                value: 'emptyMedia',
                properties: [
                    {
                        type: 'text',
                        name: 'color',
                        title: 'Color',
                    },
                ],
            },
            {
                title: 'Image',
                value: 'image',
                properties: [
                    {
                        type: 'oneOf',
                        name: 'image',
                        key: 'imagesCount',
                        title: 'Images Count',
                        options: [
                            {title: 'Single Image', value: 'singleImage', properties: imageInputs},
                            {
                                title: 'Multiple Images',
                                value: 'multipleImages',
                                properties: [
                                    {
                                        type: 'array',
                                        name: '',
                                        arrayType: 'object',
                                        title: 'Images',
                                        properties: imageInputs,
                                        buttonText: 'Add Image',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                title: 'Youtube',
                value: 'youtube',
                properties: [
                    {
                        type: 'text',
                        name: 'youtube',
                        title: 'Youtube',
                    },
                    {
                        type: 'text',
                        name: 'previewImg',
                        title: 'Preview Image',
                    },
                ],
            },
            {
                title: 'Datalens',
                value: 'datalens',
                properties: [],
            },
            {
                title: 'Iframe',
                value: 'iframe',
                properties: [],
            },
            {
                title: 'Video',
                value: 'video',
                properties: [],
            },
        ],
    },
    {
        type: 'boolean',
        name: 'disableImageSliderForArrayInput',
        title: 'Disable Image Slider For Array Input',
    },
    {
        type: 'boolean',
        name: 'parallax',
        title: 'Parallax',
    },
    {
        type: 'number',
        name: 'height',
        title: 'Height',
    },
    {
        type: 'boolean',
        name: 'fullscreen',
        title: 'Fullscreen',
    },
    {
        type: 'number',
        name: 'ratio',
        title: 'Ratio',
    },
    {
        type: 'boolean',
        name: 'margins',
        title: 'Margins',
    },
];

const headerBackgroundInputs: ConfigInput[] = [
    {
        type: 'boolean',
        name: 'fullWidthMedia',
        title: 'Full width Media',
    },
    {
        type: 'boolean',
        name: 'fullWidth',
        title: 'Full width',
    },
];

const backgroundProperty = (properties: ConfigInput[]): ConfigInput => ({
    type: 'oneOf',
    name: 'background',
    title: 'Background',
    options: [
        {
            value: 'noThemes',
            title: 'No Themes',
            properties: properties,
        },
        {
            value: 'withThemes',
            title: 'With Themes',
            properties: Object.values(Theme).map((theme) => ({
                type: 'object',
                name: theme,
                title: theme,
                properties: properties,
            })),
        },
    ],
});

export const blockConfig: BlockFormSchema = {
    name: 'Header Block',
    inputs: [
        {
            type: 'text',
            name: 'title',
            title: 'Title',
        },
        {
            type: 'text',
            name: 'overtitle',
            title: 'Overtitle',
        },
        {
            type: 'textarea',
            name: 'description',
            title: 'Description',
        },
        backgroundProperty([...mediaInputs, ...headerBackgroundInputs]),
        /*        {
            type: 'text',
            name: 'when',
            title: 'when',
        },
        {
            type: 'object',
            name: 'anchor',
            title: 'anchor',
            properties: [
                {
                    type: 'text',
                    name: 'text',
                    title: 'text',
                },
                {
                    type: 'text',
                    name: 'url',
                    title: 'url',
                },
                {
                    type: 'text',
                    name: 'urlTitle',
                    title: 'urlTitle',
                },
            ],
        },
        {
            type: 'select',
            name: 'visible',
            title: 'visible',
            enum: [
                {
                    content: 'sm',
                    value: 'sm',
                },
                {
                    content: 'md',
                    value: 'md',
                },
                {
                    content: 'lg',
                    value: 'lg',
                },
                {
                    content: 'xl',
                    value: 'xl',
                },
                {
                    content: 'all',
                    value: 'all',
                },
            ],
        },
        {
            type: 'text',
            name: 'context',
            title: 'context',
        },
        {
            type: 'object',
            name: 'indent',
            title: 'indent',
            properties: [],
        },
        {
            type: 'select',
            name: 'width',
            title: 'width',
            enum: [
                {
                    content: 's',
                    value: 's',
                },
                {
                    content: 'm',
                    value: 'm',
                },
                {
                    content: 'l',
                    value: 'l',
                },
            ],
        },
        {
            type: 'array',
            name: 'buttons',
            title: 'buttons',
            properties: [
                {
                    type: 'text',
                    name: 'when',
                    title: 'when',
                },
                {
                    type: 'text',
                    name: 'text',
                    title: 'text',
                },
                {
                    type: 'text',
                    name: 'url',
                    title: 'url',
                },
                {
                    type: 'text',
                    name: 'urlTitle',
                    title: 'urlTitle',
                },
                {
                    type: 'select',
                    name: 'size',
                    title: 'size',
                    enum: [
                        {
                            content: 'xs',
                            value: 'xs',
                        },
                        {
                            content: 'ns',
                            value: 'ns',
                        },
                        {
                            content: 's',
                            value: 's',
                        },
                        {
                            content: 'n',
                            value: 'n',
                        },
                        {
                            content: 'm',
                            value: 'm',
                        },
                        {
                            content: 'l',
                            value: 'l',
                        },
                        {
                            content: 'xl',
                            value: 'xl',
                        },
                        {
                            content: 'head',
                            value: 'head',
                        },
                        {
                            content: 'promo',
                            value: 'promo',
                        },
                    ],
                },
                {
                    type: 'select',
                    name: 'theme',
                    title: 'theme',
                    enum: [
                        {
                            content: 'normal',
                            value: 'normal',
                        },
                        {
                            content: 'action',
                            value: 'action',
                        },
                        {
                            content: 'outlined',
                            value: 'outlined',
                        },
                        {
                            content: 'outlined-info',
                            value: 'outlined-info',
                        },
                        {
                            content: 'outlined-danger',
                            value: 'outlined-danger',
                        },
                        {
                            content: 'raised',
                            value: 'raised',
                        },
                        {
                            content: 'flat',
                            value: 'flat',
                        },
                        {
                            content: 'flat-info',
                            value: 'flat-info',
                        },
                        {
                            content: 'flat-danger',
                            value: 'flat-danger',
                        },
                        {
                            content: 'flat-secondary',
                            value: 'flat-secondary',
                        },
                        {
                            content: 'clear',
                            value: 'clear',
                        },
                        {
                            content: 'normal-contrast',
                            value: 'normal-contrast',
                        },
                        {
                            content: 'outlined-contrast',
                            value: 'outlined-contrast',
                        },
                        {
                            content: 'flat-contrast',
                            value: 'flat-contrast',
                        },
                        {
                            content: 'link',
                            value: 'link',
                        },
                        {
                            content: 'pseudo',
                            value: 'pseudo',
                        },
                        {
                            content: 'pseudo-special',
                            value: 'pseudo-special',
                        },
                        {
                            content: 'websearch',
                            value: 'websearch',
                        },
                        {
                            content: 'normal-dark',
                            value: 'normal-dark',
                        },
                        {
                            content: 'normal-special',
                            value: 'normal-special',
                        },
                        {
                            content: 'accent',
                            value: 'accent',
                        },
                        {
                            content: 'dark-grey',
                            value: 'dark-grey',
                        },
                        {
                            content: 'app-store',
                            value: 'app-store',
                        },
                        {
                            content: 'google-play',
                            value: 'google-play',
                        },
                        {
                            content: 'scale',
                            value: 'scale',
                        },
                        {
                            content: 'github',
                            value: 'github',
                        },
                        {
                            content: 'monochrome',
                            value: 'monochrome',
                        },
                    ],
                },
                {
                    type: 'oneOf',
                    name: 'img',
                    title: 'img',
                    options: [
                        {
                            value: 'url',
                            title: 'url',
                            properties: [],
                        },
                        {
                            value: 'options',
                            title: 'options',
                            properties: [],
                        },
                    ],
                },
                {
                    type: 'oneOf',
                    name: 'analyticsEvents',
                    title: 'analyticsEvents',
                    options: [
                        {
                            value: 'single',
                            title: 'single',
                            properties: [
                                {
                                    type: 'text',
                                    name: 'additionalProperties',
                                    title: 'additionalProperties',
                                },
                            ],
                        },
                        {
                            value: 'list',
                            title: 'list',
                            properties: [
                                {
                                    type: 'object',
                                    name: 'items',
                                    title: 'items',
                                    properties: [
                                        {
                                            type: 'text',
                                            name: 'name',
                                            title: 'name',
                                        },
                                        {
                                            type: 'text',
                                            name: 'type',
                                            title: 'type',
                                        },
                                        {
                                            type: 'object',
                                            name: 'counters',
                                            title: 'counters',
                                            properties: [],
                                        },
                                        {
                                            type: 'text',
                                            name: 'context',
                                            title: 'context',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    type: 'select',
                    name: 'target',
                    title: 'target',
                    enum: [
                        {
                            content: '_self',
                            value: '_self',
                        },
                        {
                            content: '_blank',
                            value: '_blank',
                        },
                        {
                            content: '_parent',
                            value: '_parent',
                        },
                        {
                            content: '_top',
                            value: '_top',
                        },
                    ],
                },
                {
                    type: 'select',
                    name: 'width',
                    title: 'width',
                    enum: [
                        {
                            content: 'auto',
                            value: 'auto',
                        },
                        {
                            content: 'max',
                            value: 'max',
                        },
                    ],
                },
            ],
        },
        {
            type: 'select',
            name: 'offset',
            title: 'offset',
            enum: [
                {
                    content: 'default',
                    value: 'default',
                },
                {
                    content: 'large',
                    value: 'large',
                },
            ],
        },
        {
            type: 'oneOf',
            name: 'image',
            title: 'image',
            options: [
                {
                    value: 'no theme',
                    title: 'no theme',
                    properties: [],
                },
                {
                    value: 'themes',
                    title: 'themes',
                    properties: [],
                },
            ],
        },
        {
            type: 'oneOf',
            name: 'video',
            title: 'video',
            options: [
                {
                    value: 'no theme',
                    title: 'no theme',
                    properties: [],
                },
                {
                    value: 'themes',
                    title: 'themes',
                    properties: [],
                },
            ],
        },
        {
            type: 'select',
            name: 'mediaView',
            title: 'mediaView',
            enum: [
                {
                    content: 'fit',
                    value: 'fit',
                },
                {
                    content: 'full',
                    value: 'full',
                },
            ],
        },
        {
            type: 'object',
            name: 'backLink',
            title: 'backLink',
            properties: [
                {
                    type: 'text',
                    name: 'url',
                    title: 'url',
                },
                {
                    type: 'text',
                    name: 'title',
                    title: 'title',
                },
            ],
        },
        {
            type: 'select',
            name: 'imageSize',
            title: 'imageSize',
            enum: [
                {
                    content: 's',
                    value: 's',
                },
                {
                    content: 'm',
                    value: 'm',
                },
            ],
        },
        {
            type: 'select',
            name: 'verticalOffset',
            title: 'verticalOffset',
            enum: [
                {
                    content: '0',
                    value: '0',
                },
                {
                    content: 's',
                    value: 's',
                },
                {
                    content: 'm',
                    value: 'm',
                },
                {
                    content: 'l',
                    value: 'l',
                },
                {
                    content: 'xl',
                    value: 'xl',
                },
            ],
        },

        {
            type: 'select',
            name: 'theme',
            title: 'theme',
            enum: [
                {
                    content: 'default',
                    value: 'default',
                },
                {
                    content: 'dark',
                    value: 'dark',
                },
            ],
        },
        {
            type: 'object',
            name: 'breadcrumbs',
            title: 'breadcrumbs',
            properties: [
                {
                    type: 'array',
                    name: 'items',
                    title: 'items',
                    properties: [
                        {
                            type: 'text',
                            name: 'url',
                            title: 'url',
                        },
                        {
                            type: 'text',
                            name: 'text',
                            title: 'text',
                        },
                    ],
                },
                {
                    type: 'select',
                    name: 'theme',
                    title: 'theme',
                    enum: [
                        {
                            content: 'light',
                            value: 'light',
                        },
                        {
                            content: 'dark',
                            value: 'dark',
                        },
                    ],
                },
            ],
        },
        {
            type: 'text',
            name: 'status',
            title: 'status',
        },*/
    ],
};
