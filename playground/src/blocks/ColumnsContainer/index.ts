import {BlockData} from '../../../../src/constructor-items';
import {Fields} from '../../../../src/form-generator-v2/types';

import ColumnsContainer from './ColumnsContainer';

const ColumnsContainerConfig: BlockData = {
    type: 'custom/container-columns',
    component: ColumnsContainer,
    schema: {
        name: 'Columns',
        group: 'custom/containers',
        inputs: [
            {
                type: 'section',
                title: 'Layout',
                opened: true,
                fields: [
                    {
                        type: 'segmentedRadioGroup',
                        name: 'columns',
                        title: 'Columns',
                        options: [
                            {value: '2', content: '2'},
                            {value: '3', content: '3'},
                            {value: '4', content: '4'},
                        ],
                        defaultValue: '2',
                    },
                    {
                        type: 'segmentedRadioGroup',
                        name: 'gap',
                        title: 'Gap',
                        options: [
                            {value: 's', content: 'S'},
                            {value: 'm', content: 'M'},
                            {value: 'l', content: 'L'},
                            {value: 'space-between', content: 'Space between'},
                        ],
                        defaultValue: 'm',
                    },
                ],
            },
        ] as Fields,
        default: {
            columns: 2,
            gap: 'm',
            children: [],
        },
    },
};

export default ColumnsContainerConfig;
