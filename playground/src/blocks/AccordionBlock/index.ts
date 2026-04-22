import {BlockData} from '../../../../src/constructor-items';
import {Fields} from '../../../../src/form-generator-v2/types';

import AccordionBlock from './AccordionBlock';

const AccordionBlockConfig: BlockData = {
    type: 'custom/atom-accordion',
    component: AccordionBlock,
    schema: {
        name: 'Accordion',
        group: 'custom/atoms',
        inputs: [
            {
                type: 'section',
                title: 'Settings',
                opened: true,
                fields: [
                    {
                        type: 'segmentedRadioGroup',
                        name: 'size',
                        title: 'Size',
                        options: [{value: 'm', content: 'M'}, {value: 'l', content: 'L'}, {value: 'xl', content: 'XL'}],
                        defaultValue: 'm',
                    },
                ],
            },
            {
                type: 'section',
                title: 'Items',
                withAddButton: true,
                index: 'index',
                itemTitle: 'Item {{index}}',
                itemView: 'card',
                fields: [
                    {type: 'textInput', name: 'items[{{index}}].summary', title: 'Summary'},
                    {type: 'textArea', name: 'items[{{index}}].content', title: 'Content'},
                ],
            },
        ] as Fields,
        default: {
            size: 'm',
            items: [
                {summary: 'What is this?', content: 'This is the first accordion item content.'},
                {summary: 'How does it work?', content: 'It uses the Accordion component from Gravity UI.'},
                {summary: 'Can I add more?', content: 'Yes! Add as many items as you need.'},
            ],
        },
    },
};

export default AccordionBlockConfig;
