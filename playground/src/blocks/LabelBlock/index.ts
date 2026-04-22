import {BlockData} from '../../../../src/constructor-items';
import {Fields} from '../../../../src/form-generator-v2/types';

import LabelBlock from './LabelBlock';

const LabelBlockConfig: BlockData = {
    type: 'custom/atom-label',
    component: LabelBlock,
    schema: {
        name: 'Label',
        group: 'custom/atoms',
        inputs: [
            {
                type: 'section',
                title: 'Label',
                opened: true,
                fields: [
                    {type: 'textInput', name: 'value', title: 'Text'},
                    {
                        type: 'select',
                        name: 'theme',
                        title: 'Theme',
                        options: [
                            {value: 'normal'},
                            {value: 'info'},
                            {value: 'success'},
                            {value: 'warning'},
                            {value: 'danger'},
                            {value: 'utility'},
                            {value: 'unknown'},
                            {value: 'clear'},
                        ],
                        defaultValue: 'normal',
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
            value: 'Status',
            theme: 'info',
            size: 'm',
        },
    },
};

export default LabelBlockConfig;
