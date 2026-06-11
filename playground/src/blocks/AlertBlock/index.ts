import {BlockData} from '../../../../src/constructor-items';
import {Fields} from '../../../../src/form-generator-v2/types';

import AlertBlock from './AlertBlock';

const AlertBlockConfig: BlockData = {
    type: 'custom/atom-alert',
    component: AlertBlock,
    schema: {
        name: 'Alert',
        group: 'custom/atoms',
        inputs: [
            {
                type: 'section',
                title: 'Alert',
                opened: true,
                fields: [
                    {type: 'textInput', name: 'title', title: 'Title'},
                    {type: 'textArea', name: 'message', title: 'Message'},
                    {
                        type: 'segmentedRadioGroup',
                        name: 'theme',
                        title: 'Theme',
                        options: [
                            {value: 'normal', content: 'Normal'},
                            {value: 'info', content: 'Info'},
                            {value: 'success', content: 'Success'},
                            {value: 'warning', content: 'Warning'},
                            {value: 'danger', content: 'Danger'},
                        ],
                        defaultValue: 'normal',
                    },
                    {
                        type: 'segmentedRadioGroup',
                        name: 'view',
                        title: 'View',
                        options: [
                            {value: 'filled', content: 'Filled'},
                            {value: 'outlined', content: 'Outlined'},
                        ],
                        defaultValue: 'filled',
                    },
                    {
                        type: 'segmentedRadioGroup',
                        name: 'corners',
                        title: 'Corners',
                        options: [
                            {value: 'rounded', content: 'Rounded'},
                            {value: 'square', content: 'Square'},
                        ],
                        defaultValue: 'rounded',
                    },
                    {
                        type: 'segmentedRadioGroup',
                        name: 'layout',
                        title: 'Layout',
                        options: [
                            {value: 'horizontal', content: 'Horizontal'},
                            {value: 'vertical', content: 'Vertical'},
                        ],
                        defaultValue: 'horizontal',
                    },
                ],
            },
        ] as Fields,
        default: {
            title: 'Heads up!',
            message: 'This is an informational message.',
            theme: 'info',
            view: 'filled',
            corners: 'rounded',
            layout: 'horizontal',
        },
    },
};

export default AlertBlockConfig;
