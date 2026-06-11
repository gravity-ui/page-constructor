import {BlockData} from '../../../../src/constructor-items';
import {Fields} from '../../../../src/form-generator-v2/types';

import TabsAtomBlock from './TabsAtomBlock';

const TabsAtomBlockConfig: BlockData = {
    type: 'custom/atom-tabs',
    component: TabsAtomBlock,
    schema: {
        name: 'Tabs',
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
                        options: [
                            {value: 'm', content: 'M'},
                            {value: 'l', content: 'L'},
                            {value: 'xl', content: 'XL'},
                        ],
                        defaultValue: 'm',
                    },
                ],
            },
            {
                type: 'section',
                title: 'Tabs',
                withAddButton: true,
                index: 'index',
                itemTitle: 'Tab {{index}}',
                itemView: 'card',
                fields: [
                    {type: 'textInput', name: 'items[{{index}}].title', title: 'Tab title'},
                    {type: 'textArea', name: 'items[{{index}}].content', title: 'Tab content'},
                ],
            },
        ] as Fields,
        default: {
            size: 'm',
            items: [
                {title: 'Overview', content: 'This is the overview tab content.'},
                {title: 'Details', content: 'Here you can find more detailed information.'},
                {title: 'Settings', content: 'Configuration options go here.'},
            ],
        },
    },
};

export default TabsAtomBlockConfig;
