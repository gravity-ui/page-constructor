import {BlockData} from '../../../../src/constructor-items';
import {Fields} from '../../../../src/form-generator-v2/types';

import ButtonBlock from './ButtonBlock';

const ButtonBlockConfig: BlockData = {
    type: 'custom/atom-button',
    component: ButtonBlock,
    schema: {
        name: 'Button',
        group: 'custom/atoms',
        inputs: [
            {
                type: 'section',
                title: 'Button',
                opened: true,
                fields: [
                    {type: 'textInput', name: 'text', title: 'Label'},
                    {
                        type: 'segmentedRadioGroup',
                        name: 'view',
                        title: 'View',
                        options: [
                            {value: 'action', content: 'Action'},
                            {value: 'normal', content: 'Normal'},
                            {value: 'outlined', content: 'Outlined'},
                            {value: 'flat', content: 'Flat'},
                            {value: 'raised', content: 'Raised'},
                        ],
                        defaultValue: 'action',
                    },
                    {
                        type: 'segmentedRadioGroup',
                        name: 'size',
                        title: 'Size',
                        options: [
                            {value: 'xs', content: 'XS'},
                            {value: 's', content: 'S'},
                            {value: 'm', content: 'M'},
                            {value: 'l', content: 'L'},
                            {value: 'xl', content: 'XL'},
                        ],
                        defaultValue: 'm',
                    },
                    {type: 'textInput', name: 'href', title: 'Link URL'},
                    {
                        type: 'select',
                        name: 'target',
                        title: 'Link target',
                        hasClear: true,
                        options: [{value: '_blank', content: 'New tab'}, {value: '_self', content: 'Same tab'}],
                    },
                ],
            },
        ] as Fields,
        default: {
            text: 'Click me',
            view: 'action',
            size: 'm',
        },
    },
};

export default ButtonBlockConfig;
