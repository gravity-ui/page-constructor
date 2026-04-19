import {BlockData} from '../../../../src/constructor-items';

import DefinitionListBlock from './DefinitionListBlock';

const DefinitionListBlockConfig: BlockData = {
    type: 'custom/definition-list-block',
    component: DefinitionListBlock,
    schema: {
        name: 'Definition List Block',
        group: 'custom',
        inputs: [
            {
                type: 'text',
                name: 'title',
                title: 'Block Title',
            },
            {
                type: 'select',
                name: 'direction',
                title: 'Direction',
                view: 'radiobutton',
                mode: 'single',
                enum: [
                    {value: 'horizontal', content: 'Horizontal'},
                    {value: 'vertical', content: 'Vertical'},
                ],
            },
            {
                type: 'boolean',
                name: 'responsive',
                title: 'Responsive (100% width)',
            },
            {
                type: 'number',
                name: 'nameMaxWidth',
                title: 'Name Max Width (px)',
            },
            {
                type: 'number',
                name: 'contentMaxWidth',
                title: 'Content Max Width (px)',
            },
            {
                type: 'array',
                name: 'items',
                title: 'Definition Items',
                arrayType: 'object',
                buttonText: 'Add Item',
                properties: [
                    {
                        type: 'text',
                        name: 'name',
                        title: 'Term Name',
                    },
                    {
                        type: 'text',
                        name: 'value',
                        title: 'Definition Value',
                    },
                    {
                        type: 'text',
                        name: 'copyText',
                        title: 'Copy Text (optional)',
                    },
                    {
                        type: 'text',
                        name: 'note',
                        title: 'Note/Help Text (optional)',
                    },
                ],
            },
        ],
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
