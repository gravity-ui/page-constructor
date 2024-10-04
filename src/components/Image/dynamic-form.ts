import _ from 'lodash';

import {ConfigInput} from '../../types/dynamic-form';

const devices = ['desktop', 'tablet', 'mobile'];

const imageBaseInputs: ConfigInput[] = [
    {
        type: 'text',
        name: 'alt',
        title: 'Alternative',
    },
    {
        type: 'boolean',
        name: 'disableCompress',
        title: 'Disable Compress',
    },
];

const imageStyleInputs: ConfigInput[] = [
    {
        type: 'text',
        name: 'style.backgroundColor',
        title: 'Background Color',
    },
    {
        type: 'text',
        name: 'style.height',
        title: 'Height',
    },
    {
        type: 'text',
        name: 'style.width',
        title: 'Width',
    },
    {
        type: 'text',
        name: 'style.color',
        title: 'Color',
    },
];

const devicesInputs: ConfigInput[] = devices.map((device) => ({
    type: 'text',
    title: _.capitalize(device),
    name: `${device}`,
}));

export const imageInputs: ConfigInput[] = [
    {
        type: 'oneOf',
        name: '',
        key: 'imageType',
        title: 'Image Type',
        options: [
            {
                title: 'Simple',
                value: 'simple',
                properties: [
                    {
                        type: 'text',
                        name: '', // image props
                        title: 'Image URL',
                    },
                ],
            },
            {
                title: 'Complex',
                value: 'complex',
                properties: [
                    {
                        type: 'text',
                        name: 'src',
                        title: 'Source',
                    },
                    ...imageStyleInputs,
                    ...imageBaseInputs,
                ],
            },
            {
                title: 'Device Based',
                value: 'deviseBased',
                properties: [...devicesInputs, ...imageBaseInputs],
            },
        ],
    },
];
