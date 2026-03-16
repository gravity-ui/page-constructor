import {BlockData} from '../../../../src/constructor-items';

import CustomParentBlock from './CustomParentBlock';

const CustomParentBlockConfig: BlockData = {
    type: 'custom/custom-parent-block',
    component: CustomParentBlock,
    schema: {
        name: 'Custom Parent Block',
        group: 'custom',
        inputs: [
            {type: 'text', name: 'title', title: 'Title'},
            {type: 'textarea', name: 'description', title: 'Description'},
            {
                type: 'select',
                name: 'perRow',
                title: 'Cards per row',
                view: 'radiobutton',
                mode: 'single',
                enum: [
                    {value: '3', content: '3'},
                    {value: '4', content: '4'},
                    {value: '5', content: '5'},
                ],
            },
        ],
        default: {
            title: 'Section Title',
            description: 'A short description of this section.',
            perRow: 3,
            children: [
                {
                    type: 'custom-children-block',
                    title: 'Card One',
                    description: 'First card description.',
                },
                {
                    type: 'custom-children-block',
                    title: 'Card Two',
                    description: 'Second card description.',
                },
                {
                    type: 'custom-children-block',
                    title: 'Card Three',
                    description: 'Third card description.',
                },
            ],
        },
    },
};

export default CustomParentBlockConfig;
