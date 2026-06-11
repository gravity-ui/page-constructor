import {BlockData} from '../../../../src/constructor-items';
import {Fields} from '../../../../src/form-generator-v2/types';

import DefinitionListBlock from './DefinitionListBlock';

const DefinitionListBlockConfig: BlockData = {
    type: 'custom/definition-list-block',
    component: DefinitionListBlock,
    schema: {
        name: 'Definition List Block',
        group: 'custom/atoms',
        inputs: [
            {type: 'textInput', name: 'title', title: 'Block Title'},
            {
                type: 'segmentedRadioGroup',
                name: 'direction',
                title: 'Direction',
                options: [
                    {value: 'horizontal', content: 'Horizontal'},
                    {value: 'vertical', content: 'Vertical'},
                ],
                defaultValue: 'horizontal',
            },
            {type: 'switch', name: 'responsive', title: 'Responsive (100% width)'},
            {type: 'textInput', name: 'nameMaxWidth', title: 'Name Max Width (px)'},
            {type: 'textInput', name: 'contentMaxWidth', title: 'Content Max Width (px)'},
            {
                type: 'section',
                title: 'Definition Items',
                index: 'index',
                withAddButton: true,
                itemTitle: 'Item {{index}}',
                itemView: 'card',
                fields: [
                    {type: 'textInput', name: 'items[{{index}}].name', title: 'Term Name'},
                    {type: 'textInput', name: 'items[{{index}}].value', title: 'Definition Value'},
                    {
                        type: 'textInput',
                        name: 'items[{{index}}].copyText',
                        title: 'Copy Text (optional)',
                    },
                    {
                        type: 'textInput',
                        name: 'items[{{index}}].note',
                        title: 'Note/Help Text (optional)',
                    },
                ],
            },
        ] as Fields,
        default: {
            title: 'System Specifications',
            direction: 'horizontal',
            responsive: false,
            items: [
                {
                    name: 'CPU',
                    value: 'Intel Core i9-13900K',
                    copyText: 'Intel Core i9-13900K',
                },
                {
                    name: 'RAM',
                    value: '64GB DDR5-5600',
                    note: 'Maximum supported memory',
                },
                {
                    name: 'Storage',
                    value: '2TB NVMe SSD',
                },
                {
                    name: 'GPU',
                    value: 'NVIDIA RTX 4090 24GB',
                    copyText: 'NVIDIA RTX 4090 24GB',
                },
            ],
        },
    },
};

export default DefinitionListBlockConfig;
