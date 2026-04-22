import {BlockData} from '../../../../src/constructor-items';
import {Fields} from '../../../../src/form-generator-v2/types';

import ProgressBlock from './ProgressBlock';

const ProgressBlockConfig: BlockData = {
    type: 'custom/atom-progress',
    component: ProgressBlock,
    schema: {
        name: 'Progress',
        group: 'custom/atoms',
        inputs: [
            {
                type: 'section',
                title: 'Progress',
                opened: true,
                fields: [
                    {
                        type: 'select',
                        name: 'value',
                        title: 'Value (%)',
                        options: [0, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 100].map((v) => ({
                            value: String(v),
                            content: `${v}%`,
                        })),
                        defaultValue: '50',
                    },
                    {type: 'textInput', name: 'text', title: 'Label text'},
                    {
                        type: 'segmentedRadioGroup',
                        name: 'theme',
                        title: 'Theme',
                        options: [
                            {value: 'default', content: 'Default'},
                            {value: 'success', content: 'Success'},
                            {value: 'warning', content: 'Warning'},
                            {value: 'danger', content: 'Danger'},
                            {value: 'misc', content: 'Misc'},
                        ],
                        defaultValue: 'default',
                    },
                    {
                        type: 'segmentedRadioGroup',
                        name: 'size',
                        title: 'Size',
                        options: [{value: 'xs', content: 'XS'}, {value: 's', content: 'S'}, {value: 'm', content: 'M'}],
                        defaultValue: 'm',
                    },
                ],
            },
        ] as Fields,
        default: {
            value: 65,
            text: '65%',
            theme: 'success',
            size: 'm',
        },
    },
};

export default ProgressBlockConfig;
